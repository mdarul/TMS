using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TMS.Models.Entities
{
    public class Payment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public User Employee { get; set; }
        public int EmployeeId { get; set; }

        public string ContractType { get; set; }

        public double JobTimePortion { get; set; }

        public double HourlyRate { get; set; }
    }
}
