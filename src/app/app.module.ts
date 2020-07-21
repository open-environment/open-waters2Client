/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { AuthGuard } from './auth-guard.service';
import { NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken, NB_AUTH_TOKEN_INTERCEPTOR_FILTER } from '@nebular/auth';
import { ContentTypeInterceptor } from './ContentTypeInterceptor';
import { NgxAuthJWTInterceptor } from './NgxAuthJWTInterceptor';
import { WQXOrganizationService } from './@core/wqx-services/wqx-organization-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WQXProjectService } from './@core/wqx-services/wqx-project-service';
import { WQXActivityService } from './@core/wqx-services/wqx-activity-service';
// import { AddCharWindowComponent } from './secure/water-quality/wqx-org-data/add-char-window/add-char-window.component';
import { WqxMonlocService } from './@core/wqx-services/wqx-monloc.service';



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    ThemeModule.forRoot(),

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,
          },
          baseEndpoint: 'https://localhost:44327',
          login: {
            endpoint: '/auth/login',
            method: 'post',
            requireValidToken: false,
            redirect: {
              success: '/',
              failure: 'null',
            },
            defaultErrors: ['Login/Email combination is not correct, please try again.'],
            defaultMessages: ['You have been successfully logged in.'],
          },
          register: {
            endpoint: '/auth/sign-up',
            method: 'post',
          },
          logout: {
            endpoint: '/auth/sign-out',
            method: 'post',
            redirect: {
              success: '/auth/login',
              failure: '/',
            },
          },
          requestPass: {
            endpoint: '/auth/request-pass',
            method: 'post',
          },
          resetPass: {
            endpoint: '/auth/reset-pass',
            method: 'post',
          },
        }),
      ],
      forms: {
        login: {
          redirectDelay: 0,
          showMessages: {
            success: true,
          },
        },
        register: {
          redirectDelay: 0,
          showMessages: {
            success: true,
          },
        },
        requestPassword: {
          redirectDelay: 0,
          showMessages: {
            success: true,
          },
        },
        resetPassword: {
          redirectDelay: 0,
          showMessages: {
            success: true,
          },
        },
        logout: {
          redirectDelay: 0,
        },
      },
    }),
  ],
  providers: [
    AuthGuard,
    // { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: NgxAuthJWTInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ContentTypeInterceptor, multi: true },
    { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: (req) => false },
    WQXOrganizationService,
    WQXProjectService,
    WQXActivityService,
    WqxMonlocService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
