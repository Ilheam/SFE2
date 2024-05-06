using Microsoft.EntityFrameworkCore;

namespace WebApplication4.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Fournisseur> Fournisseurs { get; set; }
        public DbSet<FamilleArticle> FamilleArticle { get; set; }

    }
}
