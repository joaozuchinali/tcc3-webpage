import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  constructor() { }

  msToTime(dInput: number | string): string {
    let duration = Number(dInput);
    // var milliseconds: any = parseInt(String((duration%1000)/100));
    let seconds: any = parseInt(String((duration/1000)%60))
    let minutes: any = parseInt(String((duration/(1000*60))%60))
    let hours: any = parseInt(String((duration/(1000*60*60))%24));

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + "h " + minutes + "m " + seconds + "s";
  }

  msToSeg(dInput: number | string): number {
    let duration = Number(dInput);

    return Number((duration / 1000).toFixed(2));
  }

  msToMin(dInput: number | string): number {
    let duration = Number(dInput);

    return Number((duration / (1000 * 60)).toFixed(3));
  }

  msToHour(dInput: number | string): number {
    let duration = Number(dInput);

    return Number((duration / (1000 * 60 * 60)).toFixed(5));
  }
}
