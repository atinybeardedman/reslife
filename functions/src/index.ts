import * as fbadmin from 'firebase-admin';
fbadmin.initializeApp();

import { PromiseDict } from './types';
import * as maintenanceFns from './maintenance';
import {
  triggerableFns as dormTriggers,
  backgroundFns as dormBackgrounds,
} from './dorm';
import { backgroundFns as scheduleBackgrounds } from './schedule';
import * as aodTriggers from './aod-notifications';
import * as boarderFns from './boarders';
import { cronTriggerBuilder } from './cron';

const taskDict: PromiseDict = {
  ...boarderFns,
  ...dormTriggers,
  ...aodTriggers
};

exports.maintenance = {
  ...maintenanceFns,
};

exports.dorm = {
  ...dormBackgrounds,
};

exports.schedule = {
  ...scheduleBackgrounds
}

exports.cron = {
  cronTrigger: cronTriggerBuilder(taskDict),
};
