using Microsoft.EntityFrameworkCore;
using PickyTenants.WebApi.Entities;

namespace PickyTenants.WebApi;

public class PickyTenantsDbContext : DbContext
{
    public DbSet<Review> Blogs { get; set; }
    public DbSet<Property> Properties { get; set; }
}