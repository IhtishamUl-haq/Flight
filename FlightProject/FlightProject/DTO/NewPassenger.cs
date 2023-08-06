using System.ComponentModel.DataAnnotations;

namespace FlightProject.DTO
{
    public record NewPassenger(
         [Required][MinLength(2)][MaxLength(35)] string? FirstName,
         [Required][MinLength(2)][MaxLength(35)] string? LastName,
         [Required][EmailAddress][StringLength(100, MinimumLength = 3)] string? Email,
         [Required] bool? Gender );
    
}
