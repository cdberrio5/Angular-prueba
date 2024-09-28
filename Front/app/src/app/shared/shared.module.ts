import { NgModule } from '@angular/core'; // Import the NgModule decorator from Angular core.
import { CommonModule } from '@angular/common'; // Import CommonModule for common directives and pipes.
import { BrowserModule } from '@angular/platform-browser'; // Import BrowserModule for browser-specific features.
import { SidebarComponent } from './components/sidebar/sidebar.component'; // Import the SidebarComponent to be used in this module.

@NgModule({
  imports: [
    BrowserModule, // Include BrowserModule to provide services necessary for running an application in a browser.
    CommonModule, // Include CommonModule to use common Angular directives, such as ngIf and ngFor.
    SidebarComponent // Import the SidebarComponent to be part of this module.
  ],
  exports: [
    SidebarComponent, // Export the SidebarComponent so it can be used in other modules.
  ]
})
export class SharedModule { } // Declare the SharedModule class.
