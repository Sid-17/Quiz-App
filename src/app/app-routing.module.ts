import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './core/auth.guard';
import { QuizComponent } from './quiz/quiz.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserComponent},
  { path: 'quiz', component: QuizComponent},
  { path: 'add-quiz', component: AddQuizComponent},
  { path: 'result', component: ResultComponent},
  { path: '**', component: LoginComponent, canActivate: [AuthGuard] }
];