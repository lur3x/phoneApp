import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { UserPageComponent } from './components/user-page/user-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomepageComponent,
  },
  {
    path: 'user/:id',
    component: UserPageComponent,
  },
  {
    path: 'add',
    component: AddUserComponent,
  },
  {
    path: 'edit/:id',
    component: EditUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
