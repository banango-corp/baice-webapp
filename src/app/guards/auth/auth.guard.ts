import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        const url = state.url;

        if (this.authService.isLoggedIn()) {
            if (url == '/login') {
                return this.router.parseUrl('/home');
            } else {
                return true;
            }
        } else {
            sessionStorage.clear();
            return this.router.parseUrl('login');
        }
    }
}
