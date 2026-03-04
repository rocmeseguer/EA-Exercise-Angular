import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * ============================================
 * ROUTING - Navigation Component
 * ============================================
 * Demonstrates Angular Router with:
 * - routerLink for navigation
 * - routerLinkActive for active route styling
 */
@Component({
    selector: 'app-navigate',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './navigate.component.html',
    styleUrls: ['./navigate.component.css']
})
export class NavigateComponent {
}
