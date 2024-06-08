namespace PickyTenants.WebApi.DataTransferObjects;

public class PropertyDto
{
    public long Id { get; set; }
    
    public long Lat { get; set; }
    public long Lng { get; set; }
    public string Address { get; set; }

    public int UnitNumber { get; set; } = -1;
    public int StreetNumber { get; set; } = -1;
    public string Street { get; set; }
    public string Suburb { get; set; }
    public string Country { get; set; }
    public string PostalCode { get; set; }
    public List<ReviewSummaryDto> PropertyReviews { get; set; }
}