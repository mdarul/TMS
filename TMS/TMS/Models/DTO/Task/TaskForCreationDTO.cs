using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace TMS.Models.DTO
{
    public class TaskForCreationDTO
    {
        [Required]
        [MaxLength(30)]
        public string Title { get; set; }

        public string Content { get; set; }
        public string Stage { get; set; } = "New";
        public float HoursSpent { get; set; }

        public int? UserId { get; set; }
    }
}
