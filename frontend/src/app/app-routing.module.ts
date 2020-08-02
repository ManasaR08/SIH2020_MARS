import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';
import { DashboardAddComponent } from './pages/dashboard-add/dashboard-add.component';
import { DashboardViewComponent } from './pages/dashboard-view/dashboard-view.component';
import { DashboardUserComponent } from './pages/dashboard-user/dashboard-user.component';
import { DashboardResultComponent } from './pages/dashboard-result/dashboard-result.component';
import {AuthGuardService} from './_guards/auth.guard';
import { QuestionsComponent } from './pages/questions/questions.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'auth/:type',
    component: AuthComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuardService],
    // canActivateChild: [AuthGuardService],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: DashboardHomeComponent
      },
      {
        path: 'view/:type',
        component: DashboardViewComponent
      },
      {
        path: 'user/:type',
        component: DashboardUserComponent
      },
      {
        path: 'result',
        component: DashboardResultComponent
      },
      {
        path: 'add',
        component: DashboardAddComponent
      },
      {
        path: 'questions',
        component: QuestionsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
