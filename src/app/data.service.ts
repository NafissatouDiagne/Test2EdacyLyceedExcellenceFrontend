import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import {catchError, map} from 'rxjs/operators'
import gql from 'graphql-tag'
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private apollo:Apollo) {}
//Recuperation de tus les etudiants
getStudents(): Observable<any>{
  return this.apollo.query({
    query:gql`
    query{
    students{
      id
      name
      email
      classe
    }
  }
    `
  }).pipe(
    map(result => result.data),
    catchError(error => {
      console.error('GraphQL error:', error);
      throw error;
    })
  );

}

//ajouter un nouvel etudiant
addSudent(student: { name: string; email: string; classe: string }): Observable<any> {
  return this.apollo.mutate({
    mutation: gql`
      mutation($name: String!, $email: String!, $classe: String!) {
        createStudent(name: $name, email: $email, classe: $classe) {
          id
          name
          email
          classe
        }
      }
    `,
    variables: {
      name: student.name,
      email: student.email,
      classe: student.classe
    }
  });
}

//Mettre a jour un etudiant
updateStudent(id: string, student: { name: string; email: string; classe: string }): Observable<any> {
  return this.apollo.mutate({
    mutation: gql`
      mutation updateStudent($id: ID!, $name: String!, $email: String!, $classe: String!) {
        updateStudent(id: $id, name: $name, email: $email, classe: $classe) {
          id
          name
          email
          classe
        }
      }
    `,
    variables: {
      id: id,
      ...student
    }
  });
}
//supprimer un etudiant
deleteStudent(id:string):Observable<any>{
  return this.apollo.mutate({
    mutation: gql`
      mutation removeStudent($id: ID!) {
        removeStudent(id: $id) {
          id
        }
      }
    `,
    variables: {
      id: id
    }
  });
}
  // Récupérer toutes les classes
  getClasses(): Observable<any> {
    return this.apollo.query({
      query: gql`
        query {
          classes {
            id
            name

          }
        }
      `
    }).pipe(
      map(result => result.data),
      catchError(error => {
        console.error('GraphQL error:', error);
        throw error;
      })
    );
  ;
  }

  // Ajouter une nouvelle classe
  addClass(classe: {name:string}): Observable<any> {
    return this.apollo.mutate({
        mutation: gql`
          mutation($name: String!) {
            createClasse(name: $name) {
              id
              name

            }
          }
        `,
        variables: {
          name: classe.name,

        }
      });
  }

  // Mettre à jour une classe
  updateClass(id: number, data: any): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation($id: ID!, $data: ClassInput!) {
          updateClass(id: $id, data: $data) {
            id
            name
          }
        }
      `,
      variables: {
        id,
        data
      }
    });
  }

  // Supprimer une classe
  deleteClass(id: number): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation removeClasse($id: ID!) {
          removeClasse(id: $id) {
            id
            name
          }
        }
      `,
      variables: {
        id: id

      }
    });
  }
  }
