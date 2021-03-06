import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: "", redirectTo: "registration", pathMatch: "full" },
  {
  path: "login",
  loadChildren: ()=> import ("./login/login.module").then(m=>m.LoginModule)
},
{
  path: "registration",
  loadChildren: ()=> import ("./registration/registration.module").then(m=>m.RegistrationModule)
},
{
  path: "dashboard",
  loadChildren: ()=> import ("./dashboard/dashboard.module").then(m=>m.DashboardModule)
},
{ path: '**', redirectTo: "login"  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
