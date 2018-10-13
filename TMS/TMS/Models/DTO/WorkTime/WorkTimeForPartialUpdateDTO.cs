using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace TMS.Models.DTO.WorkTime
{
    public class WorkTimeForPartialUpdateDTO
    {
        public DateTime WorkStartTime { get; set; }
        public DateTime WorkEndTime { get; set; }

        [Required]
        public int UserId { get; set; }

        public int TaskId { get; set; }
    }
}
