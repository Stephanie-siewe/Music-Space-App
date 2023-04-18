import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {Filesystem,Directory, Encoding, ReaddirOptions} from '@capacitor/filesystem';
import { PlaylistService } from '../services/playlist.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  icon ='heart-outline';
  query:any;
   public ListMusics !:Array<any>;
   public results !:Array<any>;
  constructor(private router:Router, private playlist:PlaylistService) {
  }
  


  ionViewDidEnter(){
    const options:ReaddirOptions  = {
      path:"music_space/all",
      directory:Directory.ExternalStorage
    }

    Filesystem.readdir(options).then((response=>{
      this.ListMusics = response.files; 
      this.playlist.setMusics(this.ListMusics);
      this.results = this.ListMusics;
    }))
  }

handleChange(event:any){

this.query = event.target.value.toLowerCase();
this.results = this.ListMusics.filter(music => music.name.toLowerCase().indexOf(this.query)> -1);

}

  play(obj:any){
    localStorage.setItem("music", JSON.stringify(obj));
    this. router.navigate(['/player'])
  }

  
  
}
  
