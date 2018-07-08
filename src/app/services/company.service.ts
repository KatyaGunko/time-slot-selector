import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Company } from '../models/company';

import { TimeSlot } from '../models/time-slot';

import { BehaviorSubject, Observable, Subject } from 'rxjs/index';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private _companies: Company[] = [];
  private _reservations: any = {};
  private companiesStream: Subject<Company[]> = new Subject();
  private reservationsStream: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private httpClient: HttpClient) {}

  public get companies$(): Observable<Company[]> {
    return this.companiesStream.asObservable();
  }

  public get reservations$(): Observable<any> {
    return this.reservationsStream.asObservable();
  }

  public fetchCompanies() {
    this.httpClient
      .get('assets/time_slots.json', {
        observe: 'response'
      })
      .pipe(
        catchError(err => {
          console.error('Failed to fetch companies', err);
          return Observable.throw(err.statusText);
        })
      )
      .subscribe((res: any) => {
        this._companies = res.body.map(company => new Company(company));
        this.companiesStream.next(_.cloneDeep(this._companies));
      });
  }

  public setCompanyReservation(companyId: number, timeSlot: TimeSlot) {
    const neededCompany: Company = this._companies.find(
      (company: Company) => company.id === companyId
    );

    this._reservations[neededCompany.id] = timeSlot;

    this.reservationsStream.next(_.cloneDeep(this._reservations));
  }

  public removeCompanyReservation(companyId: number) {
    const neededCompany: Company = this._companies.find(
      (company: Company) => company.id === companyId
    );

    this._reservations[neededCompany.id] = null;

    this.reservationsStream.next(_.cloneDeep(this._reservations));
  }
}
