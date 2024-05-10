import { Component } from '@angular/core';
import { SidePanelComponent } from './layout/side-panel/side-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SidePanelComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
}
