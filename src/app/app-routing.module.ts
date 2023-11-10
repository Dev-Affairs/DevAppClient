import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './services/auth.guard';
import { AdminUIComponent } from './admin-ui/admin-ui.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { StockistUiComponent } from './stockist-ui/stockist-ui.component';
import { VerifyUsersComponent } from './verify-users/verify-users.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  { path: 'admin', component: AdminUIComponent, canActivate: [authGuard], data: { expectedRole: 'admin' } },
  { path: 'vendor', component: StockistUiComponent, canActivate: [authGuard], data: { expectedRole: 'stockist' } },
  {path:"unauthorized",component:UnauthorizedComponent},
  {path:"verify-user",component:VerifyUsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
