
  function getIsoTimezoneString(date = new Date()): string {

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
