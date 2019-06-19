import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { of, Observable } from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
      private processHTTPMsgService: ProcessHTTPMsgService) { }

  // getPromotions():Promise<Promotion[]> {
  //   // return new Promise(resolve => {
  //   //   // Simulate the latency with 2 seconds delay
  //   //   setTimeout(() => resolve(PROMOTIONS), 2000);
  //   // });
  //   return of(PROMOTIONS).pipe(delay(2000)).toPromise();
  // }

  // getPromotion(id:string): Promise<Promotion> {
  //   // return new Promise(resolve => {
  //   //   // Simulate the latency with 2 seconds delay
  //   //   setTimeout(() => resolve(PROMOTIONS.filter((Promo) => (Promo.id === id))[0]), 2000);
  //   // });
  //   return of(PROMOTIONS.filter((Promo) => (Promo.id === id))[0]).pipe(delay(2000)).toPromise();
  // }

  // getFeaturedPromotion(): Promise<Promotion> {
  //   // return new Promise(resolve => {
  //   //   // Simulate the latency with 2 seconds delay
  //   //   setTimeout(() => resolve(PROMOTIONS.filter((Promo) => Promo.featured)[0]), 2000);
  //   // }); 
  //   return of(PROMOTIONS.filter((Promo) => Promo.featured)[0]).pipe(delay(2000)).toPromise();
  // }

  getPromotions():Observable<Promotion[]> {
    // return new Promise(resolve => {
    //   // Simulate the latency with 2 seconds delay
    //   setTimeout(() => resolve(PROMOTIONS), 2000);
    // });
    // return of(PROMOTIONS).pipe(delay(2000));
    return this.http.get<Promotion[]>(baseURL + 'promotions')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPromotion(id:string): Observable<Promotion> {
    // return new Promise(resolve => {
    //   // Simulate the latency with 2 seconds delay
    //   setTimeout(() => resolve(PROMOTIONS.filter((Promo) => (Promo.id === id))[0]), 2000);
    // });
    // return of(PROMOTIONS.filter((Promo) => (Promo.id === id))[0]).pipe(delay(2000));
    return this.http.get<Promotion>(baseURL + 'promotions/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    // return new Promise(resolve => {
    //   // Simulate the latency with 2 seconds delay
    //   setTimeout(() => resolve(PROMOTIONS.filter((Promo) => Promo.featured)[0]), 2000);
    // }); 
    // return of(PROMOTIONS.filter((Promo) => Promo.featured)[0]).pipe(delay(2000));
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true')
      .pipe(map(promotions => promotions[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
