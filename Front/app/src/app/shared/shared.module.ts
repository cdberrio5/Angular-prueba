import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    SidebarComponent
  ],
  exports: [
    SidebarComponent,
  ]
})
export class SharedModule { }
