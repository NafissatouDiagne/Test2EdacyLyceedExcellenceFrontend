import { Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { CreateComponent } from './create/create.component';
import { CreateClasseComponent } from './create-classe/create-classe.component';
import { EditClasseComponent } from './edit-classe/edit-classe.component';
import { ClasseComponent } from './classe/classe.component';

export const routes: Routes = [
  {path:'',component:StudentComponent},

{path:'createStudent',component:CreateComponent},
  {path:'updateStudent/:id',component:EditStudentComponent},
  {path:'createClasse',component:CreateClasseComponent},
  {path:'updateClasse/:id',component:EditClasseComponent},
  {path:'classe',component:ClasseComponent},
  {path:'**',redirectTo:''}
];
