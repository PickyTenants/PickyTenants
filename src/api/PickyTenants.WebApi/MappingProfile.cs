using AutoMapper;
using PickyTenants.WebApi.DataTransferObjects;
using PickyTenants.WebApi.Entities;

namespace PickyTenants.WebApi;

public class MappingProfile: Profile
{
    public MappingProfile()
    {
        CreateMap<Property, PropertyDto>();
        CreateMap<PropertyDto, Property>();
        
        CreateMap<Review, ReviewSummaryDto>();
        CreateMap<Review, ReviewDetailsDto>();
        CreateMap<ReviewDetailsDto, Review>();
    }
}