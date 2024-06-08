using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PickyTenants.WebApi.DataTransferObjects;
using PickyTenants.WebApi.Entities;

namespace PickyTenants.WebApi.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class TenantFeedbackController : ControllerBase
{
    private readonly ILogger<TenantFeedbackController> _logger;
    private readonly PickyTenantsDbContext _dbContext;
    private readonly IMapper _mapper;
    
    public TenantFeedbackController(ILogger<TenantFeedbackController> logger, 
        PickyTenantsDbContext dbContext, 
        IMapper mapper)
    {
        _logger = logger;
        _dbContext = dbContext;
        _mapper = mapper;
    }
    
    [HttpPut]
    public async Task<bool> AddReview([FromBody] CreateReviewRequestDto dto)
    {
        var property = await _dbContext
            .Properties
            .FirstOrDefaultAsync(p => p.Id == dto.PropertyId)
            .ConfigureAwait(false);
        var review = _mapper.Map<Review>(dto.Review);
        review.Property = property;
        await _dbContext.Reviews.AddAsync(review).ConfigureAwait(false);
        return await _dbContext.SaveChangesAsync().ConfigureAwait(false) == 1;
    }
    
    [HttpGet]
    public async Task<PropertyDto> SearchReviews([FromBody] PropertyDto propertyRequest)
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
        return _mapper.Map<PropertyDto>(property);
    }
    
    
    [HttpGet]
    public async Task<ReviewDetailsDto> GetReviewDetails(int id)
    {
        var review = await _dbContext
            .Reviews
            .FirstAsync(r => r.Id == id)
            .ConfigureAwait(false);
        return _mapper.Map<ReviewDetailsDto>(review);
    }
}
