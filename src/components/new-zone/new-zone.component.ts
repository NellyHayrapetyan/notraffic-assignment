import { Component, EventEmitter, Input, Output } from '@angular/core';
import Zone from '../../models/zone.model';

@Component({
  selector: 'app-new-zone',
  templateUrl: './new-zone.component.html',
})
export class NewZoneComponent {
  @Input() zone?: Zone;
  @Output() createPolygon = new EventEmitter<[number, number][]>();
  pointCount = 0;
  isDrawing = false;
  points: [number, number][] = [];
  mainPoints: [number, number][] = [];

  drawPolygon(event: MouseEvent): void {
    this.isDrawing = true;
    this.points = [...this.points, [ event.offsetX, event.offsetY ]];
    this.pointCount += 1;
    this.mainPoints = this.points;
    if (this.pointCount === 4) {
      this.createPolygon.emit(this.points);
      this.isDrawing = false;
    }
  }

  moveZoneLine(event: any) {
    if (this.isDrawing) {
      this.points = [...this.mainPoints, [ event.offsetX, event.offsetY ]]
    }
  }
}