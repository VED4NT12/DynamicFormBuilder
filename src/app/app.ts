import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilderComponent } from './Components/form-builder.component/form-builder.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('DFBuilder');
}
