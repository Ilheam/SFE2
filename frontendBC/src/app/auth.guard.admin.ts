import { inject } from "@angular/core";
import { CanActivateFn, Router, UrlTree } from "@angular/router";
import { Observable, take, map } from "rxjs";
import { AuthService } from "./auth.service";

export const authGuardAdmin: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
    let authService = inject(AuthService);
    let router = inject(Router);

    return authService.authSubject.pipe(take(1), map((userSubject) => {
        if (userSubject) {
            return userSubject.role == "ADMIN" ? true : router.createUrlTree(['/home']);
        }
        return router.createUrlTree(['login']);
    }));
}