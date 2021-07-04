import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideMenuComponent } from './side-menu/side-menu.component';


const routes: Routes = [
  { path:'', component:DashboardComponent},
  { path:'*',component:DashboardComponent},
  { path:'create',component:CreatePostComponent},
  {
    path: '',
    component: SideMenuComponent,
    data : {module : 'dahboard'},
    outlet: 'side-menu'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
