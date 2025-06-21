import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  private _http = inject(HttpClient);

  constructor() { }

  getContent(): string {
    return 'My content';
  }

  getHttpContent(): Observable<string> {
    return this._http.get<string>('https://httpbin.org/get')
      .pipe(
        map(response => JSON.stringify(response, null, 2))
      );
  }
}
