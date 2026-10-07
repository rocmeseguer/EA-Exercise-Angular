import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * ============================================
 * ROUTING - Navigation Component
 * ============================================
 * Demonstrates Angular Router with:
 * - routerLink for navigation
 * - routerLinkActive for active route styling
 *
 * Only the directives that are used are imported
 * (instead of the whole RouterModule).
 *
 * ============================================
 * ANGULAR MATERIAL
 * ============================================
 * Each Material component is imported where it is used,
 * like any other standalone component/directive.
 */
@Component({
    selector: 'app-navigate',
    imports: [
        RouterLink,
        RouterLinkActive,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './navigate.component.html',
    styleUrl: './navigate.component.scss'
})
export class NavigateComponent {
}
