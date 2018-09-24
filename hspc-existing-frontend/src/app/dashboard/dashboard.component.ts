import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { DashboardService } from '../_services/dashboard.service';
import { Problem } from '../_models/Problem';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private beginnerProblems$: Array<Problem>;
  private advancedProblems$: Array<Problem>;
  private problemId: number;
  private problemName: string;
  private beginner;

  constructor(private titleService: Title, private http: Http, private dashboardService: DashboardService) { }

  selected = false;

  ngOnInit() {
    this.titleService.setTitle( 'Judgr - Dashboard' );
    this.GetBeginnerProblems();
    this.GetAdvancedProblems();
  }


  showList() {
    this.GetBeginnerProblems();
    this.GetAdvancedProblems();
    this.selected = !this.selected;
  }

  GetAdvancedProblems() {
    this.dashboardService.AdvancedProblems().subscribe(res => {
      this.advancedProblems$ = res.json();
    });
  }

  GetBeginnerProblems() {
    this.dashboardService.BeginnerProblems().subscribe(res => {
      this.beginnerProblems$ = res.json();
    });
  }

  showProblem(id: number, name: string, beginner) {
    this.selected = true;
    this.problemId = id;
    this.problemName = name;
    this.beginner = beginner;
  }

}
