using System;
using System.Threading.Tasks;
using hspc_api.Contracts;
using hspc_api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace hspc_api.Controllers
{
    [Route("/roles")]
    public class RoleController : Controller
    {

        private readonly IRoleService roleService;
        private readonly UserManager<ApplicationUser> _userManager;

        public RoleController(
            IRoleService roleService,
            UserManager<ApplicationUser> userManager)
        {
            this._userManager = userManager;
            this.roleService = roleService;
        }

        [HttpGet]
        public async Task<object> CreateRoles() {

            if(await roleService.CreateRole(Roles.ROLE_ADMINISTRATOR)) {
                if(await roleService.CreateRole(Roles.ROLE_VOLUNTEER)) {
                    if(await roleService.CreateRole(Roles.ROLE_JUDGE)) {
                        return Ok();
                    }
                }
            }
            return BadRequest();
        }
    }
}
