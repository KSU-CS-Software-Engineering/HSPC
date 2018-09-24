using System;
using Microsoft.AspNetCore.Identity;

namespace hspc_api.Models
{
    public class ApplicationRole : IdentityRole
    {
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}