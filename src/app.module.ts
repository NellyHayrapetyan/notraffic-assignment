import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { ZonesComponent } from './components/zones/zones.component';
import { PointsToStringPipe } from './pipes/pointToString.pipe';
import { ZonePopupComponent } from './components/new-zone-popup/zone-popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewZoneComponent } from './components/new-zone/new-zone.component';

@NgModule({
  declarations: [
    AppComponent,
    ZonesComponent,
    PointsToStringPipe,
    ZonePopupComponent,
    NewZoneComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
