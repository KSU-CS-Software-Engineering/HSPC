using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using hspc_api.Contracts;
using hspc_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace hspc_api.Controllers
{
    [Route("[controller]")]
    public class TokenController : Controller
    {
        IArticleService articleService;
        private readonly UserManager<ApplicationUser> _userManager;


        public TokenController(IArticleService articleService, UserManager<ApplicationUser> userManager) {
            this.articleService = articleService;
            _userManager = userManager;
        }

        [Authorize]
        [HttpGet]
        public async Task<object> Test()
        {
            var user = await _userManager.GetUserAsync(HttpContext.User);
            if(user != null) {
                return Ok();
            }
            return Unauthorized();
        }


        /*[HttpGet]
        public async Task<object> Token() {
            throw new NotImplementedException();
        }*/
    }
}
