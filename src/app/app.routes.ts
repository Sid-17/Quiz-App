import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { QuizComponent } from './quiz/quiz.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, resolve: { data: UserResolver}},
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent,  resolve: { data: UserResolver}},
  { path: 'quiz', component: QuizComponent,  resolve: { data: UserResolver}},
  { path: 'add-quiz', component: AddQuizComponent,  resolve: { data: UserResolver}}
];