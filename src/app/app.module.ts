import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MdCardModule } from '@angular/material';
import { MdListModule } from '@angular/material';
import { MdInputModule } from '@angular/material';
import { MdSelectModule } from '@angular/material';
import { MdDialogModule } from '@angular/material';
import { MdIconModule, MdIconRegistry } from '@angular/material';

import { Ng2PageScrollModule } from 'ng2-page-scroll';

import { DatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppComponent } from './app.component';
import { ContactDialogComponent } from './contact-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdCardModule,
    MdListModule,
    MdInputModule,
    Ng2PageScrollModule,
    DatepickerModule.forRoot(),
    MdSelectModule,
    MdDialogModule,
    MdIconModule
  ],
  providers: [MdIconRegistry],
  bootstrap: [AppComponent],
  entryComponents: [
    ContactDialogComponent
  ]
})
export class AppModule { }
