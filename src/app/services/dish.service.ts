import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) { }

  // getDishIds(): Observable<string[] | any> {
  //   return of(DISHES.map(dish => dish.id));
  // }

  // getDishes(): Promise<Dish[]> {
  //   // return  new Promise(resolve => {
  //   //   // Simulate the latency with 2 seconds delay
  //   //   setTimeout(() => resolve(DISHES), 2000);
  //   // });
  //   return of(DISHES).pipe(delay(2000)).toPromise();
  // }

  getDishes(): Observable<Dish[]> {
    // return  new Promise(resolve => {
    //   // Simulate the latency with 2 seconds delay
    //   setTimeout(() => resolve(DISHES), 2000);
    // });
    // return of(DISHES).pipe(delay(2000));
    return this.http.get<Dish[]>(baseURL + 'dishes');
  }

  // getDish(id:string): Promise<Dish> {
  //   // return new Promise(resolve => {
  //   //   // Simulate the latency with 2 seconds delay
  //   //   setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
  //   // });
  //   return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000)).toPromise();
  // }

  getDish(id:string): Observable<Dish> {
    // return new Promise(resolve => {
    //   // Simulate the latency with 2 seconds delay
    //   setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
    // });
    // return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
    return this.http.get<Dish>(baseURL + 'dishes/' + id);
  }

  // getFeaturedDish(): Promise<Dish> {
  //   // return new Promise(resolve => {
  //   //   //Simulate the latency with 2 seconds delay
  //   //   setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
  //   // });  
  //   return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000)).toPromise();
  // }
  getFeaturedDish(): Observable<Dish> {
    // return new Promise(resolve => {
    //   //Simulate the latency with 2 seconds delay
    //   setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    // });  
    // return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true')
          .pipe(map(dishes => dishes[0]));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
  }
  
}
