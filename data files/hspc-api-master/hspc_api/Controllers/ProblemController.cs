using System;
using System.Linq;
using System.Threading.Tasks;
using hspc_api.Data;
using hspc_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace hspc_api.Controllers
{
    [Authorize(Roles = Roles.ROLE_JUDGE + "," + Roles.ROLE_ADMINISTRATOR)]
    public class ProblemController : Controller
    {

        private readonly UserDbContext _dbContext;

        public ProblemController(UserDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpGet]
        [Route("/problems")]
        public object GetProblems()
        {
            try
            {
                var result = _dbContext.Problems.ToList();
                return Ok(result);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [HttpGet]
        [Route("/problems/beginner")]
        public object GetBeginnerProblems()
        {
            try
            {
                var result = _dbContext.Problems.Where(x=> x.Beginner == true).ToList(); //todo: not returning only beginner teams
                return Ok(result);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [HttpGet]
        [Route("/problems/advanced")]
        public object GetAdvancedProblems() 
        {
            try
            {
                var result = _dbContext.Problems.Where(x => x.Advanced == true).ToList(); //todo: select only advanced problems
                return Ok(result);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [HttpGet]
        [Route("/problems/{id}")]
        public object GetProblem([FromRoute] int id)
        {
            try
            {
                var result = _dbContext.Problems.Where(x => x.Id == id).FirstOrDefault();
                if(result == null) {
                    return NotFound();
                }
                return Ok(result);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }
    }
}
