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
            // var property = new Property
            // {
            //     Address = "123 Main St",
            //     Lat = 123,
            //     Lng = 456
            // };
            // _dbContext.Properties.Add(property);
            // await _dbContext.SaveChangesAsync().ConfigureAwait(false);
            // _dbContext.Reviews.Add(new Review
            // {
            //     TenantName = "John Doe",
            //     CreatedAt = DateTimeOffset.Now,
            //     Title = "Great place",
            //     Summary = "I loved it",
            //     Details = "I would recommend this place to anyone",
            //     PropertyId = property.Id
            // });
            // return await _dbContext.SaveChangesAsync() == 1;
            return false;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    
    [HttpGet]
    public async Task<Property> SearchReviews([FromBody] Property propertyRequest)
    {
        var property = await _dbContext.Properties.Where(p => 
            p.Lat == propertyRequest.Lat 
            && p.Lng == propertyRequest.Lng
            && p.UnitNumber == propertyRequest.UnitNumber
            && p.StreetNumber == propertyRequest.StreetNumber
            && p.Street == propertyRequest.Street
            && p.Suburb == propertyRequest.Suburb
            && p.Country == propertyRequest.Country
            && p.PostalCode == propertyRequest.PostalCode)
            .Include(p => p.PropertyReviews)
            .FirstOrDefaultAsync()
            .ConfigureAwait(false);
        if (property == null)
        {
            property = new Property
            {
                Lat = propertyRequest.Lat,
                Lng = propertyRequest.Lng,
                Address = propertyRequest.Address,
                UnitNumber = propertyRequest.UnitNumber,
                StreetNumber = propertyRequest.StreetNumber,
                Street = propertyRequest.Street,
                Suburb = propertyRequest.Suburb,
                Country = propertyRequest.Country,
                PostalCode = propertyRequest.PostalCode
            };
            await _dbContext.Properties.AddAsync(property).ConfigureAwait(false);
            await _dbContext.SaveChangesAsync().ConfigureAwait(false);
        }
        return property;
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
