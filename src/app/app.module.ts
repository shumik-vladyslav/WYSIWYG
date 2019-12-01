import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { EditorViewComponent } from './editor-view/editor-view.component';
import { ModelService } from './editor/editor.service';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    EditorViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ModelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
