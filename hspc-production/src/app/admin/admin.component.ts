import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../_services/dashboard.service';
import { Team } from '../_models/Team';
import { Problem } from '../_models/Problem';
import { NgForm } from '@angular/forms';
import { ToastService } from '../_services/toast.service';
import * as UIkit from 'uikit';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  teams$: Array<Team>;
  problems$: Array<Problem>;
  private teamRadioValue: boolean;
  private problemRadioValue: boolean;

  constructor(private dashboardService: DashboardService, private toastService: ToastService) { }

  ngOnInit() {
    this.Teams();
    this.Problems();

  }

  teamRadio(val) {
    if (val === 'beginner') {
      this.teamRadioValue = true;
    } else if (val === 'advanced') {
      this.teamRadioValue = false;
    }
  }


  CreateTeam(form: NgForm) {
    const name = form.controls['teamName'];
    if (name.valid) {
      this.createTeam(name.value, this.teamRadioValue, !this.teamRadioValue);
    }

  }


  createTeam(name: string, beginner: boolean, advanced: boolean) {
    if (beginner === advanced) {
      // error here
    }
    this.dashboardService.CreateTeam(name, beginner, advanced).subscribe(res => {
      if (res.ok) {
        this.toastService.toast('Successfully created new team.', 'fa-check', 'success', '3000');
        UIkit.modal('#modal-team').hide();
        this.Teams();

      }
    },
      err => {
        // todo error handling
      }
    );
  }

  deleteTeam(id: number) {
    this.dashboardService.DeleteTeam(id).subscribe(res => {
      if (res.ok) {
        this.toastService.toast('Successfully deleted team', 'fa-check', 'success', '3000');
        this.Teams();
      }
    },
      err => {
        console.log(err);
      });
  }


  problemRadio(val) {
    if (val === 'beginner') {
      this.problemRadioValue = true;
    } else if (val === 'advanced') {
      this.problemRadioValue = false;
    }
  }


  CreateProblem(form: NgForm) {
    const name = form.controls['problemName'];
    console.log(name);
    const number = form.controls['problemNumber'];

    if (name.valid) {
      this.createProblem(name.value, number.value, this.problemRadioValue, !this.problemRadioValue);
    }

  }


  createProblem(name: string, number: number, beginner: boolean, advanced: boolean) {
    if (beginner === advanced) {
      // error here
    }
    this.dashboardService.CreateProblem(name, number, beginner, advanced).subscribe(res => {
      if (res.ok) {
        this.toastService.toast('Successfully created new problem.', 'fa-check', 'success', '3000');
        UIkit.modal('#modal-problem').hide();
        this.Problems();

      }
    },
      err => {
        // todo error handling
      }
    );
  }

  deleteProblem(id: number) {
    this.dashboardService.DeleteProblem(id).subscribe(res => {
      if (res.ok) {
        this.toastService.toast('Successfully deleted problem', 'fa-check', 'success', '3000');
        this.Problems();
      }
    },
      err => {
        console.log(err);
      });
  }


  Teams() {
    this.dashboardService.Teams().subscribe(
      res => {
        this.teams$ = res.json();
      },
      err => {
        // todo handle errors
      });
  }


  Problems() {
    this.dashboardService.Problems().subscribe(
      res => {
        this.problems$ = res.json();
      },
      err => {
        // todo handle errors
      });
  }



}
