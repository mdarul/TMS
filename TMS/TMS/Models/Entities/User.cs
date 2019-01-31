using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TMS.Models.Entities
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string Name { get; set; }

        [Required]
        [MaxLength(30)]
        public string Surname { get; set; }

        public short Type { get; set; } = 0;

        public int? TeamId { get; set; }
        public Team Team { get; set; }

        public int? BossId { get; set; }
        public User Boss { get; set; }

        [Required]
        [MaxLength(15)]
        public string Login { get; set; }

        [Required]
        public string Password { get; set; }


        public List<Task> Tasks { get; set; }
        public List<Comment> Comments { get; set; }
        public List<WorkTime> WorkTimes { get; set; }

    }
}
