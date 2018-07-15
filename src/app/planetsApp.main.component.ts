import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Planet } from './planet';
import { PlanetsService } from './planets.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-planets-root',
  templateUrl: './planetsApp.main.component.html'
})
export class PlanetsAppMainComponent implements OnInit {
  filterPlanets: Array<Planet> = [];
  displayPlanets: Array<Planet> = [];
  infoPlanet: Planet;
  pageLoadState = 0;

  searchPlanetsFilter = '';
  planetsStartFrom = 0;
  planetsPerPage = 10;
  planetsActualPage = 0;
  planetsPages: Array<Number> = [];
  planetsPerPageOptions = [5, 10, 25, 50, 100];

  private refreshPlanetsList(filterChanged: boolean) {
    const planets = this.planetsService.getAllPlanets();

    this.displayPlanets = [];
    if (filterChanged) {
      this.filterPlanets = [];
      this.planetsPages = [];
      let planetCounter = 0;
      let pageCounter = 1;

      for (let i = 0; i < planets.length; i++) {
        if (this.searchPlanetsFilter.length === 0 ||
          (this.searchPlanetsFilter.length > 0 && planets[i].name.search(RegExp(this.searchPlanetsFilter, 'i')) >= 0)) {

          if (planetCounter % this.planetsPerPage === 0) {
            this.planetsPages.push(pageCounter++);
          }

          this.filterPlanets.push(planets[i]);
          planetCounter++;
        }
      }

      this.planetsStartFrom = this.planetsActualPage = 0;
    }

    for (let i = this.planetsStartFrom; i < this.planetsStartFrom + this.planetsPerPage; i++) {
      if (this.filterPlanets[i]) {
        this.displayPlanets.push(this.filterPlanets[i]);
      }
    }
  }

  public ngOnInit() {
    $(document).ready(function() {

    });

    this.planetsService.getPlanetsLoadState().subscribe((state: number) => {
      this.pageLoadState = state;

      this.refreshPlanetsList(true);

      $('#pageloaderdesc').hide();
      $('#pageloader').hide();
      $('#pageloadercontainer').hide();
    });
  }

  public constructor(private modalService: NgbModal, private planetsService: PlanetsService) { }

  public searchPlanetsSetFilter(modalContent, searchFilterVal) {
    if (searchFilterVal.length === 0) {
      this.modalService.open(modalContent, {ariaLabelledBy: 'modal-dialog-content'});
      return;
    }

    this.searchPlanetsFilter = searchFilterVal;
    console.log(searchFilterVal);
    this.refreshPlanetsList(true);
  }

  public searchPlanetResetFilter() {
    this.searchPlanetsFilter = '';
    this.refreshPlanetsList(true);
  }

  public setPage(page: number) {
    if (this.planetsActualPage === page - 1) {
      return;
    }

    this.planetsActualPage = page - 1;
    this.planetsStartFrom = this.planetsPerPage * this.planetsActualPage;
    this.refreshPlanetsList(false);
  }

  public setPlanetsCountPerPage(count: number) {
    if (count < 5) {
      count = 5;
    }

    this.planetsPerPage = count;
    this.refreshPlanetsList(true);
  }

  public showPlanetInfos(modalContent, planet: Planet) {
    this.infoPlanet = planet;
    this.modalService.open(modalContent, {ariaLabelledBy: 'modal-planet-infos'});
  }
}
