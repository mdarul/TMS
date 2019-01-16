using System;
using System.ComponentModel.DataAnnotations;


namespace TMS.Models.DTO.SickLeave
{
    public class SickLeaveDTO
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
