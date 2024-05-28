
import { Component, OnInit } from '@angular/core';
declare var PrimoPreviewHandler: any;
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ad-page',
  templateUrl: './ad-page.component.html',
  styleUrls: ['./ad-page.component.css']
})
export class AdPageComponent implements OnInit {
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    
   }

  ngOnInit(): void {
 
    this.route.queryParams.subscribe((params: any) => {
      const defaultId = params.creativeID;
    
  });




    this.loadScript('https://ps.visarity.com/demos/preview/handler.js').then(() => {
      const creativeID = this.route.snapshot.queryParamMap.get('creativeID');
      const box1 = document.getElementById('box1');
      const box2 = document.getElementById('box2');
      const f1b =  document.getElementById('f1b');
      const f2b =  document.getElementById('f2b');
      const f2a =  document.getElementById('f2a');
      const f3a =  document.getElementById('f3a');
      const box4 =  document.getElementById('box4');
      const b1 =  document.getElementById('b1');
      const b2 =  document.getElementById('b2');


      const params = {
        creativeID: creativeID,
        cbEvents: (event: Event) => { console.log('Ad Event:', event); } 
      };

      if (typeof PrimoPreviewHandler !== 'undefined') {
        PrimoPreviewHandler.getHandler(params)
          .then((handler: any) => {
            const width = handler.info.width;
            const height = handler.info.height;
            console.log(height,width)
            console.log('Handler object:', handler);

            if(height <= 160 && height>= 100 && width <= 970 && width>=900){
              return handler.setupPlayer(box1, "PHONE", {});
            }
            else if(height<=250 && height>=161 && width <= 970 && width>=800) {
              return handler.setupPlayer(box2, "PHONE", {});
            }
            else if(height<=250 && height>=201 && width <= 300 && width>=200){
              return handler.setupPlayer(f1b, "PHONE", {});
            }
            else if(height<=200 && height>=150 && width <= 302 && width>=200){
              return handler.setupPlayer(f2a, "PHONE", {});
            }
            else if(height<=280 && height>=200 && width <= 336 && width>=303){
              return handler.setupPlayer(f2b, "PHONE", {});
            }
            else if((height<=600 && height>=400) && (width <= 320 && width>=100)){
              return handler.setupPlayer(f3a, "PHONE", {});
            }
            else if(height<=160 && height>=100 && width <= 970 && width>=800){
              return handler.setupPlayer(box4, "PHONE", {});
            }
            else if(height<=90 && height>=10 && width <= 728&& width>=235){
              return handler.setupPlayer(b1, "PHONE", {});
            }
            else if(height<=90 && height>=10 && width <= 234 && width>=100){
              return handler.setupPlayer(b2, "PHONE", {});
            }
            
           
          })
          .then((player: any) => {
            console.log("Ad player setup complete");
          })
          .catch((error: any) => {
            console.error("Error setting up ad player:", error);
          });
      } else {
        console.error("PrimoPreviewHandler is not defined. Please ensure the handler.js script is loaded.");
      }
    });
  }

  

  private loadScript(url: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = url;
      scriptElement.onload = () => resolve(); 
      scriptElement.onerror = reject;
      document.body.appendChild(scriptElement);
    });
  }

  
}

