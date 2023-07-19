import {Component, EventEmitter, Input, Output} from '@angular/core';
import Zone from '../../models/zone.model'
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-zone-popup',
  templateUrl: './zone-popup.component.html',
  styleUrls: ['./zone-popup.component.scss']
})
export class ZonePopupComponent {
  public zoneTitle: string = '';
  public currentZone?: Zone;
  public editMode = false;

  public zoneName = new FormControl('', Validators.required);
  @Input() zones?: Zone[];
  @Output() onSubmit = new EventEmitter<any>();
  @Output() onClose = new EventEmitter<void>();

  openEditMode(zone?: Zone) {
    this.editMode = true;
    if (zone) {
      this.currentZone = zone;
      this.zoneName.setValue(this.currentZone.name);
    } else {
      this.zoneName.setValue('');
    }
  }
  submit() {
    if (this.zoneName.invalid) {
      return;
    }
    this.onSubmit.emit({
      id: this.currentZone?.id,
      points: this.currentZone?.points || [],
      name: this.zoneName.value,
    });
  }

  close() {
    this.onClose.emit();
  }

  goBack() {
    this.editMode = false;
  }
}
