import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DndDirective } from './direcitves/dnd.directive';
import { ProgressComponent } from './components/progress/progress.component';
import { HttpClientModule } from '@angular/common/http';
import { MappingComponent } from './mapping/mapping.component';
import { MappingServices } from './services/mapping.service';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ModelComponent } from './model/model.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthorizationGuard } from './services/authorization.guard';
import { AllUsersComponent } from './all-users/all-users.component';
import { SingleUserComponent } from './all-users/single-user/single-user.component';
import { ExpensyaComponent } from './expensya/expensya.component';

const appRoutes: Routes = [
  { path:'' , component: MainComponent },
  { path:'mapping-phase' , component: MappingComponent },
  { path:'model' , component: ModelComponent, canActivate: [AuthorizationGuard] },
  { path:'login' , component: LoginComponent },
  { path:'home-expensya' , component: ExpensyaComponent },
  { path:'users' , component: AllUsersComponent },
  { path:'user' , component: SingleUserComponent }

]

@NgModule({
  declarations: [
    AppComponent,
    DndDirective,
    ProgressComponent,
    MappingComponent,
    MainComponent,
    NavbarComponent,
    ModelComponent,
    LoginComponent,
    AllUsersComponent,
    SingleUserComponent,
    ExpensyaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MappingServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
