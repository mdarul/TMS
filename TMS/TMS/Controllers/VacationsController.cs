using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TMS.Models;
using TMS.Models.DTO.Vacation;
using TMS.Services;

namespace TMS.Controllers
{
    [Route("api")]
    public class VacationsController : Controller
    {
        private ISystemRepository _repo;

        public VacationsController(ISystemRepository repo)
        {
            this._repo = repo;
        }

        #region Resource manipulation

        [HttpGet("vacations")]
        public IActionResult GetVacations()
        {
            var vacations = _repo.GetVacations();
            if (vacations == null || !vacations.Any()) return NotFound();

            return Ok(vacations.Select(ModelsMapping.GetVacationeDto));
        }

        [HttpGet("users/{userId}/vacations")]
        public IActionResult GetVacationsForUser(int userId)
        {
            var vacations = _repo.GetVacationsForUser(userId);
            if (vacations == null) return NotFound();

            return Ok(vacations.Select(ModelsMapping.GetVacationeDto));
        }

        [HttpGet("vacations/{vacationId}")]
        public IActionResult GetVacation(int vacationId)
        {
            var vacations = _repo.GetVacation(vacationId);
            if (vacations == null) return NotFound();

            return Ok(ModelsMapping.GetVacationeDto(vacations));
        }

        [HttpPost("vacations")]
        public IActionResult PostVacation([FromBody] VacationForCreationDTO vacationFromRequest)
        {
            if (vacationFromRequest == null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest();

            _repo.AddVacation(ModelsMapping.GetVacationEntity(vacationFromRequest));
            return Ok();
        }

        [HttpPut("vacations/{vacationId}")]
        public IActionResult PutVacation([FromBody] VacationForCreationDTO vacationFromRequest, int vacationId)
        {
            if (vacationFromRequest == null) return NotFound();
            if (!ModelState.IsValid) return BadRequest();

            var vacation = _repo.GetVacation(vacationId);
            ValuesUpdater.UpdateVacationFromDto(vacation, vacationFromRequest);
            _repo.SaveChanges();

            return Ok();
        }

        [HttpDelete("vacations/{vacationId}")]
        public IActionResult DeleteVacation(int vacationId)
        {
            var vacation = _repo.GetVacation(vacationId);
            if (vacation == null) return NotFound();

            _repo.DeleteVacation(vacation);
            return Ok();
        }

        #endregion
    }
}
