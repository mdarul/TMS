using System;
using System.ComponentModel.DataAnnotations;

namespace TMS.Models.DTO.Vacation
{
    public class VacationDTO
    {
        [Required]
        public int Id { set; get; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public DateTime StartTime { get; set; }
        [Required]
        public DateTime EndTime { get; set; }
    }
}
