import {Component, OnInit} from '@angular/core';
import Zone from '../../models/zone.model';
import {ZoneService} from "../../services/zone.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public zones?: Zone[];
  public showPopup = false;
  public drawPolygon = false;
  public currentZone?: any;

  constructor(private zoneService: ZoneService) {
  }
  ngOnInit(): void {
    this.zoneService.getZones().subscribe((data: any) => {
      this.zones = data
    })
  }

  createEditZone() {
    this.showPopup = true;
  }

  createPolygon(points: any) {
    this.drawPolygon = false;
    this.currentZone = {
      id: this.currentZone?.id,
      name: this.currentZone?.name || '',
      points: points,
    }

    if (this.currentZone.id) {
      this.editZone();
    } else {
      this.createZone();
    }
  }

  onSubmit(zone: any) {
    this.currentZone = zone;
    this.drawPolygon = true;
    this.closePopup();
  }

  closePopup(zoneId?: number | null) {
    if (zoneId) {
      this.zones = this.zones?.filter((zone) => zone.id !== zoneId);
    }
    this.showPopup = false;
  }

  editZone() {
    this.zoneService.editZone(this.currentZone ).subscribe(() => {
      this.zones = this.zones?.map((zone: Zone) => (zone.id === this.currentZone?.id ? this.currentZone : zone));
    });
  }

  createZone() {
    if (this.currentZone) {
      this.zoneService.createZone(this.currentZone).subscribe((data) => {
        this.zones = [...(this.zones || []), data];
      });
    }
  }

  deleteAllZones() {
    this.zoneService.deleteAllZones().subscribe(() => this.zones = []);
  }
}
