import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add the access token to the request headers
    request = this.addToken(request);

    // Handle HTTP requests
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>): HttpRequest<any> {
    // Get the access token from the local storage
    const accessToken = localStorage.getItem('access_token');

    // Add the access token to the request headers
    if (accessToken) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    return request;
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      // Get the refresh token from the local storage
      const refreshToken = localStorage.getItem('refresh_token');

      // Request a new access token using the refresh token
      return this.http.post<any>('http://localhost:3000/api/refresh', { refreshToken }).pipe(
        switchMap((newToken) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(newToken.accessToken);

          // Retry the original request with the new access token
          return next.handle(this.addToken(request));
        }),
        catchError((error) => {
          this.isRefreshing = false;
          // Log out the user or handle the error as needed
          // For simplicity, let's assume logging out the user
          console.error('Error refreshing token', error);
          return throwError(error);
        })
      );
    } else {
      // Wait until the token is refreshed before retrying the request
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap(() => next.handle(this.addToken(request)))
      );
    }
  }
}
