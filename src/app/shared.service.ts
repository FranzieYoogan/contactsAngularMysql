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

  postData(contactData:any):Observable<any[]> {

    return this.http.post<any[]>(this.url, contactData)

  }

}
