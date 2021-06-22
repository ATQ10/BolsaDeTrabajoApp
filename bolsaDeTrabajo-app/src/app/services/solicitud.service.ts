import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/api/solicitudes';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  
  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(id:any): Observable<any> {
    return this.http.get(`${baseUrl}/?idAspirante=${id}`);
  }

  getEmpresa(id:any): Observable<any> {
    return this.http.get(`${baseUrl}/e/?idEmpresa=${id}`);
  }

  getId(id:any): Observable<any> {
    return this.http.get(`${baseUrl}/?id=${id}`);
  }

  create(data:any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  login(data:any): Observable<any> {
    return this.http.post(`${baseUrl}/login`, data);
  }

  update(id:any, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
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