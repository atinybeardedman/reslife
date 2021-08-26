import * as utils from './utils';

const  pad = (num : number): string => {
  const norm = Math.floor(Math.abs(num));
  return (norm < 10 ? "0" : "") + norm;
};

const getTimezoneOffset = (d = new Date()):string => {
  const offset = -1 * d.getTimezoneOffset();
  const symbol = offset >= 0 ? '+' : '-';
  const hours = Math.floor(offset / 60);
  const minutes = offset % 60;
  return `${symbol}${pad(hours)}:${pad(minutes)}`
}

describe('utils', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2021, 5, 1,8,0,0,0));
  });
  const currentTimezoneString = '2021-06-01T08:00:00'+getTimezoneOffset();

  afterAll(() => {
    jest.useRealTimers();
  })
 describe('getIsoTimezoneString', () => {
  it('should give the correct string for the current date', () => {
    expect(utils.getIsoTimezoneString()).toBe(currentTimezoneString);
  });
  it('should give the correct string for a given date', () => {
    const d = new Date(2021,11,25,8,0,0,0);
    const expectedString = '2021-12-25T08:00:00'+getTimezoneOffset(d)
    expect(utils.getIsoTimezoneString(d)).toBe(expectedString);
  })
 });

 describe('getDateString', () => {
   it('should give the correct string for the current date', () => {
     expect(utils.getDateString()).toBe('2021-06-01');
   });

   it('should give the correct string for a given date', () => {
     const d = new Date(2021,11,25,23,0,0,0);
     const expectedString = '2021-12-25';
    expect(utils.getDateString(d)).toBe(expectedString);
  });
 });

 describe('getDateFromDatestring', () => {
   it('should correctly set a date given a date string', () => {
     const string = '2021-12-25';
     const expectedDate = new Date(2021, 11, 25, 8);
     expect(utils.getDateFromDatestring(string)).toEqual(expectedDate);
   });
   it('should correctly set the date for the current date', () => {
     expect(utils.getDateFromDatestring()).toEqual(new Date());
   })
 })

 describe('getYearEndDateString', () => {
   it('should correctly get the year end given a date', () => {
     const fallDate = new Date(2021, 10, 10);
     const springDate = new Date(2022, 4,1);
     const expectedString = '2022-06-30';
     expect(utils.getYearEndDateString(fallDate)).toBe(expectedString);
     expect(utils.getYearEndDateString(springDate)).toBe(expectedString);
   });

   it('should correctly get the year end when no date is given', () => {
     expect(utils.getYearEndDateString()).toBe('2021-06-30');
   })
 });

 describe('getAcademicYear', () => {
   it('should correctly get the academic year given a date', () =>{
    const fallDate = new Date(2021, 10, 10);
    const springDate = new Date(2022, 4,1);
    const expectedString = '2021-22';
    expect(utils.getAcademicYear(fallDate)).toBe(expectedString);
    expect(utils.getAcademicYear(springDate)).toBe(expectedString);
   });

   it('should correctly get the year end when no date is given', () => {
    expect(utils.getAcademicYear()).toBe('2020-21');
  })
 });

 describe('incrementAcademicYear',() => {
   it('should increment the academic year', () => {
     const year = '2020-21';
     const expected = '2021-22';
     expect(utils.incrementAcademicYear(year)).toBe(expected);
   })
 })

 describe('getTime', () => {
   it('should give the current time string based on the current date', () => {
     expect(utils.getTime()).toBe('08:00');
   });
   it('should give the correct time string based on a given time', () => {
    const d = new Date(2021,11,25,23,0,0,0);
     expect(utils.getTime(d)).toBe('23:00');
   });
 });

 describe('getTimeDiff', () => {
   it('should give the difference in minutes between 2 dates', () => {
     const end = new Date(2021,5,1,12,45,0,0);
     const start = new Date(2021,5,1,12,30,0,0);
     expect(utils.getTimeDiff(end, start)).toBe(15);

   })
 })
});

describe('orderByName', () => {
  it('should sort nameditems by name', () => {
    const names = ['b', 'a', 'd', 'c'];
    const items = names.map(d => ({name: d}))
    items.sort(utils.orderByName);
    expect(items).toEqual(names.sort().map(d => ({name: d})));
  })
})
