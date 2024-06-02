/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from "@angular/router";

import { Apollo, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLink } from 'apollo-angular/http';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';

import { importProvidersFrom } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { routes } from './app/app.routes';
bootstrapApplication(
  AppComponent,
  {
    providers: [
      importProvidersFrom(HttpClientModule),
      provideRouter(routes),
      {
        provide: APOLLO_OPTIONS,
        useFactory: (
          httpLink: HttpLink,
        ): ApolloClientOptions<unknown> => ({
          link: ApolloLink.from([
            httpLink.create({ uri: 'http://127.0.0.1:3000/graphql' }),
          ]),
          cache: new InMemoryCache(),
        }),
        deps: [HttpLink],
      },
      Apollo,
    ],
  }
);
