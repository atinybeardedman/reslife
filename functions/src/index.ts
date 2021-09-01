import * as fbadmin from 'firebase-admin';
fbadmin.initializeApp();

import * as maintenanceFns from './maintenance';

exports.maintenance = {
    ...maintenanceFns
}