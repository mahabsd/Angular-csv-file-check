import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DndDirective } from './direcitves/dnd.directive';
import { ProgressComponent } from './components/progress/progress.component';
import { HttpClientModule } from '@angular/common/http';
import { MappingComponent } from './mapping/mapping.component';
import { MappingServices } from './services/mapping.service';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    DndDirective,
    ProgressComponent,
    MappingComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [MappingServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
