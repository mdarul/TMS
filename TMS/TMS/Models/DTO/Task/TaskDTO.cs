using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace TMS.Models
{
    public class TaskDTO
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(30)]
        public string Title { get; set; }

        public string Content { get; set; }
        public string Stage { get; set; } = "New";
        public float HoursSpent { get; set; }

        public int? UserId { get; set; }
    }
}
