

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using EgresosUniYMCA.AuthServer.Models.Entity;
using Microsoft.EntityFrameworkCore;

namespace EgresosUniYMCA.Data
{
public class ApplicationDbContext : IdentityDbContext<AppUser> 
{
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        
        public DbSet<JobSeeker> JobSeekers { get; set; }
    }
}
 
 