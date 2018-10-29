using System;
using System.Linq;
using System.Threading.Tasks;
using hspc_api.Data;
using hspc_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace hspc_api.Controllers
{
    [Authorize(Roles = Roles.ROLE_JUDGE + "," + Roles.ROLE_ADMINISTRATOR)]
    public class TeamController : Controller
    {

        private readonly UserDbContext _dbContext;

        public TeamController(UserDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpGet]
        [Route("/teams")]
        public object GetTeams()
        {
            try
            {

                var dbTeam = _dbContext.Teams.ToList();
                return Ok(dbTeam);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [HttpGet]
        [Route("/teams/{problemId}/beginner")]
        public object GetBeginnerTeams([FromRoute] int problemId)
        {
            try
            {
                var result = _dbContext.TeamProblems
                                       .Where(x => x.Problem.Id == problemId)
                                       .Where(x => x.Team.Beginner == true)
                                       .Include(x => x.Team)
                                       .Include(x => x.Problem)
                                       .ToList();
                return Ok(result);

            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }

        [HttpGet]
        [Route("/teams/{problemId}/advanced")]
        public object GetAdvancedTeams([FromRoute] int problemId)
        {
            try
            {

                var result = _dbContext.TeamProblems
                                       .Where(x => x.Problem.Id == problemId)
                                       .Where(x => x.Team.Advanced == true)
                                       .Include(x => x.Team)
                                       .Include(x => x.Problem)
                                       .ToList();
                return Ok(result);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [HttpGet]
        [Route("/teams/{id}")]
        public object GetTeam([FromRoute] int id)
        {
            try
            {

                var dbTeam = _dbContext.Teams.Where(x => x.Id == id).FirstOrDefault();
                return Ok(dbTeam);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }
    }
}
