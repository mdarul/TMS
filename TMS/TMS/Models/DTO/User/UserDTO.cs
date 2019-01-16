using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace TMS.Models
{
    public class UserDTO
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string Name { get; set; }

        [Required]
        [MaxLength(30)]
        public string Surname { get; set; }

        public int? TeamId { get; set; }

        public int? BossId { get; set; }

        public short Type { get; set; } = 0;

        [Required]
        [MaxLength(15)]
        public string Login { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
