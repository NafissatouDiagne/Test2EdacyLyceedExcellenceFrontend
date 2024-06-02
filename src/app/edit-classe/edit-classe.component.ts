import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GraphqlModule } from '../graphql/graphql.module';

@Component({
  selector: 'app-edit-classe',
  standalone: true,
  imports: [CommonModule,FormsModule,GraphqlModule],
  templateUrl: './edit-classe.component.html',
  styleUrl: './edit-classe.component.css'
})
export class EditClasseComponent {
selectedClasse:any;
allClasses:any[]=[];
  updateClasse: any = {
    name: '',

  };
  classe: any;

  constructor(private data: DataService, private route: ActivatedRoute,private router:Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectedClasse = params.get('id');
      console.log('this.selectedClasse', this.selectedClasse);
      this.data.getClasses().subscribe((response) => {
        const foundclasse = response.classes.find((e: { id: any }) => e.id === this.selectedClasse);
        if (foundclasse) {
          this.updateClasse = foundclasse;
          this.classe = this.updateClasse;
        } else {
          console.error('classe not found');
        }
        console.log('this.updateClasse', this.updateClasse);
      });
    });


  }

  update(id: any) {
    this.data.updateClass(id, this.updateClasse).subscribe({
      next: (response) => {
        console.log('update', response);

        this.data.getClasses().subscribe((classes) => {
          this.allClasses = classes.classe;
        });
        this.router.navigate(['/classe']);
      },
      error: (error) => {
        console.error('An error occurred while updating the classe:', error);
      }
    });
  }
}


