import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.css'
})
export class EditStudentComponent {
  allStudents: any[] = [];
  selectedStudent: any;
  allClasses: any[] = [];
  updateStudent: any = {
    name: '',
    email: '',
    classe: ''
  };
  student: any;

  constructor(private data: DataService, private route: ActivatedRoute,private router:Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectedStudent = params.get('_id');
      console.log('this.selectedStudent', this.selectedStudent);
      this.data.getStudents().subscribe((response) => {
        const foundStudent = response.users.find((e: { _id: any }) => e._id === this.selectedStudent);
        if (foundStudent) {
          this.updateStudent = foundStudent;
          this.student = this.updateStudent;
        } else {
          console.error('Student not found');
        }
        console.log('this.updateStudent', this.updateStudent);
      });
    });

    this.data.getClasses().subscribe((response) => {
      this.allClasses = response.classes;
      console.log('this.allClasses', this.allClasses);
    });
  }

  update(id: any) {
    this.data.updateStudent(id, this.updateStudent).subscribe({
      next: (response) => {
        console.log('update', response);
        // Refresh the list of students after successful update
        this.data.getStudents().subscribe((students) => {
          this.allStudents = students.users;
        });
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error('An error occurred while updating the student:', error);
      }
    });
  }
}

