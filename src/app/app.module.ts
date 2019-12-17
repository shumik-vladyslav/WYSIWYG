import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { EditorViewComponent } from './editor-view/editor-view.component';
import { ModelService } from './editor/editor.service';
import { ClickOutsideDirective } from './shared/click-outside.directive';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    EditorViewComponent,
    ClickOutsideDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PickerModule,
    EmojiModule
  ],
  providers: [ModelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
