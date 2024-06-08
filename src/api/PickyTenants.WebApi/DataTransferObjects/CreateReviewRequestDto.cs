namespace PickyTenants.WebApi.DataTransferObjects;

public class CreateReviewRequestDto
{
    public long PropertyId { get; set; }

    public ReviewDetailsDto Review { get; set; }
}