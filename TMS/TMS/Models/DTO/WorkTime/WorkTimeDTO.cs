using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace TMS.Models
{
    public class WorkTimeDTO
    {
        [Required]
        public int Id { get; set; }

        public DateTime WorkStartTime { get; set; }
        public DateTime WorkEndTime { get; set; }

        [Required]
        public int UserId { get; set; }

        public int TaskId { get; set; }
    }
}
