using Microsoft.EntityFrameworkCore;

namespace WebApplication4.Models
{
    public class CustomDbContext : DbContext
    {

        public CustomDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Fournisseur> Fournisseurs { get; set; }


    }
}
