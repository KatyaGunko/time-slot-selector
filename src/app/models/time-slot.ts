import * as moment from 'moment';
import * as uuid from 'uuid/v4';
import { Moment } from 'moment';

export class TimeSlot {
  private _id: string;
  private _day: string;
  private _startTime: Moment;
  private _endTime: Moment;

  constructor(data) {
    this._id = uuid();
    this._day = moment(data.start_time).format('LL');
    this._startTime = moment(data.start_time);
    this._endTime = moment(data.end_time);
  }

  public get id(): string {
    return this._id;
  }

  public get day(): string {
    return this._day;
  }

  public get startTime(): string {
    return this._startTime.format('HH:mm');
  }

  public get endTime(): string {
    return this._endTime.format('HH:mm');
  }

  public get startTimeTimestamp(): number {
    return this._startTime.toDate().getTime();
  }

  public get endTimeTimestamp(): number {
    return this._endTime.toDate().getTime();
  }
}
