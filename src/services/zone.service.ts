import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import Zone from '../models/zone.model';

@Injectable({
  providedIn: 'root',
})
export class ZoneService {
  private apiUrl = `${environment.apiUrl}/api/zones`;

  constructor(private httpClient: HttpClient, ) { }

  getZones(): Observable<Zone[]> {
    return this.httpClient.get<Zone[]>(this.apiUrl);
  }

  createZone(zone: Zone): Observable<Zone> {
    return this.httpClient.put<Zone>(this.apiUrl, zone);
  }

  editZone(zone: Zone): Observable<Zone> {
    return this.httpClient.put<Zone>(`${this.apiUrl}/${zone.id}`,  zone, {
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }

  deleteAllZones(): Observable<any> {
    return this.httpClient.delete(this.apiUrl);
  }

  deleteZone(zoneId: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${zoneId}`);
  }
}