import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']); // Redirect to login if not authenticated
          return false;
        }

        // Type assertion to tell TypeScript that 'data' has 'expectedRole'
        const expectedRole = (next.data as { expectedRole: string }).expectedRole;
        const userRole:any = this.authService.getUserRole(); // Assuming you have a method to get user roles
        if (userRole === expectedRole) {
          return true; // User has the required role, grant access
        } else {
          this.router.navigate(['/unauthorized']); // Redirect to unauthorized page if role is not matched
          return false;
        }
      }),
    );
  }
}
