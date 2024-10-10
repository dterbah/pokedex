import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoading = signal(true);

  constructor() {}

  isAppLoading(): Signal<boolean> {
    return this.isLoading;
  }

  start() {
    this.isLoading.set(true);
  }

  end() {
    this.isLoading.set(false);
  }
}
