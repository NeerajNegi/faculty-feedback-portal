import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { EditComponent } from './edit/edit.component';
import { RouterModule, Routes} from '@angular/router';
import { AuthGuard} from './auth.guard';
import { TopnavComponent } from './topnav/topnav.component';
import { ApiService } from './api.service';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'editProfile',
    component: EditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '' , redirectTo: 'home', pathMatch: 'full'
  },
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    EditComponent,
    TopnavComponent
  ],
  imports: [
    BrowserModule,
    AngularFileUploaderModule,
    RouterModule.forRoot(appRoutes),
    MDBBootstrapModule.forRoot(),
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [AuthGuard, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
