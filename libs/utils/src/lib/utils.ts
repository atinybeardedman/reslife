
  
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