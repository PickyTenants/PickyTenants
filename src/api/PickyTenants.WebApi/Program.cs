using Microsoft.EntityFrameworkCore;
using PickyTenants.WebApi;

var builder = WebApplication.CreateBuilder(args);
var policyName = "AllowAll";
// Add services to the container.

builder.Services.AddDbContext<PickyTenantsDbContext>(opts =>
{
    opts.UseSqlite();
});

builder.Services.AddCors(opts =>
{
    opts.AddPolicy(name: policyName,
        builder =>
        {
            builder.AllowAnyOrigin();
            builder.AllowAnyMethod();
            builder.AllowAnyHeader();
        });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<PickyTenantsDbContext>();
    context.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(policyName); // Apply the CORS policy

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
