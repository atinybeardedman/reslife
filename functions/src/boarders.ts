import * as fbadmin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Boarder } from './types';
import { getDateFromDateString, getDateString } from './utils/date';
import { getCheckinsByDateRange } from './utils/excusals';

const toggleBoarderStatus = async () => {
  const today = getDateString();
  const inActiveBoarders = await fbadmin
    .firestore()
    .collection('boarders')
    .where('startDate', '<=', today)
    .where('isActive', '==', false)
    .get()
    .then(snap => snap.docs);

    const activeBoarders = await fbadmin
    .firestore()
    .collection('boarders')
    .where('endDate', '<=', today)
    .where('isActive', '==', true)
    .get()
    .then(snap => snap.docs);

    if(inActiveBoarders.length > 0 || activeBoarders.length > 0){
        const batch = fbadmin.firestore().batch();
    
        for(const b of inActiveBoarders){
            batch.update(b.ref, {isActive: true});
        }
    
        for(const b of activeBoarders){
            batch.update(b.ref, {isActive: false});
        }
        try {
            await batch.commit();

        } catch (err){
            console.log(err);
        }
    }

};

const onBoarderCreate = functions.firestore.document('boarders/{boarderID}').onCreate(async (snap) => {
    const boarder = snap.data() as Boarder;
    const checkIns = await getCheckinsByDateRange(boarder.startDate, boarder.endDate);
    const batch = fbadmin.firestore().batch();
    for(const checkIn of checkIns.docs){
        if(boarder.type === '5 Day'){
            const day = getDateFromDateString(checkIn.get('date')).getDay();
            if(day >= 5 || (day === 0 && checkIn.get('start') >= '19:00')){
                batch.set(checkIn.ref.collection('excused').doc(boarder.uid), {
                    uid: boarder.uid,
                    name: boarder.name,
                    note: '5 Day'
                });
                continue;
            }
        } 
        batch.set(checkIn.ref.collection('expected').doc(boarder.uid), {
            uid: boarder.uid,
            name: boarder.name
        })
    }
    try {
        await batch.commit();
    } catch(err){
        console.log(err);
    }
});

const onBoarderDelete = functions.firestore.document('boarders/{boarderID}').onDelete(async (snap) => {
    const boarder = snap.data() as Boarder;
    const checkIns = await getCheckinsByDateRange(boarder.startDate, boarder.endDate);
    const batch = fbadmin.firestore().batch();
    for(const checkIn of checkIns.docs){
        batch.delete(checkIn.ref.collection('expected').doc(boarder.uid))
        batch.delete(checkIn.ref.collection('excused').doc(boarder.uid))
    }
    try {
        await batch.commit();
    } catch(err){
        console.log(err);
    }
});


export const triggerableFns = {
    toggleBoarderStatus
}

export const backgroundFns = {
    onBoarderCreate,
    onBoarderDelete
};
