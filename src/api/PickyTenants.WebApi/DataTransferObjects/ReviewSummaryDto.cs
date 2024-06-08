namespace PickyTenants.WebApi.DataTransferObjects;

public class ReviewSummaryDto
{
    public long Id { get; set; }

    public string TenantName { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public string Title { get; set; }
    public string Summary { get; set; }

    public string LandloardName { get; set; }
    public string PropertyManagerName { get; set; }
    public string PropertyManagementCompany { get; set; }

    public short AverageRating { get; set; }

}