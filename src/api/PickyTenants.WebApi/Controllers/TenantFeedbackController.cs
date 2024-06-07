using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PickyTenants.WebApi.Entities;

namespace PickyTenants.WebApi.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class TenantFeedbackController : ControllerBase
{
    private readonly ILogger<TenantFeedbackController> _logger;
    private readonly PickyTenantsDbContext _dbContext;
    
    public TenantFeedbackController(ILogger<TenantFeedbackController> logger, PickyTenantsDbContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }
    
    [HttpPut]
    public async Task<bool> AddReview()
    {
        try
        {
            var property = new Property
            {
                Address = "123 Main St",
                Lat = 123,
                Lng = 456
            };
            _dbContext.Properties.Add(property);
            _dbContext.SaveChanges();
            _dbContext.Reviews.Add(new Review
            {
                TenantName = "John Doe",
                CreatedAt = DateTimeOffset.Now,
                Title = "Great place",
                Summary = "I loved it",
                Details = "I would recommend this place to anyone",
                PropertyId = property.Id
            });
            return await _dbContext.SaveChangesAsync() == 1;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    
    [HttpGet]
    public async Task<IEnumerable<Review>> SearchReviews()
    {
        return await _dbContext
            .Reviews
            .ToListAsync()
            .ConfigureAwait(false);
    }
    
    [HttpGet]
    public async Task<Review> GetReviewDetails(int id)
    {
        return await _dbContext
            .Reviews
            .Where(r => r.Id == id)
            .FirstAsync()
            .ConfigureAwait(false);
    }
}
