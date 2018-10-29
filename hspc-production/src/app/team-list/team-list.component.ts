import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../_services/dashboard.service';
import { Team } from '../_models/Team';
import { ToastService } from '../_services/toast.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  constructor(private dashboardService: DashboardService,
    private toastService: ToastService) { }

  teams$: Array<Team>;
  private markedLoading = false;
  private correctLoading = false;
  private incorrectLoading = false;

  @Input() title = 'Team';
  @Input() beginner;
  @Input() problemId: number;

  ngOnInit() {
    this.teams$ = this.GetTeams(this.beginner);
  }

  GetTeams(beginner): Array<Team> {
    // need to disable correct buttons based on returned values
    if (beginner === 'beginner') {
      this.dashboardService.BeginnerTeams(this.problemId).subscribe(res => {
        const body = <Array<Team>>res.json();
        this.teams$ = res.json();
        return body;
      });
    } else if (beginner === 'advanced') {
      this.dashboardService.AdvancedTeams(this.problemId).subscribe(res => {
        const body = <Array<Team>>res.json();
        this.teams$ = res.json();
        return body;
      });
    }
    return [];
  }

  markForJudging(id: number) {
    this.markedLoading = true;
    // todo mark a team for judging here
    console.log(id);
    this.dashboardService.MarkTeamForJudging(this.problemId, id).subscribe(res => {
      if (res.ok) {
        this.markedLoading = false;
        this.toastService.toast('Marked for judging', 'fa-check', 'success', '3000');
        this.teams$ = this.GetTeams(this.beginner);
      }
    },
    err => {
      this.toastService.toast('Error marking team for judging!', 'fa-exclamation-circle', 'danger', '3000');
      this.markedLoading = false;
      console.log(err);
    });

  }

  correctAnswer(id: number) {
    this.correctLoading = true;
    // todo mark a team for correct answer here
    this.dashboardService.SubmitAnswer(this.problemId, id, true).subscribe(res => {
      if (res.ok) {
        this.correctLoading = false;
        this.toastService.toast('Correct Answer submitted', 'fa-check', 'success', '3000');
        this.teams$ = this.GetTeams(this.beginner);
      }
    },
    err => {
      this.toastService.toast('Error submitting result!', 'fa-exclamation-circle', 'danger', '3000');
      this.markedLoading = false;
      console.log(err);
    });
  }

  incorrectAnswer(id: number) {
    this.incorrectLoading = true;
    this.dashboardService.SubmitAnswer(this.problemId, id, false).subscribe(res => {
      if (res.ok) {
        this.incorrectLoading = false;
        this.teams$ = this.GetTeams(this.beginner);
        this.toastService.toast('Incorrect Answer submitted', 'fa-check', 'success', '3000');
      }
    },
    err => {
      this.toastService.toast('Error submitting result!', 'fa-exclamation-circle', 'danger', '3000');
      this.incorrectLoading = false;
      console.log(err);
    });
  }

}
