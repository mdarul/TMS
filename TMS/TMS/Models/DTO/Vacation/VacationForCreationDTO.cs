using System;
using System.ComponentModel.DataAnnotations;

namespace TMS.Models.DTO.Vacation
{
    public class VacationForCreationDTO
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public DateTime StartTime { get; set; }
        [Required]
        public DateTime EndTime { get; set; }
    }
}
