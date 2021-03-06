import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/api/aspirantes';
@Injectable({
  providedIn: 'root'
})
export class AspiranteService {

  constructor(private http: HttpClient) { }

  getAll(buscar:any): Observable<any> {
    return this.http.get(`${baseUrl}?buscar=${buscar}`);
  }

  get(id:any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data:any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  cv(id:any, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/cv/${id}`, data);
  }

  login(data:any): Observable<any> {
    return this.http.post(`${baseUrl}/login`, data);
  }

  update(id:any, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  enviar(id:any, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/enviar/${id}`, data);
  }

  delete(id:any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title:any): Observable<any> {
    return this.http.get(`${baseUrl}?title=${title}`);
  }
}
