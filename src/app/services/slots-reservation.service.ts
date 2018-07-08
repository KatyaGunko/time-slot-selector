import * as _ from 'lodash';
import { Injectable } from '@angular/core';

import { CompanyService } from './company.service';
import { TimeSlot } from '../models/time-slot';

import { Observable, Subject } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class SlotsReservationService {
  private _reservedSlots: any = {};
  private _reservedSlotsStream: Subject<TimeSlot[]> = new Subject();

  constructor(private companyService: CompanyService) {}

  public get reservedSlots$(): Observable<TimeSlot[]> {
    return this._reservedSlotsStream.asObservable();
  }

  public setSlot(timeSlot: TimeSlot, companyId: number) {
    this._reservedSlots[companyId] = timeSlot;

    this._reservedSlotsStream.next(
      _.cloneDeep(
        Object.keys(this._reservedSlots).map(key => this._reservedSlots[key])
      )
    );
    this.companyService.setCompanyReservation(companyId, timeSlot);
  }

  public removeSlot(companyId: number) {
    delete this._reservedSlots[companyId];

    this._reservedSlotsStream.next(
      _.cloneDeep(
        Object.keys(this._reservedSlots).map(key => this._reservedSlots[key])
      )
    );
    this.companyService.removeCompanyReservation(companyId);
  }
}
