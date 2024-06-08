namespace PickyTenants.WebApi.DataTransferObjects;

public class AddReviewDto
{
    public long PropertyId { get; set; }

    public ReviewDetailsDto Review { get; set; }
}