import * as functions from 'firebase-functions';
export const isProduction = (): boolean =>
functions.firebaseConfig()?.projectId !== 'reslife-staging';