import { Component, inject } from '@angular/core';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [LottieComponent, PanelModule, ButtonModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  private router = inject(Router);

  options: AnimationOptions = {
    path: '/assets/animations/not-found.json',
    loop: true,
    autoplay: true,
  };

  goToHome() {
    this.router.navigate(['home']);
  }
}
