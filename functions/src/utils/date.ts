import * as moment from 'moment-timezone';
export function getDateString(d: Date = new Date()): string {
  const month = d.toLocaleDateString('en-US', {
    timeZone: 'America/New_York',
    month: '2-digit',
  });
  const date = d.toLocaleDateString('en-US', {
    timeZone: 'America/New_York',
    day: '2-digit',
  });
  const year = d.toLocaleDateString('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
  });
  return `${year}-${month}-${date}`;
}

export function addTime(timestring: string, minutes: string): string {
  const m = moment();
  m.set('hour', parseInt(timestring.substr(0, 2), 10));
  m.set('minute', parseInt(timestring.substr(3), 10));
  m.add(minutes, 'minutes');
  return m.format('HH:mm');
}

export function getLocaleDatestring(date = new Date()): string {
  return date.toLocaleDateString('en-US', { timeZone: 'America/New_York' });
}

export function toIsoTimezoneString(date = new Date()): string {
  return moment.tz(date, 'America/New_York').format();
}

export function getTimeString(dateString = toIsoTimezoneString()): string {
  return dateString.substr(11, 5);
}

export function getDateFromDateString(datestring: string): Date {
  const days = datestring.split('-').map((d) => parseInt(d));
  return new Date(days[0], days[1] - 1, days[2], 12);
}

export function combineDateTimeStr(
  datestring: string,
  timestring: string
): string {
  return moment.tz(`${datestring} ${timestring}`, 'America/New_York').format();
}

export function combineDatetime(date: Date, time: string) {
  const d = new Date(date);
  d.setHours(parseInt(time.substr(0, 2), 10));
  d.setMinutes(parseInt(time.substr(3), 10));
  return new Date(d);
}

/**
 * 
 * @param date - Date to get academic year for
 * @returns a string representing the current academic year in the format YYYY-YY
 */
 export function getAcademicYear(date = new Date()): string {
  const startYear = date.getMonth() > 5 ? date.getFullYear() : date.getFullYear() - 1;
  return `${startYear}-${(startYear + 1).toString().substr(2)}`;
}

export function getIncludedDays(start: string, end: string, filter?:(date: string) => boolean ): string[] {
  const result = [];
  let currentDate = getDateFromDateString(start);
  let currentString = getDateString(currentDate);
  while(currentString <= end){
    if(filter){
      if(filter(currentString)){
        result.push(currentString);  
      }
    }else {
      result.push(currentString);
    }
    currentDate = new Date(currentDate.getTime() + 24 * 3600 * 1000);
    currentString = getDateString(currentDate)
  }
  return result;
}

export function addToDatestring(date: string, amount: number): string {
  const dateObj = getDateFromDateString(date);
  const momentObj = moment.tz(dateObj, 'America/New_York');
  const result = momentObj.add(amount, 'days');
  return getDateString(result.toDate());
}