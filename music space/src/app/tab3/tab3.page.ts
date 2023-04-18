import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Directory, Filesystem, ReaddirOptions } from '@capacitor/filesystem';
import { GetgenreService } from '../services/getgenre.service';
import { PlaylistService } from '../services/playlist.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public ListMusics !:Array<any>;
  public results !:Array<any>;
  public genres:any;
  genre:any;
  query:any;

  // icon ='heart-outline';
  
  public numb = false;// checks if a category has been chosen on home page
  constructor(private getgenres:GetgenreService,private router:Router, private playlist:PlaylistService) {}
  
  ionViewDidEnter(){
    this.getgenres.getgenre().subscribe((data)=>{
      this.genres = data;});
    const a = localStorage.getItem('genre');
    // console.log(a);
    
    if (a != undefined){
      this.numb=true;
      this.genre = JSON.parse(a!);
      this.choose(this.genre);
     
    }
   
    
  }

  ionViewWillLeave(){
    this.numb=false;
    localStorage.removeItem('genre');
  }


  listmusic(obj:any){
    // this.numb=false;
    // console.log('vdm');
    // console.log('obj',obj);
    this.numb= true;
    this.genre = obj;
    localStorage.setItem('genre',JSON.stringify(obj));
    this.choose(this.genre);
    
    }



  choose(obj:any){
    const options:ReaddirOptions  = {
      path:`music_space/${obj.name}`,
      directory:Directory.ExternalStorage
    };

    Filesystem.readdir(options).then((response=>{
      this.ListMusics = response.files;
      this.results = this.ListMusics;
    }))
  }

  play(obj:any){
    localStorage.setItem("music", JSON.stringify(obj));
    this.playlist.setMusics(this.ListMusics);
    this. router.navigate(['/player']);
  }

  handleChange(event:any){

    this.query = event.target.value.toLowerCase();
    this.results = this.ListMusics.filter(music => music.name.toLowerCase().indexOf(this.query)> -1);
    
    }

}
