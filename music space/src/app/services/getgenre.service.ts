import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetgenreService {
  music: any;
  constructor(private httpClient:HttpClient) { }

  getgenre(){
    return this.httpClient.get('/assets/genre.json');
  }
}
