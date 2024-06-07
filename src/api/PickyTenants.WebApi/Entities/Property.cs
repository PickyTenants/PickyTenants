using System.ComponentModel.DataAnnotations;

namespace PickyTenants.WebApi.Entities;

public class Property
{
    [Key]
    public long Id { get; set; }
    public long Lat { get; set; }
    public long Lng { get; set; }
    public string Address { get; set; }
    
    virtual public List<Review> PropertyReviews { get; set; }
}
