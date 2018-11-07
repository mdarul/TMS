using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TMS.Models.DTO
{
    public class UserForCreationDTO
    {
        [Required]
        [MaxLength(20)]
        public string Name { get; set; }

        [Required]
        [MaxLength(30)]
        public string Surname { get; set; }

        public int? BossId { get; set; }

        public short Type { get; set; } = 0;

        [Required]
        [MaxLength(15)]
        public string Login { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
