using Microsoft.AspNetCore.Mvc;
using PickyTenants.WebApi.Entities;

namespace PickyTenants.WebApi.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class TenantFeedbackController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<TenantFeedbackController> _logger;

    public TenantFeedbackController(ILogger<TenantFeedbackController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public string Test()
    {
        return "Hello World!";
    }
    
    [HttpPut]
    public async Task<bool> AddReview([FromBody] Review review)
    {
        return true;
    }
    
    [HttpGet]
    public async Task<IEnumerable<Review>> SearchReviews()
    {
        return Enumerable.Range(1, 5).Select(index => new Review
        {
            
        })
        .ToArray();
    }
    
    [HttpGet]
    public async Task<Review> GetReviewDetails(int id)
    {
        return new Review
        {
            
        };
    }
}
