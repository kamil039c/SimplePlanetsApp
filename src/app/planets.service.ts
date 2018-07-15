import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { Planet } from './planet';

// import '@angular/rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  private allPlanets: Array<Planet> = [];
  private planetsListlink = 'https://swapi.co/api/planets/';
  private planetsListAltlink = '/assets/planets.json';
  private planetsLoadState = new Subject<Number>();
  private requestsPerIteration = 7;
  private pageStartFrom = 1;
  private planetsLoadProgressSub = new Subject<Number>();
  private planetsLoadProgress = 0;
  private planetsLoadRequestsSuccess = 0;

  constructor(private http: HttpClient) {
    this.planetsLoadProgressSub.asObservable().subscribe((progress: number) => {
      if (this.planetsLoadProgress > this.planetsLoadRequestsSuccess) {
        this.planetsLoadProgressSub.unsubscribe();
        this.planetsLoadState.next(1);

        if (this.allPlanets.length === 0) {
          this.loadAltPlanets();
        }
      } else {
        this.pageStartFrom += this.requestsPerIteration;
        this.loadPlanets();
      }
    });

    this.loadPlanets();
    // this.loadAltPlanets();
  }

  public transformJsonObject2Planet(data: Object): void {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const row = data[key];
        this.allPlanets.push(new Planet(
          row['name'], row['rotation_period'], row['orbital_period'], row['diameter'], row['climate'],
          row['gravity'], row['terrain'], row['surface_water'], row['population'])
        );
      }
    }
  }

  public loadAltPlanets(): void {
    this.http.get<Object>(this.planetsListAltlink).subscribe((data: Object) => {
      this.transformJsonObject2Planet(data);
      this.planetsLoadState.next(2);
    }, error => {
      console.log('blad przy odczycie planet z lokalnego serwera: ' + error);
    });
  }

  public loadPlanets() {
    for (let i = this.pageStartFrom; i < this.pageStartFrom + this.requestsPerIteration; i++) {
      const url = this.planetsListlink + '?page=' + i;

      this.http.get<Object>(url).subscribe((data: Object) => {
        if (data.hasOwnProperty('results') && data['results'].length > 0) {
          this.transformJsonObject2Planet(data['results']);
        }

        this.planetsLoadProgress++;
        if (data['next']) {
          this.planetsLoadRequestsSuccess++;
        }

        if (this.planetsLoadProgress % this.requestsPerIteration === 0) {
          this.planetsLoadProgressSub.next(1);
        }
      }, error => {
        this.planetsLoadProgress++;
        if (this.planetsLoadProgress % this.requestsPerIteration === 0) {
          this.planetsLoadProgressSub.next(1);
        }

        console.log('blad przy odczycie planet z zewnętrznego serwisu: ' + error);
      });
    }

    // Odczytwywanie planet w rządaniach, ktre następują jedno po drugim - znacznie wolniejsze do (8x) niż powyższy sposob

    /*this.http.get<Object>(this.planetsListlink).subscribe((data: Object) => {
      this.planetsListlink = data['next'];

      if (data.hasOwnProperty('results') && data['results'].length > 0) {
        this.transformJsonObject2Planet(data['results']);
      }

      if (this.planetsListlink) {
        this.loadPlanets();
      } else {
        this.planetsLoadState.next(1);
      }
    });*/
  }

  public getPlanetsLoadState(): Observable<Number> {
    return this.planetsLoadState.asObservable();
  }

  public getAllPlanets(): Array<Planet> {
    return this.allPlanets;
  }
}
