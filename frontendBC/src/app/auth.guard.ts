import { inject } from '@angular/core';
import { Router, CanActivateFn, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  let authService = inject(AuthService);
  let router = inject(Router);

  return authService.authSubject.pipe(take(1), map((userSubject) => {
    return userSubject ? true : router.createUrlTree(['login']);
  }));
}


