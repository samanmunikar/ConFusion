import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { of, Observable } from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
        private processHTTPMsgService: ProcessHTTPMsgService) { }

  // getLeaders(): Promise<Leader[]> {
  //   // return new Promise(resolve => {
  //   //   // Simulate the latency with 2 seconds delay
  //   //   setTimeout(() => resolve(LEADERS), 2000);
  //   // });
  //   return of(LEADERS).pipe(delay(2000)).toPromise();
  // }

  // getLeader(id: string): Promise<Leader> {
  //   // return new Promise(resolve => {
  //   //   // Simulate the latency with 2 seconds delay
  //   //   setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]), 2000);
  //   // });
  //   return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000)).toPromise();
  // }

  // getFeaturedLeader(): Promise<Leader> {
  //   // return new Promise(resolve => {
  //   //   // Simulate the latency with 2 seconds delay
  //   //   setTimeout(() => resolve(LEADERS.filter((leader) => (leader.featured))[0]), 2000);
  //   // });
  //   return of(LEADERS.filter((leader) => (leader.featured))[0]).pipe(delay(2000)).toPromise();
  // }

  getLeaders(): Observable<Leader[]> {
    // return new Promise(resolve => {
    //   // Simulate the latency with 2 seconds delay
    //   setTimeout(() => resolve(LEADERS), 2000);
    // });
    // return of(LEADERS).pipe(delay(2000));
    return this.http.get<Leader[]>(baseURL + 'leadership')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getLeader(id: string): Observable<Leader> {
    // return new Promise(resolve => {
    //   // Simulate the latency with 2 seconds delay
    //   setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]), 2000);
    // });
    // return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
    return this.http.get<Leader>(baseURL + 'leadership/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    // return new Promise(resolve => {
    //   // Simulate the latency with 2 seconds delay
    //   setTimeout(() => resolve(LEADERS.filter((leader) => (leader.featured))[0]), 2000);
    // });
    // return of(LEADERS.filter((leader) => (leader.featured))[0]).pipe(delay(2000));
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true')
      .pipe(map(leaders => leaders[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
