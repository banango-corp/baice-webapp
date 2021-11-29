import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class Interceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        const token = sessionStorage.getItem('token');

        if (token) {
            const clonedRequest = request.clone({
                headers: request.headers.set('Authorization', `Bearer ${token}`)
            });

            return next.handle(clonedRequest);
        } else {
            return next.handle(request);
        }
    }
}
