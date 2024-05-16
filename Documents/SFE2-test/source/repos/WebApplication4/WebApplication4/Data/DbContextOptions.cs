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
        public DbSet<Article> Articles { get; set; }
        public DbSet<BonDeCommande> BonDeCommandes { get; set; }
        public DbSet<Entete_BC> Entete_BCs { get; set; }
        public DbSet<DetailsBc> DetailsBcs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure entity relationships and keys
            modelBuilder.Entity<BonDeCommande>()
                .HasKey(b => b.Id);

            modelBuilder.Entity<Entete_BC>()
                .HasKey(e => e.Id);

            modelBuilder.Entity<DetailsBc>()
                .HasKey(d => d.Id);

            modelBuilder.Entity<BonDeCommande>()
                .HasOne(b => b.Entete)
                .WithOne()
                .HasForeignKey<BonDeCommande>(b => b.EnteteId);

            modelBuilder.Entity<BonDeCommande>()
                .HasOne(b => b.Detail)
                .WithMany()
                .HasForeignKey(b => b.DetailId);

            modelBuilder.Entity<BonDeCommande>()
                .HasMany(b => b.Details)
                .WithOne(d => d.BonDeCommande)
                .HasForeignKey(d => d.BonDeCommandeId);
        }
    }
}
