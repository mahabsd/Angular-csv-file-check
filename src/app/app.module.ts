import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DndDirective } from './direcitves/dnd.directive';
import { ProgressComponent } from './components/progress/progress.component';
import { HttpClientModule } from '@angular/common/http';
import { MappingComponent } from './mapping/mapping.component';
import { MappingServices } from './services/mapping.service';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path:'' , component: MainComponent },
  { path:'mapping-phase' , component: MappingComponent }
]

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
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MappingServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
