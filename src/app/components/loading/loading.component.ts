import { Component, inject } from '@angular/core';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent {
  private isLoadingService = inject(LoadingService);

  isLoading = this.isLoadingService.isAppLoading();

  options: AnimationOptions = {
    path: '/assets/animations/spinner.json',
    loop: true,
    autoplay: Boolean(this.isLoading),
  };
}
