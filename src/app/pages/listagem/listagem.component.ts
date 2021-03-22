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

  constructor(
    private pessoaService: PessoaService, private mensagem: ToastrService) {
  }

  ngOnInit() {
    this.listagemPessoa();
  }

  listagemPessoa() {
    this.pessoaService.listarPessoa().subscribe((res: Pessoa[]) => {
      this.pessoa = res;
    },(erro: any) => {
      erro.error.map((res: Erro) => {
        this.mensagem.error(res.mensagemUsuario);
      });
    });
  }

  removerPessoa(codigo: number) {
    this.pessoaService.removerPessoa(codigo).subscribe((res: Pessoa) => {
        this.mensagem.success('Pessoa removida com sucesso!')
        this.listagemPessoa();
    },(erro: any) => {
      erro.error.map((res: Erro) => {
        this.mensagem.error(res.mensagemUsuario);
      });
    });
  }
}
