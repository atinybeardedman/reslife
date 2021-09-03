import * as fbadmin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { StaffMember } from './types';

export const onStaffCreation = functions.firestore
  .document('staff/{newId}')
  .onCreate(async (snap, context) => {
    const uid = context.params.newId;
    const staff = snap.data() as StaffMember;
    try {
      await fbadmin.auth().createUser({
        uid,
        email: staff.email,
        displayName: staff.name,
      });
    } catch (err) {
      console.log(err);
    }
  });

export const onStaffDeletion = functions.firestore
  .document('staff/{oldId}')
  .onDelete(async (snap, context) => {
    try {
      await fbadmin.auth().deleteUser(context.params.oldId);
    } catch (err) {
      console.log(err);
    }
  });
