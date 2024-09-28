import { Component } from '@angular/core'; // Importing the Component decorator from Angular core

@Component({
  selector: 'app-root', // The custom HTML tag to use this component
  templateUrl: './app.component.html', // The path to the HTML template for this component
  styleUrls: ['./app.component.scss'] // The path to the SCSS styles for this component
})
export class AppComponent {
  title = 'Prueba-tecnica'; // Defining a property 'title' with the value 'Prueba-tecnica'
}
