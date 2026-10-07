import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavigateComponent } from './components/navigate/navigate.component';

/**
 * ============================================
 * STANDALONE COMPONENTS - Angular 21
 * ============================================
 * Since Angular 19 every component is standalone by default,
 * so 'standalone: true' is no longer needed.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected readonly title = 'ea-exercise-angular';
}
