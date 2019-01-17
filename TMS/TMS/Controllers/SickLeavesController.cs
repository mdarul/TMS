using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TMS.Models;
using TMS.Models.DTO.SickLeave;
using TMS.Services;

namespace TMS.Controllers
{
    
    [Route("api")]
    public class SickLeavesController : Controller
    {
        private ISystemRepository _repo;

        public SickLeavesController(ISystemRepository repo)
        {
            this._repo = repo;
        }

        #region Resource manipulation

        [HttpGet("sickLeaves")]
        public IActionResult GetSickLeaves()
        {
            var sickLeaves = _repo.GetSickLeaves();
            if (sickLeaves == null || !sickLeaves.Any()) return NotFound();

            return Ok(sickLeaves.Select(ModelsMapping.GetSickLeaveDto));
        }

        [HttpGet("users/{userId}/sickLeaves")]
        public IActionResult GetSickLeavesForUser(int userId)
        {
            var sickLeaves = _repo.GetSickLeavesForUser(userId);
            if (sickLeaves == null) return NotFound();

            return Ok(sickLeaves.Select(ModelsMapping.GetSickLeaveDto));
        }

        [HttpGet("sickLeaves/{sickLeaveId}")]
        public IActionResult GetSickLeave(int sickLeaveId)
        {
            var sickLeave = _repo.GetSickLeave(sickLeaveId);
            if (sickLeave == null) return NotFound();

            return Ok(ModelsMapping.GetSickLeaveDto(sickLeave));
        }

        [HttpPost("sickLeaves")]
        public IActionResult PostSickLeave([FromBody] SickLeaveForCreationDTO sickLeaveFromRequest)
        {
            if (sickLeaveFromRequest == null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest();

            _repo.AddSickLeave(ModelsMapping.GetSickLeaveEntity(sickLeaveFromRequest));
            return Ok();
        }

        [HttpPut("sickLeaves/{sickLeaveId}")]
        public IActionResult PutSickLeave([FromBody] SickLeaveForCreationDTO sickLeaveFromRequest, int sickLeaveId)
        {
            if (sickLeaveFromRequest == null) return NotFound();
            if (!ModelState.IsValid) return BadRequest();

            var sickLeave = _repo.GetSickLeave(sickLeaveId);
            ValuesUpdater.UpdateSickLeaveFromDto(sickLeave, sickLeaveFromRequest);
            _repo.SaveChanges();

            return Ok();
        }

        [HttpDelete("sickLeaves/{sickLeaveId}")]
        public IActionResult DeleteSickLeave(int sickLeaveId)
        {
            var sickLeave = _repo.GetSickLeave(sickLeaveId);
            if (sickLeave == null) return NotFound();

            _repo.DeleteSickLeave(sickLeave);
            return Ok();
        }

        #endregion
    }
}
