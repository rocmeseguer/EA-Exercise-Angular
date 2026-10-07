import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';

/**
 * ============================================
 * APPLICATION CONFIG - Angular 21
 * ============================================
 * Since Angular 21 applications are ZONELESS by default:
 * zone.js is no longer loaded and change detection is triggered by
 * signals, template events and the async pipe.
 * That's why component state is stored in signals (see components).
 *
 * withComponentInputBinding(): route parameters (':id'), query params
 * and route data are passed to the routed component as input()s.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch())
  ]
};
