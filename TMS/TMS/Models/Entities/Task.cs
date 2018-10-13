using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TMS.Models.Entities
{
    public class Task
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(30)]
        public string Title { get; set; }

        public string Content { get; set; }
        public string Stage { get; set; } = "New";
        public float HoursSpent { get; set; }

        public int? UserId { get; set; }
        public User User { get; set; }

        public List<WorkTime> WorkTimes { get; set; }
    }
}
