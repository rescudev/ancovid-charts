import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private http: HttpClient) { }

  getPrevalencia(){
    const url_api = 'prevalencia/chart';
    return this.http.get(url_api);
  }

  getUci(){
    const url_api = 'prevalencia/chart';
    return this.http.get(url_api);
  }

  getHospitalizados(){
    const url_api = 'hospitalizado/chart';
    return this.http.get(url_api);
  }

  getProvincias(){
    const url_api = 'territorio/chart';
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
