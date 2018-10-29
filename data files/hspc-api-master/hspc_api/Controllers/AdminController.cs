using System;
using System.Linq;
using System.Threading.Tasks;
using hspc_api.Data;
using hspc_api.Filters;
using hspc_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace hspc_api.Controllers
{
    [Authorize(Roles = Roles.ROLE_ADMINISTRATOR)]
    public class AdminController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly UserDbContext _dbContext;

        public AdminController(UserManager<ApplicationUser> userManager, UserDbContext dbContext)
        {
            _userManager = userManager;
            _dbContext = dbContext;
        }

        [HttpPost]
        [ValidateModel]
        [Route("/admin/judge")]
        public async Task<object> CreateJudge([FromBody] RegisterDto model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var user = new ApplicationUser
                {
                    UserName = model.Email,
                    Email = model.Email
                };
                var userResult = await _userManager.CreateAsync(user, model.Password);
                if (userResult.Succeeded)
                {
                    //set role to judge here

                    var roleResult = await _userManager.AddToRoleAsync(user, Roles.ROLE_JUDGE);
                    if(roleResult.Succeeded) {
                        return Ok();
                    }
                    return BadRequest(new { errors = roleResult.Errors });
                }
                return BadRequest(new { errors = userResult.Errors });


            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }


        [HttpDelete]
        [ValidateModel]
        [Route("/admin/judge")]
        public async Task<object> DeleteJudge([FromBody] DeleteJudgeDto model) 
        {
            try 
            {
                if (!ModelState.IsValid) 
                {
                    return BadRequest(ModelState);
                }
                var user = await _userManager.FindByEmailAsync(model.Email); //todo delete by id not email

                var roles = await _userManager.GetRolesAsync(user);
                if (roles.Contains(Roles.ROLE_ADMINISTRATOR)) 
                {
                    return BadRequest(new { errors = "Cannot delete an admin account: " + model.Email });
                }
                if(user == null) 
                {
                    return NotFound(new { errors = "Could not find user object with specified email: " + model.Email });
                }
                var result = await _userManager.DeleteAsync(user);

                if(result.Succeeded)
                {
                    return Ok(user);
                }
                return BadRequest(result.Errors);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [ValidateModel]
        [Route("/admin/problem")]
        public async Task<object> CreateProblem([FromBody] CreateProblemDto model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState); //todo: validate that advanced and beginner are opposite
                }
                var problem = new Problem()
                {
                    Name = model.Name,
                    Number = model.Number,
                    Advanced = model.Advanced,
                    Beginner = model.Beginner
                };
                var dbProblem = await _dbContext.Problems.AddAsync(problem);

                _dbContext.Teams
                         .Where(x => x.Beginner == model.Beginner)
                         .Where(x => x.Advanced == model.Advanced)
                         .ToList()
                         .ForEach(x => _dbContext.TeamProblems.Add(new TeamProblems() { Problem = dbProblem.Entity, Team = x, MarkedForJudging = false }));

                await _dbContext.SaveChangesAsync();
                return Ok(dbProblem.Entity);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }        }

        [HttpDelete]
        [ValidateModel]
        [Route("/admin/problem/{id}")]
        public async Task<object> DeleteProblem([FromRoute] int id)
        {
            try
            {
                if (id == 0)
                {
                    return BadRequest("Missing id in route");
                }
                var problem = await _dbContext.FindAsync<Problem>(id);
                if (problem == null)
                {
                    return NotFound(new { errors = "Could not find problem object with specified id: " + id });
                }
                var teamProblems = _dbContext.TeamProblems.Where(x => x.Problem.Id == id).ToList();

                teamProblems.ForEach(x => _dbContext.Remove<TeamProblems>(x));

                var deleted = _dbContext.Remove<Problem>(problem);
                var result = await _dbContext.SaveChangesAsync();
                return Ok(deleted.Entity);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [ValidateModel]
        [Route("/admin/team")]
        public async Task<object> CreateTeam([FromBody] CreateTeamDto model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                if(model.Advanced == model.Beginner) {
                    return BadRequest(new { message = "Advanced and Beginner must not be the same" });
                }
                var team = new Team()
                {
                    Name = model.Name,
                    Advanced = model.Advanced,
                    Beginner = model.Beginner
                };
                var dbTeam = await _dbContext.Teams.AddAsync(team);

                _dbContext.Problems
                          .Where(x => x.Beginner == model.Beginner)
                          .Where(x => x.Advanced == model.Advanced)
                          .ToList()
                          .ForEach(x => _dbContext.TeamProblems.Add(new TeamProblems() { Team = dbTeam.Entity, Problem = x, MarkedForJudging = false } ));

                await _dbContext.SaveChangesAsync();
                return Ok(dbTeam.Entity);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
         }

        [HttpDelete]
        [ValidateModel]
        [Route("/admin/team/{id}")]
        public async Task<object> DeleteTeam([FromRoute] int id)
        {
            try
            {
                if (id == 0) {
                    return BadRequest("Missing id in route");
                }
                var team = await _dbContext.FindAsync<Team>(id);
                if (team == null)
                {
                    return NotFound(new { errors = "Could not find team object with specified id: " + id });
                }

                var teamProblems = _dbContext.TeamProblems.Where(x => x.Team.Id == id).ToList();
                teamProblems.ForEach(x => _dbContext.Remove<TeamProblems>(x));

                var deleted = _dbContext.Remove<Team>(team);
                var result = await _dbContext.SaveChangesAsync();

                return Ok(deleted.Entity);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [ValidateModel]
        [Route("/admin/reset")]
        public async Task<object> ResetCompetition([FromBody] ResetCompetitionDto model)
        {
            return BadRequest("Not implemented");
        }

    }
}
