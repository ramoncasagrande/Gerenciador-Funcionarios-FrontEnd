import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Funcionario } from './funcionario';
import { FuncionarioService } from './funcionario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public funcionarios: Funcionario[] = [];
  public funcionarioEditado: Funcionario | any;
  public funcionarioId: number = 0;

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

  public adicionaFuncionario(adicionaForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.funcionarioService.adicionaFuncionarios(adicionaForm.value).subscribe(
      (response: Funcionario) => {
        console.log(response);
        this.buscaFuncionarios();
        adicionaForm.reset;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
        adicionaForm.reset;
      }
    );
  }

  public editaFuncionario(funcionario: Funcionario): void {
    this.funcionarioService.atualizaFuncionarios(funcionario).subscribe(
      (response: Funcionario) => {
        console.log(response);
        this.buscaFuncionarios();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public excluiFuncionario(funcionarioId: number): void {
    this.funcionarioService.excluiFuncionarios(funcionarioId).subscribe(
      (response: void) => {
        console.log(response);
        this.buscaFuncionarios();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
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
    
    if (mode === 'editar'){
      this.funcionarioEditado = funcionario;
      button.setAttribute('data-target', '#editarModal');
    }
    if (mode === 'excluir'){
      this.funcionarioId = funcionario.id;
      button.setAttribute('data-target', '#excluirModal');
    }
    container?.appendChild(button);
    button.click();
  }
  
}
