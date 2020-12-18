import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { BehaviorSubject, of } from 'rxjs'
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

  private _data$: BehaviorSubject<_AppData[]> = new BehaviorSubject<_AppData[]>([])
  title = 'client';

  data: _AppData[] = []

  constructor(
    private _http: HttpClient
  ) { }

  ngOnInit() { }

  fetchData(): void {
    this._http.get<_AppData[]>('http://localhost:8080/fetchData').pipe(
      tap(__ => {
        console.groupCollapsed('Data Receiving')
        console.log(__)
        this._data$.next(__)
        console.groupEnd()
      }),
      catchError(__ => {
        console.groupCollapsed('[App Component] Data Fetch Failed')
        console.log(__)
        console.groupEnd()
        return of(this._data$.getValue())
      })
    ).subscribe()
  }

}
