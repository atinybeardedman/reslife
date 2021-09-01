import * as fbadmin from 'firebase-admin';
import { getDateString } from './utils/date';

export const toggleBoarderStatus = async () => {
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
