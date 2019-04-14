import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions():Promotion[] {
    return PROMOTIONS;
  }

  getPromotion(id:string): Promotion {
    return PROMOTIONS.filter((Promo) => (Promo.id === id))[0];
  }

  getFeaturedPromotion(): Promotion {
    return PROMOTIONS.filter((Promo) => Promo.featured)[0];  
  }
}
