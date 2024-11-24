import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  url = `http://localhost:3000/contacts`

  getData(): Observable<any[]> {

    return this.http.get<any[]>(this.url)

  }

  dataSpecific:any
  getSpecific(id:string): Observable<any> {

    const specific = `${this.url}/${id}`
    this.dataSpecific = this.http.get(specific)
    return this.http.get(specific)

  }

  getSearch(): Observable<any> {

    return this.dataSpecific

  }

  postData(contactData:any):Observable<any[]> {

    return this.http.post<any[]>(this.url, contactData)

  }

  putData(id:string,body:any) {

    const data  = `${this.url}/${id}`
   return this.http.put(data,body)

  }

}
