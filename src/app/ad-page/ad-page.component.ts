import { Component, OnInit } from '@angular/core';
declare var PrimoPreviewHandler: any;
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ad-page',
  templateUrl: './ad-page.component.html',
  styleUrls: ['./ad-page.component.css'],
})
export class AdPageComponent implements OnInit {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  params: any = '';
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      const defaultId = params.creativeID;
      this.params = params.creativeID;
      this.loadScript(function () {
        // const creativeID = this.params;

        const elements = {
          box1: document.getElementById('box1'),
          box2: document.getElementById('box2'),
          f1b: document.getElementById('f1b'),
          f2a: document.getElementById('f2a'),
          f2b: document.getElementById('f2b'),
          f3a: document.getElementById('f3a'),
          box4: document.getElementById('box4'),
          b1: document.getElementById('b1'),
          b2: document.getElementById('b2'),
        };

        const params = {
          creativeID: defaultId,
          cbEvents: (event: Event) => {
            console.log('Ad Event:', event);
          },
        };

        if (typeof PrimoPreviewHandler !== 'undefined') {
          PrimoPreviewHandler.getHandler(params)
            .then((handler: any) => {
              const { width, height } = handler.info;
              console.log(height, width);
              console.log('Handler object:', handler);

              const conditions = [
                {
                  box: elements.box1,
                  heightRange: [100, 160],
                  widthRange: [900, 970],
                },
                {
                  box: elements.box2,
                  heightRange: [161, 250],
                  widthRange: [800, 970],
                },
                {
                  box: elements.f1b,
                  heightRange: [201, 250],
                  widthRange: [200, 300],
                },
                {
                  box: elements.f2a,
                  heightRange: [150, 200],
                  widthRange: [200, 302],
                },
                {
                  box: elements.f2b,
                  heightRange: [200, 280],
                  widthRange: [303, 336],
                },
                {
                  box: elements.f3a,
                  heightRange: [400, 600],
                  widthRange: [100, 320],
                },
                {
                  box: elements.box4,
                  heightRange: [100, 160],
                  widthRange: [800, 970],
                },
                {
                  box: elements.b1,
                  heightRange: [10, 90],
                  widthRange: [235, 728],
                },
                {
                  box: elements.b2,
                  heightRange: [10, 90],
                  widthRange: [100, 234],
                },
              ];

              const selectedCondition = conditions.find(
                ({ heightRange, widthRange }) =>
                  height >= heightRange[0] &&
                  height <= heightRange[1] &&
                  width >= widthRange[0] &&
                  width <= widthRange[1]
              );

              if (selectedCondition) {
                return handler.setupPlayer(selectedCondition.box, 'PHONE', {});
              } else {
                throw new Error('No matching condition for height and width');
              }
            })
            .then((player: any) => {
              console.log('Ad player setup complete');
            })
            .catch((error: any) => {
              console.error('Error setting up ad player:', error);
            });
        } else {
          console.error(
            'PrimoPreviewHandler is not defined. Please ensure the handler.js script is loaded.'
          );
        }
      });
    });
  }

  loadScript(callback: any) {
    let script: any = document.createElement('script');
    script.setAttribute(
      'src',
      'https://ps.visarity.com/demos/preview/handler.js'
    );
    script.onreadystatechange = callback;
    script.onload = callback;
    document.head.append(script);
  }
}
