import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

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
    return of(PROMOTIONS).pipe(delay(2000));
  }

  getPromotion(id:string): Observable<Promotion> {
    // return new Promise(resolve => {
    //   // Simulate the latency with 2 seconds delay
    //   setTimeout(() => resolve(PROMOTIONS.filter((Promo) => (Promo.id === id))[0]), 2000);
    // });
    return of(PROMOTIONS.filter((Promo) => (Promo.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    // return new Promise(resolve => {
    //   // Simulate the latency with 2 seconds delay
    //   setTimeout(() => resolve(PROMOTIONS.filter((Promo) => Promo.featured)[0]), 2000);
    // }); 
    return of(PROMOTIONS.filter((Promo) => Promo.featured)[0]).pipe(delay(2000));
  }
}
