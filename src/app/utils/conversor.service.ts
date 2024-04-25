import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  constructor() { }

  msToTime(duration: number): string {
    // var milliseconds: any = parseInt(String((duration%1000)/100));
    let seconds: any = parseInt(String((duration/1000)%60))
    let minutes: any = parseInt(String((duration/(1000*60))%60))
    let hours: any = parseInt(String((duration/(1000*60*60))%24));

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + "h " + minutes + "m " + seconds + "s";
  }
}
