import { DOCUMENT, getLocaleFirstDayOfWeek } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  renderer!:Renderer2;
  constructor(private renderFactory:RendererFactory2, @Inject(DOCUMENT) private document:Document) { 
    this.renderer = this.renderFactory.createRenderer(null, null);

  }

  changeTheme(event:any){
    console.log(event);
    if(event.detail.checked){
      document.body.setAttribute('color-theme','dark');
    }else{
      document.body.setAttribute('color-theme','light')
    }
  }
}
