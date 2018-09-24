using System;
using System.Threading.Tasks;
using hspc_api.Contracts;
using hspc_api.Models;
using Microsoft.AspNetCore.Identity;

namespace hspc_api.Services
{
    public class RoleService : IRoleService
    {
        private readonly RoleManager<ApplicationRole> roleManager; 

        public RoleService(RoleManager<ApplicationRole> roleManager)
        {
            this.roleManager = roleManager; 
        }

        public async Task<bool> CreateRole(string role) {
            var adminRole = new ApplicationRole
            {
                CreatedDate = DateTime.Now,
                Name = role
            };

            if(! await roleManager.RoleExistsAsync(role)) {
                var result = await roleManager.CreateAsync(adminRole);
                return result.Succeeded;
            }
            return false;
        }
    }
}
