using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TMS.Models;
using TMS.Models.DTO.Team;
using TMS.Services;

namespace TMS.Controllers
{
    [Route("api")]
    public class TeamsController: Controller
    {
        private ISystemRepository _repo;

        public TeamsController(ISystemRepository repo)
        {
            this._repo = repo;
        }

        #region Resource manipulation

        [HttpGet("teams")]
        public IActionResult GetTeams()
        {
            var teams = _repo.GetTeams();
            if (teams == null || !teams.Any()) return NotFound();

            return Ok(teams.Select(ModelsMapping.GetTeamDto));
        }

        [HttpGet("teams/{teamId}")]
        public IActionResult GetTeam(int teamId)
        {
            var team = _repo.GetTeam(teamId);
            if (team == null) return NotFound();

            return Ok(ModelsMapping.GetTeamDto(team));
        }

        [HttpPost("teams")]
        public IActionResult PostTeam([FromBody] TeamForCreationDTO teamFromRequest)
        {
            if (teamFromRequest == null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest();

            _repo.AddTeam(ModelsMapping.GetTeamEntity(teamFromRequest));
            return Ok();
        }

        [HttpPut("teams/{teamId}")]
        public IActionResult PutTeam([FromBody] TeamForCreationDTO teamFromRequest, int teamId)
        {
            if (teamFromRequest == null) return NotFound();
            if (!ModelState.IsValid) return BadRequest();

            var team = _repo.GetTeam(teamId);
            ValuesUpdater.UpdateTeamFromDto(team, teamFromRequest);
            _repo.SaveChanges();

            return Ok();
        }

        [HttpDelete("teams/{teamId}")]
        public IActionResult DeleteTeam(int teamId)
        {
            var team = _repo.GetTeam(teamId);
            if (team == null) return NotFound();

            _repo.DeleteTeam(team);
            return Ok();
        }

        #endregion
    }
}
