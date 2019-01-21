using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TMS.Models.DTO.Payment
{
    public class PaymentDTO
    {
        [Required]
        public int Id { get; set; }
        public string contractType { get; set; }
        public double jobTimePortion { get; set; }
        public double HourlyRate { get; set; }
    }
}
