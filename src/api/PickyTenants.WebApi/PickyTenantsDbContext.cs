using Microsoft.EntityFrameworkCore;
using PickyTenants.WebApi.Entities;

namespace PickyTenants.WebApi;

public class PickyTenantsDbContext(DbContextOptions<PickyTenantsDbContext> opts) : DbContext(opts)
{
    public DbSet<Review> Reviews { get; set; }
    public DbSet<Property> Properties { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source=pickytenants.db");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<Review>()
            .HasOne(r => r.Property)
            .WithMany(p => p.PropertyReviews)
            .HasForeignKey(r => r.PropertyId);
    }
}