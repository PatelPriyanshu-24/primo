import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScriptService {
  constructor(private http: HttpClient) { }

  fetchAndEvaluateScript(url: string): Observable<any> {
    return this.http.get(url, { responseType: 'text' });
  }
}

    // .pipe(
    //   map(script => this.evaluateScript(script)),
    //   catchError(error => {
    //     console.error('Error fetching script:', error);
    //     throw error;
    //   })
    // );
  

  // public evaluateScript(script: string): any {
  //   console.log('Script content:', script); 
  //   let PrimoPreviewHandler: any;
  //   try {
  //     eval(script); // Evaluates the script, populating PrimoPreviewHandler
  //     if (typeof PrimoPreviewHandler === 'undefined') {
  //       throw new Error('PrimoPreviewHandler is undefined after script evaluation.');
  //     }
  //   } catch (e) {
  //     console.error('Error evaluating script:', e);
  //     return null;
  //   }
  //   return PrimoPreviewHandler;
  // }
  


