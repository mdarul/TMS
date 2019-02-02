using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TMS.Models;
using TMS.Models.DTO.Payment;
using TMS.Services;

namespace TMS.Controllers
{
    [Route("api")]
    public class PaymentsController: Controller
    {
        private ISystemRepository _repo;

        public PaymentsController(ISystemRepository repo)
        {
            this._repo = repo;
        }

        #region Resource manipulation

        [HttpGet("payments")]
        public IActionResult GetPayments()
        {
            var payments = _repo.GetPayments();
            if (payments == null || !payments.Any()) return NotFound();

            return Ok(payments);
        }

        [HttpGet("payments/{paymentId}")]
        public IActionResult GetPayment(int paymentId)
        {
            var payment = _repo.GetPayment(paymentId);
            if (payment == null) return NotFound();

            return Ok(ModelsMapping.GetPaymentDto(payment));
        }

        [HttpPost("payments")]
        public IActionResult PostPayment([FromBody] PaymentForCreationDTO paymentFromRequest)
        {
            if (paymentFromRequest == null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest();

            _repo.AddPayment(ModelsMapping.GetPaymentEntity(paymentFromRequest));
            return Ok();
        }

        [HttpPut("payments/{paymentId}")]
        public IActionResult PutPayment([FromBody] PaymentForCreationDTO paymentFromRequest, int paymentId)
        {
            if (paymentFromRequest == null) return NotFound();
            if (!ModelState.IsValid) return BadRequest();

            var payment = _repo.GetPayment(paymentId);
            ValuesUpdater.UpdatePaymentFromDto(payment, paymentFromRequest);
            _repo.SaveChanges();

            return Ok();
        }

        [HttpDelete("payments/{paymentId}")]
        public IActionResult DeletePayment(int paymentId)
        {
            var payment = _repo.GetPayment(paymentId);
            if (payment == null) return NotFound();

            _repo.DeletePayment(payment);
            return Ok();
        }

        #endregion
    }
}
