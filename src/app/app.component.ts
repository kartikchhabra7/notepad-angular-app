import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotepadComponent } from './containers/notepad/notepad.component';
import { FooterComponent } from './containers/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NotepadComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
}
