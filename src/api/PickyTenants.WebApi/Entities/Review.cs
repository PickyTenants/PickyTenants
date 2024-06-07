using System.ComponentModel.DataAnnotations;

namespace PickyTenants.WebApi.Entities;

public class Review
{
    [Key] 
    public long Id { get; set; }

    public string TenantName { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public string Title { get; set; }
    public string Summary { get; set; }
    public string Details { get; set; }
    
    public Property Property { get; set; }
    public long PropertyId { get; set; }
}