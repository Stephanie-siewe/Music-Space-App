import { Injectable } from '@angular/core';
import { Filesystem,ReaddirOptions,Directory } from '@capacitor/filesystem';
@Injectable({
  providedIn: 'root'
})

export class PlaylistService {
  current = "%";
  musics !: Array<any>;
  constructor() { }

  setCurrent(obj:any){
    this.current = obj;
  }

  getCurrent(){
    return this.current;
  }

  setMusics(obj:any){
    this.musics = obj;
  }

  getMusics(){
     return this.musics;
  }

  
}
