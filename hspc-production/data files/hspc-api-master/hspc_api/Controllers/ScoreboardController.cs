using System;
using System.Collections.Generic;
using System.Linq;
using hspc_api.Data;
using hspc_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hspc_api.Controllers
{
    public class ScoreboardController : Controller
    {
        private readonly UserDbContext _dbContext;

        public ScoreboardController(UserDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        [Route("/scoreboard")]
        public object GetScores()
        {
            try
            {
                var teams = _dbContext.Teams.ToList();
                var scores = new List<Score>();

                foreach(var team in teams) {
                    var score = 0;
                    var tps = _dbContext.TeamProblems.Include(x=> x.Problem).Where(x => x.Team.Id == team.Id).Select(x => new TeamProblems { Id = x.Id, MarkedForJudging = x.MarkedForJudging, Correct = x.Correct, Attempts = x.Attempts, Problem = x.Problem }).ToList();

                    foreach(var tp in tps) {
                        if(tp.Correct != null) {
                            
                            if(tp.Correct == true) {

                                score += 1;
                                if(tp.Attempts == 1) {
                                    score += 1;
                                }
                            }
                        }
                    }

                    scores.Add(new Score(){
                        Team = team,
                        Problems = tps,
                        TotalPoints = score
                    });

                }
                var response = scores.OrderByDescending(x => x.TotalPoints).ToList();
                return Ok(response);

            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }

    }
}
