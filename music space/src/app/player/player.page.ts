import { Component, OnInit } from '@angular/core';
import { Platform, RangeCustomEvent } from '@ionic/angular';
import {NativeAudio} from '@capgo/native-audio'
import { Directory, Filesystem } from '@capacitor/filesystem';
import { PlaylistService } from '../services/playlist.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
  styleUrls: ['./player.page.scss'],
})
export class PlayerPage implements OnInit {
  

  audioDuration !: number;
  currentPosition !: number;
  max !:string
  min!:string
  volum!: number;
  restTime !: string;
  playIcon = 'pause';
  likeIcon = 'heart-outline';
  public music:any;
  public Listmusics !: Array<any>;

  constructor(public platform:Platform, private playlist:PlaylistService, private router:Router) { 
   
 
  setInterval(()=>{
    this.getCurrentTime();
    
  },1000);
  // setTimeout(()=>{
  //    this.getDuration();
  // },100);

   }

  ngOnInit() {
    const a=localStorage.getItem("music");
    const b = this.playlist.getCurrent();
    // let current = JSON.parse(b!);
    // alert(a);
    this.music = JSON.parse(a!);
    if(this.music.name != b && b !="%" ){
      NativeAudio.unload({
        assetId: b,
      });
    }
    console.log('music courante',this.music);
    NativeAudio.preload({
      assetId: this.music.name,
      assetPath: this.music.uri,
      audioChannelNum: 1,
      isUrl: true
  }).then(()=>{
    NativeAudio.play({
      assetId:this.music.name,
      time:0
    })
  });
    
  }

  ionViewDidEnter(){
   
  
   this.getDuration();
  //  this.readAudio(0);
  // this.currentPosition = 0.0;
  // this.platform.ready().then(() => {this.readAudio(0);})
  }

  ionViewDidLeave(){
    this.playlist.setCurrent(this.music.name);
  }

  

  readAudio(ti:number){
   
    NativeAudio.play({
      assetId: this.music.name,
      time: ti
    });
  }

  pauseAudio(){
     NativeAudio.pause({
      assetId: this.music.name,
    });
  }


   async playPause(){
    
    if(this.playIcon == 'pause') {
      this.playIcon = 'play';
      // this.file.pause();
      this.pauseAudio()

    } else {
      this.playIcon = 'pause';
      // this.file.play();
      this.getCurrentTime();
      // console.log("currentPosition", this.currentPosition);
      this.readAudio(this.currentPosition);
    }

  }

  convertSec(secondes: number) {
    let time: string;
    const min = Math.floor((secondes/60/60)*60);
    const sec = Math.floor(((secondes/60/60)*60 - min)*60);
    console.log(secondes);
    
    //  this.restTime = min + 'm ' + sec + 's';
    return time = min +":"+ sec;
  }

  // changePosition() {
  //   console.log('changePosition: ' + this.currentPosition);
  //   this.file.seekTo(this.currentPosition*1000);
  //   this.convertSec(this.audioDuration - this.currentPosition);
  // }
   
  getCurrentTime(){
    NativeAudio.getCurrentTime({
      assetId: this.music.name
    })
    .then(result => {
      console.log("result currentTime",result.currentTime);
      this.currentPosition = result.currentTime;
      this.min  = this.convertSec(this.currentPosition);
    });

    
  }

  getDuration(){
    NativeAudio.getDuration({
      assetId: this.music.name
    })
    .then(result => {
      console.log("result duration",result.duration);
      // console.log("typeof result duration", typeof(result.duration));
      
      this.audioDuration = result.duration;
      this.max = this.convertSec(this.audioDuration);
      // console.log(this.audioDuration);
      
    });
    
  }

doloop(){
  this.readAudio(0.0);
  
}

nextmusic(obj:any){
this.Listmusics = this.playlist.getMusics();
let index = this.Listmusics.findIndex(item => obj.name === item.name);
// alert(index);
let pos:any;
if ( index == this.Listmusics.length-1){
  pos = 0;
}else{
  pos = index+1;
}

NativeAudio.unload({
  assetId: this.music.name,
}).then(() =>{
  this.music = this.Listmusics[pos];
  NativeAudio.preload({
    assetId: this.music.name,
    assetPath: this.music.uri,
    audioChannelNum: 1,
    isUrl: true
}).then(()=>{
  NativeAudio.play({
    assetId:this.music.name,
    time:0
  })
});
})
this.playIcon = 'pause';

 

}

previousmusic(obj:any){
  this.Listmusics = this.playlist.getMusics();
  let index = this.Listmusics.findIndex(item => obj.name === item.name);
  // alert(index);
  let pos:any;
  if ( index == 0 ){
    pos = this.Listmusics.length -1;
  }else{
    pos = index-1;
  }
  
  NativeAudio.unload({
    assetId: this.music.name,
  }).then(() =>{
    this.music = this.Listmusics[pos];
    NativeAudio.preload({
      assetId: this.music.name,
      assetPath: this.music.uri,
      audioChannelNum: 1,
      isUrl: true
  }).then(()=>{
    NativeAudio.play({
      assetId:this.music.name,
      time:0
    })
  });
  })
  this.playIcon = 'pause';
  
  }

changevolume(event:any){
  this.volum = Number(event.target.value);
  // alert(this.volum);
  
 NativeAudio.setVolume({
  assetId: this.music.name,
  volume: this.volum*0.1,
});
}

// addfavoris( ){
//   try {
//      let file_uri = '';
//     Filesystem.getUri({
//       directory: Directory.ExternalStorage,
//       path: `music_space/favoris`
//     }).then(response => file_uri = response.uri );

//     alert(this.music.uri);
//     let a = localStorage.getItem('genre')
//     const genre = JSON.parse(a!);
//     let ret = Filesystem.copy({
//       from: this.music.uri,
//       to: file_uri,
//       directory: Directory.ExternalStorage
//     });
//   } catch(e) {
//     console.error('Unable to copy file', e);
//     alert(`error ${e}`);
// }
// this.likeIcon = 'heart';
// let like = document.getElementById('like');
// like!.style.color = "red";

// }


}
