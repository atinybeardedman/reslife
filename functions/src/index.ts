import * as fbadmin from 'firebase-admin';
fbadmin.initializeApp();

import { PromiseDict } from './types';
import * as maintenanceFns from './maintenance';
import {
  triggerableFns as inspectionTriggers,
  backgroundFns as inspectionBackgrounds,
} from './room-inspection';
import * as boarderFns from './boarders';
import { cronTriggerBuilder } from './cron';

const taskDict: PromiseDict = {
  ...boarderFns,
  ...inspectionTriggers,
};

exports.maintenance = {
  ...maintenanceFns,
};

exports.roomInspection = {
  ...inspectionBackgrounds,
};

exports.cron = {
  cronTrigger: cronTriggerBuilder(taskDict),
};
