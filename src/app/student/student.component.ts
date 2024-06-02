
import { Component} from '@angular/core';
import {  CommonModule } from '@angular/common';
import {  FormsModule, NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { GraphqlModule } from '../graphql/graphql.module';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule,FormsModule,GraphqlModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
  allStudents:any=[];
  user:any;
  search:string='';
  allClasse:any=[];
  filtrer=this.allStudents;
  updateStudent:any;
 ;
addNewItem={
  //id:0,
  name:'',
  email:'',
  classe:''
  }
  constructor(private data:DataService,private router:Router){}
ngOnInit(): void {
  this.getAllStudents()

    this.data.getClasses().subscribe((response)=>{
this.allClasse= response.classes;
    })




}
getAllStudents(){

  this.data.getStudents().subscribe((response)=>{
    this.user=response

this.allStudents=response.students;
this.filtrer=this.allStudents;
console.log('this.allStudents', this.allStudents)
  });
}

  getID(student: any) {



    this.updateStudent=student;
    console.log('this.updateStudent', this.updateStudent)
  }


  create() {
    console.log('this.addNewItem', this.addNewItem)
    this.data.addSudent(this.addNewItem).subscribe({
      next:(response) => {
        console.log('response', response);
        // Mettre à jour la liste des étudiants après l'ajout réussi
        this.data.getStudents().subscribe((students) => {
          this.allStudents = students.students;

          window.location.reload()
        });
      },
      error:(err) => {
        console.log('error', err);
      }})

  }



  Delete(id: string) {
    this.data.deleteStudent(id).subscribe({
      next: (response) => {
        console.log('Étudiant supprimé avec succès');
        this.data.getStudents().subscribe((students) => {
          this.allStudents = students.students;

        });
      },
      error: (error) => {
        console.error('Une erreur s\'est produite lors de la suppression de l\'étudiant :', error);
      }
    });
  }
Edit(id:any){
  this.router.navigate(['/updateStudent/',id]);

}
addstudent(){
  this.router.navigate(['/createStudent']);

}
filtered(){
  this.filtrer= this.allStudents.slice().filter((student:any) =>{
    return student.name && student.name.toLowerCase().includes(this.search.toLowerCase())})
}

}
