import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GraphqlModule } from '../graphql/graphql.module';

@Component({
  selector: 'app-classe',
  standalone: true,
  imports: [CommonModule,FormsModule,GraphqlModule],
  templateUrl: './classe.component.html',
  styleUrl: './classe.component.css'
})
export class ClasseComponent {
  allclasses:any=[];
  updateclasse:any;
  search:string='';
  filtrer= this.allclasses;
name:string='';


  constructor(private data:DataService,private router:Router){}
ngOnInit(): void {
    this.data.getClasses().subscribe((response)=>{
this.allclasses=response.classes;
this.filtrer= this.allclasses
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

  create() {
    this.data.addClass(this.addNewItem).subscribe({
      next:(response) => {
        console.log('response', response);
        // Mettre à jour la liste des étudiants après l'ajout réussi
        this.data.getClasses().subscribe((classes) => {
          this.allclasses = classes.classes;
          console.log('this.allclasses', this.allclasses)
          window.location.reload()
        });
      },
      error:(err) => {
        console.log('error', err);
      }})

  }


  update() {


    console.log('updateItem', this.updateItem);

    this.data.updateClass(this.updateclasse.id, this.updateItem).subscribe({
      next: (response) => {
        console.log('update', response);
        this.data.getClasses().subscribe((classes) => {
          this.allclasses = classes.classes;
          window.location.reload()
        });
      },
      error: (error) => {
        console.error('Une erreur s\'est produite lors de la mise à jour de l\'étudiant :', error);
      }
    });
  }
  Delete(id: number) {
    this.data.deleteClass(id).subscribe({
      next: (response) => {
        console.log('Classe supprimer avec succès');
        this.data.getClasses().subscribe((classes) => {
          this.allclasses = classes.classes;
         window.location.reload()
        });
      },
      error: (error) => {
        console.error('Une erreur s\'est produite lors de la suppression de l\'étudiant :', error);
      }
    });
  }

Classe(){
this.router.navigate([''])
}
Edit(id:any){
  this.router.navigate(['/updateClasse/',id]);

}
addClasse(){
  this.router.navigate(['/createClasse']);

}
filtered(){
  this.filtrer= this.allclasses.slice().filter((classe:any) =>{
    return classe.name && classe.name.toLowerCase().includes(this.search.toLowerCase())})
}

}
