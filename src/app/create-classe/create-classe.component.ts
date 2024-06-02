import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { GraphqlModule } from '../graphql/graphql.module';

@Component({
  selector: 'app-create-classe',
  standalone: true,
  imports: [CommonModule,FormsModule,GraphqlModule],
  templateUrl: './create-classe.component.html',
  styleUrl: './create-classe.component.css'
})
export class CreateClasseComponent {
  allclasses:any=[];
  updateclasse:any;
  id:number=0;
name:string='';


  constructor(private data:DataService,private router:Router){}
ngOnInit(): void {
    this.data.getClasses().subscribe((response)=>{
this.allclasses=response.classes;
console.log('this.allclasses', this.allclasses)
    })


}

addNewItem:any={
  name:''
  }
  getID(classe:any) {
   // this.id = classe.id;
    this.name = classe.name;

    this.updateclasse=classe;
    console.log('this.updateclasse', this.updateclasse)
  }
  updateItem={
    name:this.name
  }

  create(form:NgForm) {
    if(form){
      this.addNewItem={
        name:form.value.name
      }

    this.data.addClass(this.addNewItem).subscribe({
      next:(response) => {
        console.log('response', response);
        // Mettre à jour la liste des classes après l'ajout réussi
        this.data.getClasses().subscribe((classes) => {
          this.allclasses = classes.classes;
      this.router.navigate(['/classe']);
        });
      },
      error:(err) => {
        console.log('error', err);
      }})
    }
  }


StudentClasse(){
this.router.navigate([''])
}

}
