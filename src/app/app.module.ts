import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CompanyComponent } from './components/company-component/company.component';
import { TimeSlotComponent } from './components/time-slot-component/time-slot.component';
import { CompanyService } from './services/company.service';
import { HttpClientModule } from '@angular/common/http';
import { SlotsReservationService } from './services/slots-reservation.service';

@NgModule({
  declarations: [AppComponent, CompanyComponent, TimeSlotComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [CompanyService, SlotsReservationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
