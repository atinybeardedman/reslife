import * as fbadmin from 'firebase-admin';
fbadmin.initializeApp();

import { PromiseDict } from './types';
import * as maintenanceFns from './maintenance';
import * as boarderFns from './boarders';
import {cronTriggerBuilder} from './cron';

const taskDict:PromiseDict = {
    test: (options) => new Promise<void>(res => {
        console.log('test ran');
        res();
    }),
    ...boarderFns
};

exports.maintenance = {
    ...maintenanceFns,
}
exports.cron = {
    cronTrigger: cronTriggerBuilder(taskDict)
}