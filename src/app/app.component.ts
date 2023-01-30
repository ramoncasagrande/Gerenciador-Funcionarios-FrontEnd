import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Funcionario } from './funcionario';
import { FuncionarioService } from './funcionario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public funcionarios: Funcionario[] = [];

  constructor(private funcionarioService: FuncionarioService){}

  ngOnInit() {
      this.buscaFuncionarios();
  }

  public buscaFuncionarios(): void {
    this.funcionarioService.listaFuncionarios().subscribe(
      (response: Funcionario[]) => {
        this.funcionarios = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public chamaAdicionarModal(): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#adicionarModal');
    container?.appendChild(button);
    button.click();
  }

  public chamaModal(funcionario: Funcionario, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'adicionar'){
      button.setAttribute('data-target', '#adicionarModal');
    }
    if (mode === 'editar'){
      button.setAttribute('data-target', '#editarModal');
    }
    if (mode === 'excluir'){
      button.setAttribute('data-target', '#excluirModal');
    }
    container?.appendChild(button);
    button.click();
  }
  
}
