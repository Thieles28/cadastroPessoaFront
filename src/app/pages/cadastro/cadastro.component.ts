import { Erro } from './../../model/Erro';
import { PessoaService } from './../../services/pessoa.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pessoa } from 'src/app/model/pessoa';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  formPessoa: FormGroup;
  nacionalidade: Nacionalidade[];
  naturalidade: Naturalidade[];
  codigo: number;
  modoExibicao: boolean;

  constructor(private pessoaService: PessoaService,
              private fb: FormBuilder,
              private mensagem: ToastrService,
              private route: ActivatedRoute,
              private router: Router
              ) { }

  ngOnInit() {
    this.codigo = this.route.snapshot.params['codigo'];
    this.modoExibicao = !this.codigo;
    this.listarPais();
    this.listarEstados();
    this.pessoaForm();
    if(!this.modoExibicao) {
      this.buscaPorPessoa();
    }

  }

  habilitar(event: any) {
    if(event == 33) {
     this.formPessoa.get('naturalidade').enable();
    } else {
      this.formPessoa.get('naturalidade').disable();
      this.formPessoa.get('naturalidade').reset();
    }
  }

  pessoaForm() {
    this.formPessoa = this.fb.group({
        nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        email: ['', [Validators.email]],
        sexo: [''],
        dataNascimento: [ '', [Validators.required]],
        nacionalidade: this.fb.group({
          codigo: [ '', Validators.required]
        }),
        naturalidade: this.fb.group({
          codigo: [ {value: '', disabled: true}, Validators.required]
        }),
        cpf: ['', Validators.required],
    });
  }

  get obter() {
    return this.formPessoa.controls;
  }

  listarPais() {
    this.pessoaService.listarPais().subscribe((res: Nacionalidade[]) => {
      this.nacionalidade = res;
    },(erro: any) => {
      erro.error.map((res: Erro) => {
        this.mensagem.error(res.mensagemUsuario);
      });
    });
  }

  listarEstados() {
    this.pessoaService.listarEstados().subscribe((res: Naturalidade[]) => {
      this.naturalidade = res;
    },(erro: any) => {
      erro.error.map((res: Erro) => {
        this.mensagem.error(res.mensagemUsuario);
      });
    });
  }


  buscaPorPessoa() {
    this.pessoaService.buscarPorPessoa(this.codigo).subscribe((res: Pessoa) => {
      this.formPessoa.patchValue(res);
    });
  }

  atualizarPessoa() {
    this.pessoaService.atualizarPessoa(this.codigo, this.formPessoa.value).subscribe((res: Pessoa) => {
        this.mensagem.success('Pessoa atualizada com sucesso!')
        this.router.navigate(['/lista'], { relativeTo: this.route });
    }, (erro: any) => {
      erro.error.map((res: Erro) => {
        this.mensagem.error(res.mensagemUsuario);
      });
    });
  }

  registraPessoa() {
    this.pessoaService.cadastrarPessoa(this.formPessoa.value)
      .subscribe((res: Pessoa) => {
        if (res != null) {
          this.mensagem.success('Pessoa cadastrada com sucesso!');
          this.formPessoa.reset();
        }
      }, (erro: any) => {
        erro.error.map((res: Erro) => {
          this.mensagem.error(res.mensagemUsuario);
        });
      });
  }

  onSubmit() {
    if (this.formPessoa.value && !this.formPessoa.invalid) {
      if (this.modoExibicao) {
        this.registraPessoa();
      } else {
        this.atualizarPessoa();
      }
    }
  }
}
