import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
const uri='http://127.0.0.1:3000/graphql';
export function createApollo(httpLink: HttpLink){
  return{
    link: httpLink.create({uri}),
    cache: new InMemoryCache(),
  }
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApolloModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphqlModule { }
