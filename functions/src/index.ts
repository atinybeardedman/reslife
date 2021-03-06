import * as fbadmin from 'firebase-admin';
fbadmin.initializeApp();

import { PromiseDict } from './types';
import * as maintenanceFns from './maintenance';
import {
  triggerableFns as dormTriggers,
  backgroundFns as dormBackgrounds,
} from './dorm';
import { backgroundFns as scheduleBackgrounds } from './schedule';
import { backgroundFns as requestsBackgrounds } from './leave-stay-requests';
import {
  backgroundFns as accountabilityBackgrounds,
  triggerableFns as accountabilityTriggers,
} from './accountability';
import {
  triggerableFns as boarderTriggers,
  backgroundFns as boarderBackgrounds,
} from './boarders';
import * as staffFns from './staff';
import { cronTriggerBuilder } from './cron';

const taskDict: PromiseDict = {
  ...boarderTriggers,
  ...dormTriggers,
  ...accountabilityTriggers,
};

exports.accountability = {
  ...accountabilityBackgrounds
}

exports.maintenance = {
  ...maintenanceFns,
};

exports.staff = {
  ...staffFns,
};

exports.requests = {
  ...requestsBackgrounds,
};

exports.dorm = {
  ...dormBackgrounds,
};

exports.boarders = {
  ...boarderBackgrounds,
};

exports.schedule = {
  ...scheduleBackgrounds,
};

exports.cron = {
  cronTrigger: cronTriggerBuilder(taskDict),
};
