namespace PickyTenants.WebApi.Entities;

public class Property
{
    public long Id { get; set; }
    public long Lat { get; set; }
    public long Lng { get; set; }
    public string Address { get; set; }
    
    public List<Review> Reviews { get; set; }
}
