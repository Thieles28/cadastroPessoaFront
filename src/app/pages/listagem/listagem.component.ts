import {Component, OnInit} from '@angular/core';
import {PessoaService} from '../../services/pessoa.service';
import {Pessoa} from '../../model/pessoa';
import { ToastrService } from 'ngx-toastr';
import { Erro } from 'src/app/model/Erro';

@Component({
  selector: 'app-tables',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent implements OnInit {

  pessoa: Pessoa[];
  codigo: number;
  pagina: number = 0;
  tamanho: number = 5;
  totalDePagina: number;
  totalDeElementos: number;
  paginaAtual: number;

  constructor(
    private pessoaService: PessoaService, private mensagem: ToastrService) {
  }

  ngOnInit() {
    this.listagemPessoa(this.pagina);
  }

  listagemPessoa(pagina: number) {
    this.pessoaService.listarPessoa(this.pagina, this.tamanho).subscribe((res: any) => {
      this.pessoa = res.content;
      this.pagina = res.number;
      this.totalDePagina = res.totalPages;
      this.totalDeElementos = res.totalElements;
      this.paginaAtual = res.number
    },(erro: any) => {
      erro.error.map((res: Erro) => {
        this.mensagem.error(res.mensagemUsuario);
      });
    });
  }

  avancar(){
    if(this.pagina < this.totalDePagina-1){
      this.listagemPessoa(++this.pagina);
    }
  }

  voltar(){
    if(this.pagina > 0){
      this.listagemPessoa(--this.pagina);
    }
  }

  removerPessoa(codigo: number) {
    this.pessoaService.removerPessoa(codigo).subscribe((res: Pessoa) => {
        this.mensagem.success('Pessoa removida com sucesso!')
        this.listagemPessoa(this.pagina);
    },(erro: any) => {
      erro.error.map((res: Erro) => {
        this.mensagem.error(res.mensagemUsuario);
      });
    });
  }
}
