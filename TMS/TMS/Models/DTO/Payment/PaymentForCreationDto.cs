using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TMS.Models.DTO.Payment
{
    public class PaymentForCreationDTO
    {
        public int EmployeeId { get; set; }
        public string contractType { get; set; }
        public double jobTimePortion { get; set; }
        public double HourlyRate { get; set; }
    }
}
