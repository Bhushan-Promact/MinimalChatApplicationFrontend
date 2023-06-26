import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserContainerComponent } from './user-container/user-container.component';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserMessagesComponent } from './user-messages/user-messages.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

const routes: Routes = [
  {
    path: '', component: UserContainerComponent, children: [
      { path: 'login', component: LoginComponent },
      {
        path: 'dashboard', component: UserDashboardComponent, children: [
          { path: 'conversations/:userId', component: UserMessagesComponent }
        ]
      },
      { path: 'register', component: UserRegistrationComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
