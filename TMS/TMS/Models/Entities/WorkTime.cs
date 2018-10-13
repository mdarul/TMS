using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TMS.Models.Entities
{
    public class WorkTime
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public DateTime WorkStartTime { get; set; }
        public DateTime WorkEndTime { get; set; }

        [Required]
        public int UserId { get; set; }
        public User User { get; set; }

        public int TaskId { get; set; }
        public Task Task { get; set; }
    }
}
