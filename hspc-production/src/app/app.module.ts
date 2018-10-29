import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Http, HttpModule, XHRBackend, RequestOptions, BrowserXhr } from '@angular/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { AuthService } from './_services/auth.service';
import { AuthGuardService } from './_services/auth-guard.service';
import { ToastService } from './_services/toast.service';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { NavComponent } from './nav/nav.component';
import { WebsocketService } from './_services/websocket.service';
import { ChatService } from './_services/chat.service';
import { HttpService } from './_services/http.service';
import { EqualDirective } from './_directives/equal.directive';
import { AdminComponent } from './admin/admin.component';
import { DashboardService } from './_services/dashboard.service';
import { TeamListComponent } from './team-list/team-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    ScoreboardComponent,
    ErrorpageComponent,
    LogoutComponent,
    RegisterComponent,
    NavComponent,
    EqualDirective,
    AdminComponent,
    TeamListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ToastService,
    AuthService,
    AuthGuardService,
    Title,
    HttpService,
    DashboardService,
    WebsocketService,
    ChatService,
    { provide: Http, useClass: HttpService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
