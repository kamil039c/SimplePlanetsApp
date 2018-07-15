import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PlanetsAppMainComponent } from './planetsApp.main.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { PlanetsService } from './planets.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    PlanetsAppMainComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [PlanetsService],
  bootstrap: [PlanetsAppMainComponent]
})
export class AppModule { }
