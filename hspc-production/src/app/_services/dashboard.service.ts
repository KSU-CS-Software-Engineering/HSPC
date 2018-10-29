import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';

@Injectable()
export class DashboardService {

  constructor(private http: HttpService) { }


  public BeginnerTeams(problemId: number) {
    return this.http.get(environment.baseUrl + '/teams/' + problemId + '/beginner');
  }

  public AdvancedTeams(problemId: number) {
    return this.http.get(environment.baseUrl + '/teams/' + problemId + '/advanced');
  }

  public Teams() {
    return this.http.get(environment.baseUrl + '/teams');
  }

  public Team(id: number) {
    return this.http.get(environment.baseUrl + '/teams/' + id);
  }

  public Problems() {
    return this.http.get(environment.baseUrl + '/problems');
  }

  public BeginnerProblems() {
    return this.http.get(environment.baseUrl + '/problems/beginner');
  }

  public AdvancedProblems() {
    return this.http.get(environment.baseUrl + '/problems/advanced');
  }

  public Problem(id: number) {
    return this.http.get(environment.baseUrl + '/problems/' + id);
  }

  public MarkTeamForJudging(problemId: number, teamId: number) {
    const body = {
      'TeamId' : teamId,
      'ProblemId' : problemId
    };
    return this.http.post(environment.baseUrl + '/judge/mark', body);
  }

  public SubmitAnswer(problemId: number, teamId: number, correct: boolean) {
    const body = {
      'TeamId': teamId,
      'ProblemId': problemId,
      'Correct': correct
    };
    return this.http.post(environment.baseUrl + '/judge/answer', body);
  }

  public CreateTeam(teamName: string, beginner: boolean, advanced: boolean) {
    if (beginner === advanced) {
      // error here
      return null;
    }
    const body = {
      'Name': teamName,
      'Beginner': beginner,
      'Advanced': advanced
    };
    return this.http.post(environment.baseUrl + '/admin/team', body);
  }

  public CreateProblem(problemName: string, problemNumber: number, beginner: boolean, advanced: boolean) {
    if (beginner === advanced) {
      // error here
      return null;
    }
    const body = {
      'Name': problemName,
      'Number': problemNumber,
      'Beginner': beginner,
      'Advanced': advanced
    };
    return this.http.post(environment.baseUrl + '/admin/problem', body);
  }

  public DeleteProblem(id: number) {
    return this.http.delete(environment.baseUrl + '/admin/problem/' + id);
  }

  public DeleteTeam(id: number) {
    return this.http.delete(environment.baseUrl + '/admin/team/' + id);
  }

  public GetScores() {
    return this.http.get(environment.baseUrl + '/scoreboard');
  }

}
