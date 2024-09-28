import { Component } from '@angular/core'; // Import the Component decorator from Angular core.
import { CommonModule } from '@angular/common'; // Import CommonModule to use common directives.
import { RouterModule } from '@angular/router'; // Import RouterModule to enable routing functionality.
import { MatListModule } from '@angular/material/list'; // Import MatListModule for Material Design lists.
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule for Material Design icons.

@Component({
  selector: 'app-sidebar', // Define the selector for the component, which will be used in templates.
  standalone: true, // Mark the component as standalone, allowing it to be used without a module.
  imports: [RouterModule, MatListModule, MatIconModule, CommonModule], // List of modules to import for this component.
  templateUrl: './sidebar.component.html', // Path to the HTML template for the component.
  styleUrls: ['./sidebar.component.scss'] // Path to the SCSS styles for the component.
})
export class SidebarComponent { 
  isExpanded: boolean = false; // Property to track the sidebar's expansion state (collapsed/expanded).

  // Method to toggle the sidebar's expanded state.
  toggleSidebar() {
    this.isExpanded = !this.isExpanded; // Switch the isExpanded state between true and false.
  }
}
