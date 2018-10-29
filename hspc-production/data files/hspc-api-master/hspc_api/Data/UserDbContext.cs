using System;
using hspc_api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace hspc_api.Data
{
    public class UserDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public UserDbContext(DbContextOptions<UserDbContext> options)
                : base(options)
        {
        }

        public DbSet<Team> Teams { get; set; }

        public DbSet<Problem> Problems { get; set; }

        public DbSet<TeamProblems> TeamProblems { get; set; }
    }
}
