import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable'

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private http: HttpClient) { }

  getPrevalencia(){
    const url_api = 'http://localhost:3000/prevalencia/chart';
    return this.http.get(url_api);
  }

  getUci(){
    const url_api = 'http://localhost:3000/prevalencia/chart';
    return this.http.get(url_api);
  }

  getHospitalizados(){
    const url_api = 'http://localhost:3000/hospitalizado/chart';
    return this.http.get(url_api);
  }

  getPcrs(Fecha){
    const url_api = 'http://localhost:3000/pcr/chart/'+Fecha;
    return this.http.get(url_api);
  }

  getLastDate(){
    const url_api = 'http://localhost:3000/pcr/date';
    return this.http.get(url_api);
  }

}
