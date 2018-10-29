using System;
using Microsoft.AspNetCore.Identity;

namespace hspc_api.Models
{
    public class ApplicationUser : IdentityUser
    {

        public string FirstName { get; set; }
        public string LastName { get; set; }


    }
}
