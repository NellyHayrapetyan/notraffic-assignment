import { Component, Input } from '@angular/core';
import Zone from '../../models/zone.model';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.scss']
})
export class ZonesComponent {
  @Input() zones?: Zone[];
}