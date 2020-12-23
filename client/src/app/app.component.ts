import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { BehaviorSubject, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

type _AppData = {
  organization: {
    name: string
    employees: {
      name: {
        first: string
        last: string
      },
      date: {
        joining: {
          month: number
          year: number
          date: number
        }
      },
      title: string
    }[]
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private _data$: BehaviorSubject<{ [key: string]: _AppData | null } | null> = new BehaviorSubject<{ [key: string]: _AppData | null } | null>(null)
  title = 'client';

  data: { [key: string]: _AppData } | null = null

  constructor(
    private _http: HttpClient
  ) { }

  ngOnInit() { }

  fetchData(): void {
    this._http.get<{ [key: string]: _AppData | null } | null>('http://localhost:8080/fetch').pipe(
      tap(__ => {
        console.groupCollapsed('Data Receiving')
        console.log(__)
        console.groupEnd()
      }),
      catchError(__ => {
        console.groupCollapsed('[App Component] Data Fetch Failed')
        console.log(__)
        console.groupEnd()
        return throwError(this._data$.getValue())
      })
    ).subscribe(
      __ => { this._data$.next(__) },
      __ => { this._data$.next({ "error": null }) }
    )
  }

}
