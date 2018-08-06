import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {routes} from './app.routes';
import {UserService} from './services/user.service';
import {SharedService} from './services/shared.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AuthInterceptor} from './auth.interceptor';
import {AuthGuard} from './auth.guard';
import { UserNewComponent } from './user-new/user-new.component';
import { UserListComponent } from './user-list/user-list.component';
import {DialogService} from './dialog.service';
import { TicketNewComponent } from './ticket-new/ticket-new.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { SummaryComponent } from './summary/summary.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    UserNewComponent,
    UserListComponent,
    TicketNewComponent,
    TicketListComponent,
    TicketDetailComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes,
  ],
  providers: [UserService, SharedService, AuthGuard, DialogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
