interface NamedItem {
  name: string;
}  
  export function getIsoTimezoneString(date = new Date()): string {

    const tzo = -date.getTimezoneOffset(),
      dif = tzo >= 0 ? "+" : "-",
      pad = (num : number) => {
        const norm = Math.floor(Math.abs(num));
        return (norm < 10 ? "0" : "") + norm;
      };
    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      "T" +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes()) +
      ":" +
      pad(date.getSeconds()) +
      dif +
      pad(tzo / 60) +
      ":" +
      pad(tzo % 60)
    );
  }

export function getDateString(date = new Date()): string {
    const datestring = getIsoTimezoneString(date);
    const i = datestring.indexOf("T");
    return datestring.substring(0, i);
}

export function getDateFromDatestring(datestring = getDateString()): Date {
  const [ year, month, days] = datestring.split('-').map(d => parseInt(d, 10));
  return new Date(year, month - 1, days, 8);
}

/**
 * Returns June 30th datestring to represent the end of the current academic year based on the date given
 * @param date
 */
export function getYearEndDateString(date = new Date()): string {
  const [year, month ] = getDateString(date).split('-').map(d => parseInt(d, 10));
  const newYear = month > 6 ? year + 1 : year;
  return `${newYear}-06-30`;
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

export function incrementAcademicYear(year: string): string {
  return year.split('-').map(y => parseInt(y, 10) + 1).join('-');
}

export function getTime(date = new Date()): string {
  const datestring = getIsoTimezoneString(date);
  const i = datestring.indexOf("T");
  return datestring.substr(i+1, 5);
}

export function combineDatetime(date: Date, time: string): Date {
  const d = new Date(date);
  d.setHours(parseInt(time.substr(0, 2)));
  d.setMinutes(parseInt(time.substr(3)));
  return new Date(d);
}

export function getTimeDiff(end: Date, start: Date): number {
  return Math.floor((end.getTime() - start.getTime()) / (1000 * 60));
}

export function orderByName(a: NamedItem, b: NamedItem): number {
  if(a.name > b.name) {
    return 1;
  } else if (a.name < b.name){
    return -1
  } 
  return 0;
}