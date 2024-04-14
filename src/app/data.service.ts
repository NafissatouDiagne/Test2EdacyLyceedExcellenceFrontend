import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // Récupérer tous les étudiants
  getStudents():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/allStudents`);
  }

  // Ajouter un nouvel étudiant
  addStudent(student: any):Observable<any> {
    return this.http.post(`${this.apiUrl}/student`,student)
  }
// Mettre à jour un étudiant
updateStudent(id: number, data: any):Observable<any> {
  return this.http.put(`${this.apiUrl}/updateStudent/${id}`, data);}


  // Supprimer un étudiant
  deleteStudent(id: number):Observable<any>{

    return this.http.delete(`${this.apiUrl}/deleteStudent/${id}`)
  }


  /**
   *
   * Classes
   */
  private api = 'http://127.0.0.1:8000/api';



  // Récupérer tous les étudiants
  getClasses():Observable<any>{
    return this.http.get<any>(`${this.api}/allclasses`);
  }

  // Ajouter un nouvel étudiant
  addclasse(classe: any):Observable<any> {
    return this.http.post(`${this.api}/classes`,classe)
  }
// Mettre à jour un étudiant
updateclasse(id: number, data: any):Observable<any> {
  return this.http.put(`${this.api}/updateClasse/${id}`,data);}


  // Supprimer un étudiant
  deleteclasse(id: number):Observable<any>{
    return this.http.delete(`${this.api}/deleteClasse/${id}`)
  }
}
