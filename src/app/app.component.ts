import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SplitifyComponent} from "./components/splitify/splitify.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SplitifyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Splitify';
}
