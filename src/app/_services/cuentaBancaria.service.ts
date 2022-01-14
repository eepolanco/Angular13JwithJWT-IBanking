import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuentaBancariaService {
  constructor(private http: HttpClient) { }

  getAccountbyId(idUser: number): Observable<any> {
    return this.http.get(environment.url + 'CuentaBancaria' + `/${idUser}`);
  }

  createNewAccount(idUser: number): Observable<any> {
    return this.http.post(environment.url + 'CuentaBancaria', idUser);
  }

  depositOrWithdraw(data: any): Observable<any> {
    return this.http.put(environment.url + 'CuentaBancaria', data);
  }
}
