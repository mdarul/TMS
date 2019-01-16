using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TMS.Models.DTO.Team
{
    public class TeamForCreationDTO
    {
        public string Name { set; get; }

        public int? ManagerId { get; set; }
    }
}
