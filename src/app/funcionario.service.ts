import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Funcionario } from './funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private apiServeUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public listaFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.apiServeUrl}/funcionarios`);
  }

  public adicionaFuncionarios(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(`${this.apiServeUrl}/funcionarios`, funcionario);
  }

  public atualizaFuncionarios(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.apiServeUrl}/funcionarios`, funcionario);
  }

  public excluiFuncionarios(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServeUrl}/funcionarios/${id}`);
  }




}
