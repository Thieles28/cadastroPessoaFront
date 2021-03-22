import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Pessoa} from '../model/pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  listarPessoa(pagina: number, tamanho: number): Observable<Pessoa[]> {
    let params = new HttpParams();
    params = params.set('page', pagina.toString()).delete('page', '');
    params = params.set('size', tamanho.toString()).delete('size', '');
    return this.http.get<Pessoa[]>(`${this.baseUrl}`, {params: params});
  }

  listarPais(): Observable<Nacionalidade[]> {
    return this.http.get<Nacionalidade[]>(`${this.baseUrl}/pais`);
  }

  listarEstados(): Observable<Naturalidade[]> {
    return this.http.get<Naturalidade[]>(`${this.baseUrl}/estados`);
  }
  buscarPorPessoa(codigo: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.baseUrl}/${codigo}`);
  }

  cadastrarPessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(`${this.baseUrl}/cadastrar`, pessoa);
  }

  atualizarPessoa(codigo: number, pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(`${this.baseUrl}/${codigo}`, pessoa);
  }

  removerPessoa(codigo: number): Observable<Pessoa> {
    return this.http.delete<Pessoa>(`${this.baseUrl}/${codigo}`);
  }

}
