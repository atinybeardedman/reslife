import * as functions from 'firebase-functions';
export const isProduction = (): boolean =>
functions.firebaseConfig()?.projectId !== 'reslife-staging';


export function orderByProp<T>(prop: keyof T)  {
    return (a: T, b: T) => {
      if(a[prop] > b[prop]){
        return 1
      } else if(a[prop] < b[prop]){
        return -1;
      }
      return 0;
    }
  }