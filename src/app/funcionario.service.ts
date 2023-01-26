import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private apiServeUrl = '';

  constructor(private http: HttpClient) { }

  public listaFuncionarios(): Observable<any> {
    return this.http.get<any>(`${this.apiServeUrl}/funcionarios`);
  }
}
