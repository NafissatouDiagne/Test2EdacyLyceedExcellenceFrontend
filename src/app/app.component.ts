import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { GraphqlModule } from './graphql/graphql.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,StudentComponent,GraphqlModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test2Eda';
}
