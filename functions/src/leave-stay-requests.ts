import * as functions from 'firebase-functions';
import * as fbadmin from 'firebase-admin';
import { CheckInItem, LeaveRequest, LeaveStayRequest, MailgunOptions, StayRequest, TimeExcusalDoc } from './types';
import { getAcademicYear, getDateString, getIncludedDays } from './utils/date';
import { sendEmail } from './utils/email';
import { isProduction } from './utils/general';
import { getCheckinsByDateRange } from './utils/excusals';


const onLeaveRequestCreate = functions.firestore.document('leave-requests/{docId}').onCreate(async (snap) => {
    const leaveRequest = snap.data() as LeaveRequest;
    const newRequest = createPendingRequest(leaveRequest);
    await moveRequestToPending(newRequest, snap.ref);
    try {
        await requestSubmittedEmail()
    } catch (err){
        console.log(err);
    }
})
const onStayRequestCreate = functions.firestore.document('stay-requests/{docId}').onCreate(async (snap) => {
    const stayRequest = snap.data() as StayRequest;
    const newRequest = createPendingRequest(stayRequest);
    await moveRequestToPending(newRequest, snap.ref);
    try {
        await requestSubmittedEmail()
    } catch (err){
        console.log(err);
    }
})

const onRequestProcessed = functions.firestore.document('requests/{requestId}').onUpdate(async (snap) => {
    const before = snap.before.data() as LeaveStayRequest;
    const after = snap.after.data() as LeaveStayRequest;
    
    const isApproved = before.status === 'Pending' && after.status === 'Approved';
    const isRejected = before.status === 'Pending' && after.status === 'Rejected';
    if(isApproved){
        if(after.type === 'Stay'){
            const startDate = getDateString(new Date(after.startDate));
            const endDate = getDateString(new Date(after.endDate));
            // add to check ins
            const checkIns = await getCheckinsByDateRange(startDate, endDate);
            const checkInItem: CheckInItem = {
                name: after.student.name,
                uid: after.student.uid
            };
            const batch = fbadmin.firestore().batch();
            for(const checkIn of checkIns.docs){
                const expectedDoc = checkIn.ref.collection('expected').doc(after.student.uid);
                const excusedDoc = checkIn.ref.collection('excused').doc(after.student.uid);
                batch.set(expectedDoc, checkInItem);
                batch.delete(excusedDoc);
            }
            try {
                await batch.commit();
            } catch(err){
                console.log(err);
            }
        } else {
            // add a time excusal
            const excusalRef = fbadmin.firestore().collection('time-excusals').doc();
            const timeExcusal: TimeExcusalDoc = {
                boarder: {
                    name: after.student.name,
                    uid: after.student.uid
                },
                leaveDate: after.startDate,
                returnDate: after.endDate,
                reason: 'Requested Leave',
                includedDays: getIncludedDays(after.startDate, after.endDate),
                uid: excusalRef.id
            };
            try {
                await excusalRef.set(timeExcusal);
            } catch(err) {
                console.log(err);
            }
        }

    } else if(isRejected){
        let text = 'Your recent request has been denied.';
        if(after.rejectionReason){
            text += ` The reason for denial is: ${after.rejectionReason}` 
        }
        text += '\n\nIf you have further questions regarding this request, please speak with the Dean.'
        const emailOptions: MailgunOptions = {
            to: after.student.email,
            from: functions.config().emails['request-sender'],
            subject: after.type + ' Request Denied',
            text
        };
        try {
            await sendEmail(emailOptions, !isProduction());
        } catch(err){
            console.log(err);
        }
    }
})

function isStay(obj: StayRequest | LeaveRequest): obj is StayRequest {
    return 'reason' in obj;
}

const requestSubmittedEmail = (): Promise<void> => {
    const emailOptions: MailgunOptions = {
        to: functions.config().emails['request-receiver'],
        from: functions.config().emails['request-sender'],
        subject: 'New Leave/Stay Request',
        text: 'A new request has been submitted for approval. View it here: https://reslife.oakwoodfriends.org/admin/requests'
    }
    return sendEmail(emailOptions, !isProduction());
}

const moveRequestToPending = async (newRequest: LeaveStayRequest, oldRef: FirebaseFirestore.DocumentReference): Promise<void> => {
    const batch = fbadmin.firestore().batch();
    batch.set(fbadmin.firestore().collection('requests').doc(newRequest.uid), newRequest);
    batch.delete(oldRef);
    try {
        await batch.commit();
    } catch(err){
        console.log(err);
    }
}

const getExplaination = (request: StayRequest | LeaveRequest): string => {
    let explaination;
    if(isStay(request)){
        explaination = request.reason;
    } else {
        explaination = `Where: ${request.where}\n`;
        explaination += `Transportation: ${request.transport}`;
    }
    return explaination;
}

const createPendingRequest = (request: LeaveRequest | StayRequest): LeaveStayRequest => {
    const uid = fbadmin.firestore().collection('requests').doc().id;
    const leaveStay: LeaveStayRequest = {
        uid,
        student: {
            name: request.name,
            uid: request.uid,
            email: request.email
        },
        status: 'Pending',
        startDate: request.startDate,
        endDate: request.endDate,
        explaination: getExplaination(request),
        academicYear: getAcademicYear(),
        type: isStay(request) ? 'Stay' : 'Leave'
    };
    return leaveStay;
}

export const backgroundFns = {
    onLeaveRequestCreate,
    onStayRequestCreate,
    onRequestProcessed
}