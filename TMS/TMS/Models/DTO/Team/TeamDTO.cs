using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TMS.Models.DTO.Team
{
    public class TeamDTO
    {
        [Required]
        public int Id { set; get; }

        public string Name { set; get; }

        public int? ManagerId { get; set; }
    }
}
