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
    public async Task<bool> AddReview([FromBody] AddReviewDto dto)
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
    public async Task<PropertyDto> SearchReviews([FromBody] SearchPropertyDto dto)
    {
        var property = await _dbContext.Properties.Where(p => 
            p.Lat == dto.Lat 
            && p.Lng == dto.Lng
            && p.UnitNumber == dto.UnitNumber
            && p.StreetNumber == dto.StreetNumber
            && p.Street == dto.Street
            && p.Suburb == dto.Suburb
            && p.Country == dto.Country
            && p.PostalCode == dto.PostalCode)
            .Include(p => p.PropertyReviews)
            .FirstOrDefaultAsync()
            .ConfigureAwait(false);
        if (property == null)
        {
            property = _mapper.Map<Property>(dto);
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
