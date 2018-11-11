using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Isopoh.Cryptography.Argon2;
using Isopoh.Cryptography.SecureArray;
using Microsoft.AspNetCore.Identity;
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
            userFromRequest.Password = GetPasswordHash(userFromRequest.Password);

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

            if (!CheckPasswordCorectness(password, user.Password))
            {
                ModelState.AddModelError("PasswordErrorMsg", "Incorrect password");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(user);
        }
        
        [HttpGet("replacePassword/{login}/{oldPassword}/{newPassword}")]
        public IActionResult ReplaceUserPassword(string login, string oldPassword, string newPassword)
        {
            var user = _repo.GetUsers().FirstOrDefault(o => o.Login == login);
            if (user == null) return NotFound();

            if (!CheckPasswordCorectness(oldPassword, user.Password))
            {
                ModelState.AddModelError("PasswordErrorMsg", "Incorrect current password");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            user.Password = GetPasswordHash(newPassword);
            _repo.SaveChanges();

            return Ok(user);
        }

        private string GetPasswordHash(string password)
        {
            byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
            byte[] salt = new byte[8];

            RandomNumberGenerator Rng = RandomNumberGenerator.Create();
            Rng.GetBytes(salt);

            var config = new Argon2Config
            {
                Type = Argon2Type.DataIndependentAddressing,
                TimeCost = 5,
                MemoryCost = 16384,
                Password = passwordBytes,
                Salt = salt
            };
            var argon2A = new Argon2(config);
            using (SecureArray<byte> hashA = argon2A.Hash())
            {
                return config.EncodeString(hashA.Buffer);
            }
        }

        private bool CheckPasswordCorectness(string password, string hashPasswordFromDb)
        {
            var passwordBytes = Encoding.UTF8.GetBytes(password);

            if (Argon2.Verify(hashPasswordFromDb, passwordBytes))
            {
                return true;
            }

            return false;
        }

        [HttpGet("hash")]
        public IActionResult HashPasswords()
        {

            var users = _repo.GetUsers();
            foreach (var user in users)
            {
                user.Password = GetPasswordHash(user.Password);
            }
            _repo.SaveChanges();
            return Ok();
        }
    }
}
