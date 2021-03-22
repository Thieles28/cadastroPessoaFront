import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { CadastroComponent } from '../../pages/cadastro/cadastro.component';
import { ListagemComponent } from '../../pages/listagem/listagem.component';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateParserFormatter, NgbDateCustomParserFormatter } from 'src/app/model/datepicker-popup';
import { IConfig, NgxMaskModule } from 'ngx-mask';


export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    CadastroComponent,
    ListagemComponent
  ],
  providers: [
    {provide: NgbDateAdapter, useClass: NgbDateCustomParserFormatter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
   ]
})

export class AdminLayoutModule {}
