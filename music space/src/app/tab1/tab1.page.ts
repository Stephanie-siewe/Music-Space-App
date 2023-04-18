import { Component, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { Directory, Filesystem, ReaddirOptions } from '@capacitor/filesystem';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { GetgenreService } from '../services/getgenre.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public genres:any;
  ListMusics !:Array<any>;
  constructor(private theme:ThemeService, private getgenres:GetgenreService, private router:Router,  private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet
  )   {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet!.canGoBack()) {
        App.exitApp();
      }
    });
    }

  ngOnInit(){
    

  }

  ionViewDidEnter(){
    
    this.getgenres.getgenre().subscribe((data)=>{
    this.genres = data;
    });

   
    

  }

  changeTheme(event:any){
    this.theme.changeTheme(event);
  }

  listmusic(obj:any){
  localStorage.setItem('genre',JSON.stringify(obj));
  this.router.navigate(['/tabs/tab3']);

  }

  play(obj:any){
    localStorage.setItem("music",JSON.stringify(obj));
    this.router.navigate(['/player']);

  }




}
