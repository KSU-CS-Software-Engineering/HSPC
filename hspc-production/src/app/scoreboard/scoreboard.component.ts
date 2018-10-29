import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../_services/dashboard.service';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable'; // <--- This changes from the first Example!
import { HttpService } from '../_services/http.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService, private http: HttpService) { }

  teams$;

  ngOnInit() {
    this.getNewScores().subscribe(res => {
      res.subscribe(res1 => {
        this.teams$ = res1.json();
      });
    },
    err => {

    });
  }

  getNewScores = () => {
    return IntervalObservable
      .create(1000)
      .map((i) => this.http.get(environment.baseUrl + '/scoreboard'));
    }


  GetScores() {
    this.teams$ = this.dashboardService.GetScores().subscribe(res => {
      this.teams$ = res.json();
    },
    err => {

    });
  }

}
