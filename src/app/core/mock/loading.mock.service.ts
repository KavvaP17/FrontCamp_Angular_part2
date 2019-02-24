import { BehaviorSubject } from 'rxjs';

export class LoadingMockService {
  public isLoading = new BehaviorSubject<boolean>(true);

  constructor() { }

  setIsLoadingValue(value: boolean) {
    this.isLoading.next(value);
  }

  getIsLoadingValue(): BehaviorSubject<boolean> {
    return this.isLoading;
  }
}
