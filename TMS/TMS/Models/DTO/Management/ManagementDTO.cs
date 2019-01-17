using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TMS.Models.DTO.Management
{
    public class ManagementDTO
    {
        public int Id { get; set; }

        public int ManagerId { get; set; }

        public int? TeamId { get; set; }
    }
}
