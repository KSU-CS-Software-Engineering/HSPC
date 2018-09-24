using System;
using System.Linq;
using System.Threading.Tasks;
using hspc_api.Data;
using hspc_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hspc_api.Controllers
{
    [Authorize(Roles = Roles.ROLE_JUDGE + "," + Roles.ROLE_ADMINISTRATOR)]
    public class JudgeController : Controller
    {
        private readonly UserDbContext _dbContext;

        public JudgeController(UserDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpPost]
        [Route("/judge/mark")]
        public async Task<object> MarkTeamForJudgingAsync([FromBody] MarkTeamForJudgeDto model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var teamProblem = _dbContext.TeamProblems.Where(x => x.Problem.Id == model.ProblemId && x.Team.Id == model.TeamId).FirstOrDefault();
                if(teamProblem != null) 
                {
                    teamProblem.MarkedForJudging = true;
                    var updateResult = await _dbContext.SaveChangesAsync();
                    if(updateResult == 1) {
                        return Ok(teamProblem);
                    }
                    return BadRequest(updateResult);
                }

                var team = _dbContext.Teams.Where(x => x.Id == model.TeamId).FirstOrDefault();
                if (team == null)
                {
                    return BadRequest(new { message = "Invalid team id" });
                }
                var problem = _dbContext.Problems.Where(x => x.Id == model.ProblemId).FirstOrDefault();
                if (problem == null)
                {
                    return BadRequest(new { message = "Invalid problem id" });
                }
                var newTp = new TeamProblems
                {
                    Team = team,
                    Problem = problem,
                    MarkedForJudging = true

                };
                var entity = await _dbContext.TeamProblems.AddAsync(newTp);
                var result = await _dbContext.SaveChangesAsync();
                if(result == 1) {
                    return Ok(entity.Entity);
                }
                return BadRequest(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpPost]
        [Route("/judge/answer")]
        public async Task<object> MarkTeamForAnswerAsync([FromBody] MarkTeamForAnswerDto model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var teamProblem = _dbContext.TeamProblems.Where(x => x.Problem.Id == model.ProblemId && x.Team.Id == model.TeamId).Include(tp => tp.Team).FirstOrDefault();
                if (teamProblem != null)
                {
                    if(teamProblem.Correct == model.Correct) {
                        return Ok(teamProblem);
                    }
                    teamProblem.Correct = model.Correct;
                    var updateResult = await _dbContext.SaveChangesAsync();
                    if (updateResult == 1)
                    {
                        return Ok(teamProblem);
                    }
                    return BadRequest(updateResult);
                }
                return BadRequest(new { message = "Unable to find entity with specified Team and Problem Id's"});
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
