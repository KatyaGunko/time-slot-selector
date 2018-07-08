import { Component } from '@angular/core';

import { CompanyService } from '../../services/company.service';
import { SlotsReservationService } from '../../services/slots-reservation.service';

import { TimeSlot } from '../../models/time-slot';
import { Company } from '../../models/company';

import { Observable } from 'rxjs/index';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {
  public companies$: Observable<Company[]> = this.companyService.companies$;
  public reservations$: Observable<any> = this.companyService.reservations$;

  constructor(
    private companyService: CompanyService,
    private slotsReservationService: SlotsReservationService
  ) {
    this.companyService.fetchCompanies();
  }

  public setReservation(slot: TimeSlot, company: Company) {
    this.slotsReservationService.setSlot(slot, company.id);
  }

  public clearReservation(company: Company) {
    this.slotsReservationService.removeSlot(company.id);
  }
}
