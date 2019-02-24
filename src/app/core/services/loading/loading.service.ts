import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public isLoading = new BehaviorSubject<boolean>(true);
  private loadingTimeDuration = 500;
  private time;

  constructor() { }

  setIsLoadingValue(value: boolean) {
    if (!value) {
      this.time = +Date.now();
      this.isLoading.next(value);
    }
    if (!this.isLoading.getValue() && value) {
      const currentDuration = +Date.now() - this.time;
      if ( currentDuration < this.loadingTimeDuration){
        setTimeout(() => {
          this.isLoading.next(value);
        }, this.loadingTimeDuration - currentDuration);
      } else {
        this.isLoading.next(value);
      }
    }
  }

  getIsLoadingValue(): BehaviorSubject<boolean> {
    return this.isLoading;
  }
}
