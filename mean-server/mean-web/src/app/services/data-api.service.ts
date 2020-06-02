import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable'

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private http: HttpClient) { }

  getPrevalencia(){
    const url_api = 'prevalencia/chart';
    return this.http.get(url_api);
  }

  getPcrs(Fecha){
    const url_api = 'pcr/chart/'+Fecha;
    return this.http.get(url_api);
  }

  getLastDate(){
    const url_api = 'pcr/date';
    return this.http.get(url_api);
  }

}
