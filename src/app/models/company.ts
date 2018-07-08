import * as _ from 'lodash';
import { TimeSlot } from './time-slot';

export class Company {
  private _id: number;
  private _name: string;
  private _type: string;
  public _timeSlots: any;
  public _timeSlotsDates: any[];

  constructor(data) {
    this._id = data.id;
    this._name = data.name;
    this._type = data.type;
    this._timeSlots = _.groupBy(
      _.sortBy(data.time_slots.map(timeSlot => new TimeSlot(timeSlot)), [
        'startTimeTimestamp',
        'endTimeTimestamp'
      ]),
      'day'
    );
    this._timeSlotsDates = Object.keys(this._timeSlots);
  }

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get type(): string {
    return this._type;
  }

  public get timeSlots(): TimeSlot[] {
    return this._timeSlots;
  }

  public get timeSlotsDates(): string[] {
    return this._timeSlotsDates;
  }
}
