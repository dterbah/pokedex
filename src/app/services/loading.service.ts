import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoading = signal(false);

  constructor() {}

  isAppLoading(): Signal<boolean> {
    return this.isLoading;
  }

  start() {
    this.isLoading.set(true);
  }

  stop() {
    this.isLoading.set(false);
  }
}
