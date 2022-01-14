import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaBancariaService {
  constructor(private http: HttpClient) { }

  getTransferbyId(numeroCuentaOrigen: number): Observable<any> {
    return this.http.get(environment.url + 'TransaccionesBancarias' + `/${numeroCuentaOrigen}`);
  }

  addTransaccion(data: any): Observable<any> {
    return this.http.post(environment.url + 'TransaccionesBancarias', data);
  }
}
