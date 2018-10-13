using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using TMS.Models;
using TMS.Models.DTO;
using TMS.Services;

namespace TMS.Controllers
{    

    [Route("api/users")]
    public class UsersController: Controller
    {
        private ISystemRepository _repo;

        public UsersController(ISystemRepository repo)
        {
            this._repo = repo;
        }

        #region Resources manipulation

        [HttpGet()]
        public IActionResult GetUsers()
        {
            return Ok(_repo.GetUsers().Select(o => ModelsMapping.GetUserDto(o)));
        }

        [HttpGet("{userId}")]
        public IActionResult GetUser(int userId)
        {
            var user = _repo.GetUser(userId);
            if (user == null) return NotFound();

            return Ok(ModelsMapping.GetUserDto(user));
        }

        [HttpPost]
        public IActionResult AddUser([FromBody] UserForCreationDTO userFromRequest)
        {
            if (userFromRequest == null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest();

            _repo.AddUser(ModelsMapping.GetUserEntity(userFromRequest));
            return Ok();
        }

        [HttpPatch("{userId}")]
        public IActionResult PatchUser(int userId, [FromBody] JsonPatchDocument<UserForPartialUpdateDTO> patchDocument)
        {
            var userToUpdate = _repo.GetUser(userId);
            if (userToUpdate == null) return BadRequest();

            var userWithUpdatedValues = ModelsMapping.GetUserForPartialUpdateDto(userToUpdate);
            patchDocument.ApplyTo(userWithUpdatedValues);
            if (!ModelState.IsValid) return BadRequest();

            ValuesUpdater.ApplyPatchToUserEntity(userToUpdate, userWithUpdatedValues);
            _repo.SaveChanges();

            return Ok();
        }

        [HttpDelete("{userId}")]
        public IActionResult DeleteUser(int userId)
        {
            var user = _repo.GetUser(userId);
            if (user == null) return NotFound();
            _repo.DeleteUser(user);

            return Ok();
        }

        #endregion

        [HttpGet("checkCredentials/{login}/{password}")]
        public IActionResult CheckUserCredentials(string login, string password)
        {
            var user = _repo.GetUsers().FirstOrDefault(o => o.Login == login);
            if (user == null) return NotFound();

            if (user.Password != password) ModelState.AddModelError("PasswordErrorMsg", "Incorrect password");
            if (!ModelState.IsValid) return BadRequest(ModelState);

            return Ok(user);
        }
    }
}
