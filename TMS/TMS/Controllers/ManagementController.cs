using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TMS.Models;
using TMS.Models.DTO.Management;
using TMS.Services;

namespace TMS.Controllers
{
    [Route("api")]
    public class ManagementController: Controller
    {
        private ISystemRepository _repo;

        public ManagementController(ISystemRepository repo)
        {
            this._repo = repo;
        }

        #region Resource manipulation

        [HttpGet("management")]
        public IActionResult GetManagements()
        {
            var managements = _repo.GetManagers();
            if (managements == null || !managements.Any()) return NotFound();

            return Ok(managements.Select(ModelsMapping.GetManagementDto));
        }

        [HttpGet("management/{managementId}")]
        public IActionResult GetManagement(int managementId)
        {
            var manager = _repo.GetManager(managementId);
            if (manager == null) return NotFound();

            return Ok(ModelsMapping.GetManagementDto(manager));
        }

        [HttpPost("management")]
        public IActionResult PostManagement([FromBody] ManagementForCreationDTO managementFromRequest)
        {
            if (managementFromRequest == null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest();

            _repo.AddManager(ModelsMapping.GetManagementEntity(managementFromRequest));
            return Ok();
        }

        [HttpPut("management/{managementId}")]
        public IActionResult PutManagement([FromBody] ManagementForCreationDTO managementFromRequest, int managementId)
        {
            if (managementFromRequest == null) return NotFound();
            if (!ModelState.IsValid) return BadRequest();

            var management = _repo.GetManager(managementId);
            ValuesUpdater.UpdateManagementFromDto(management, managementFromRequest);
            _repo.SaveChanges();

            return Ok();
        }

        [HttpDelete("management/{managementId}")]
        public IActionResult DeleteManagement(int managementId)
        {
            var manager = _repo.GetManager(managementId);
            if (manager == null) return NotFound();

            _repo.DeleteManager(manager);
            return Ok();
        }

        #endregion
    }
}
