import { Routes } from '@angular/router';
import { CadastroComponent } from '../../pages/cadastro/cadastro.component';
import { ListagemComponent } from '../../pages/listagem/listagem.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'cadastro',   component: CadastroComponent },
    { path: 'atualizar/:codigo',   component: CadastroComponent },
    { path: 'lista',         component: ListagemComponent }
];
