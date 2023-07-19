import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import Zone from '../../models/zone.model'
import { FormControl, Validators } from '@angular/forms';
import { ZoneService } from "../../services/zone.service";


@Component({
  selector: 'app-zone-popup',
  templateUrl: './zone-popup.component.html',
  styleUrls: ['./zone-popup.component.scss']
})
export class ZonePopupComponent implements OnDestroy {
  public currentZone?: Zone;
  public editMode = false;
  public subscription$: any;

  public zoneName = new FormControl('', Validators.required);
  @Input() zones?: Zone[];
  @Output() onSubmit = new EventEmitter<any>();
  @Output() onClose = new EventEmitter<number | null>();

  constructor(private zoneService: ZoneService) {
  }

  openEditMode(zone?: Zone): void {
    this.editMode = true;
    if (zone) {
      this.currentZone = zone;
      this.zoneName.setValue(this.currentZone.name);
    } else {
      this.zoneName.setValue('');
    }
  }

  deleteZone(zoneId?: number): void {
    if (zoneId) {
      this.subscription$ = this.zoneService.deleteZone(zoneId).subscribe();
    }
    this.close(zoneId);
  }
  submit(): void {
    if (this.zoneName.invalid) {
      return;
    }
    this.onSubmit.emit({
      id: this.currentZone?.id,
      points: this.currentZone?.points || [],
      name: this.zoneName.value,
    });
  }

  close(zoneId?: number): void {
    this.onClose.emit(zoneId || null);
  }

  goBack(): void {
    this.editMode = false;
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
