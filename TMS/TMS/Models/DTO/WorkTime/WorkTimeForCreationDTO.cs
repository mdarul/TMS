using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TMS.Models.DTO
{
    public class WorkTimeForCreationDTO
    {
        public DateTime WorkStartTime { get; set; }
        public DateTime WorkEndTime { get; set; }

        [Required]
        public int UserId { get; set; }

        public int TaskId { get; set; }
    }
}
