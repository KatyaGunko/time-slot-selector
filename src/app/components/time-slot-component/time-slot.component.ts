import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

import { SlotsReservationService } from '../../services/slots-reservation.service';

import { TimeSlot } from '../../models/time-slot';
import { Subject } from 'rxjs/index';
import { takeUntil } from 'rxjs/internal/operators';

const moment = extendMoment(Moment);

@Component({
  selector: 'app-time-slot',
  templateUrl: './time-slot.component.html',
  styleUrls: ['./time-slot.component.css']
})
export class TimeSlotComponent implements OnInit, OnDestroy {
  @Input() public slot: TimeSlot;
  @Output() public slotSelected: EventEmitter<TimeSlot> = new EventEmitter();
  @Output() public clearSlot: EventEmitter<void> = new EventEmitter();

  private selectedSlots: TimeSlot[] = [];
  private cancelSubscription$: Subject<void> = new Subject<void>();

  constructor(private slotsReservationService: SlotsReservationService) {}

  public ngOnInit() {
    this.slotsReservationService.reservedSlots$
      .pipe(takeUntil(this.cancelSubscription$))
      .subscribe((slots: TimeSlot[]) => {
        this.selectedSlots = slots;
        this.isSlotAvailable();
      });
  }

  public isSelected() {
    return this.selectedSlots.find(slot => slot.id === this.slot.id);
  }

  public setReservation() {
    if (this.isSlotAvailable()) {
      this.slotSelected.emit(this.slot);
    }
  }

  public clearReservation() {
    this.clearSlot.emit();
  }

  public isSlotAvailable() {
    return !this.selectedSlots.some((timeSlot: TimeSlot) => {
      const range1 = moment.range(
        moment(timeSlot.startTimeTimestamp),
        moment(timeSlot.endTimeTimestamp)
      );
      const range2 = moment.range(
        moment(this.slot.startTimeTimestamp),
        moment(this.slot.endTimeTimestamp)
      );

      return range1.overlaps(range2);
    });
  }

  public ngOnDestroy() {
    this.cancelSubscription$.next();
  }
}
