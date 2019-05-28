import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions():Promise<Promotion[]> {
    return new Promise(resolve => {
      // Simulate the latency with 2 seconds delay
      setTimeout(() => resolve(PROMOTIONS), 2000);
    });
  }

  getPromotion(id:string): Promise<Promotion> {
    return new Promise(resolve => {
      // Simulate the latency with 2 seconds delay
      setTimeout(() => resolve(PROMOTIONS.filter((Promo) => (Promo.id === id))[0]), 2000);
    });
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return new Promise(resolve => {
      // Simulate the latency with 2 seconds delay
      setTimeout(() => resolve(PROMOTIONS.filter((Promo) => Promo.featured)[0]), 2000);
    }); 
  }
}
