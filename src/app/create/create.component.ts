import { Component } from '@angular/core';

import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GraphqlModule } from '../graphql/graphql.module';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule,FormsModule,GraphqlModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  allStudents:any=[];
  user:any;
  allClasse:any=[];
  updateStudent:any;


addNewItem={

  name:'',
  email:'',
  classe:''
  }
  constructor(private data:DataService,private router:Router){}
  ngOnInit(): void {
      this.data.getStudents().subscribe((response)=>{
        this.user=response.students

  this.allStudents=response.students;
  console.log('this.allStudents', this.allStudents)
      });
      this.data.getClasses().subscribe((response)=>{
  this.allClasse= response.classes;
      })




  }


    create(form:NgForm) {

      if(form){
        this.addNewItem={
          name:form.value.name,
          email:form.value.email,
          classe:form.value.classe,

        }
console.log('this.addNewItem', this.addNewItem)
      this.data.addSudent(this.addNewItem).subscribe({
        next:(response) => {
          console.log('response', response);
          // Mettre à jour la liste des étudiants après l'ajout réussi
          this.data.getStudents().subscribe((students) => {
            this.allStudents = students.users;
          this.router.navigate([''])
          });
        },
        error:(err) => {
          console.log('error', err);
        }})

    }
  }

}
