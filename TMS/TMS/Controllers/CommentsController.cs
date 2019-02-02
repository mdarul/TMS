using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using TMS.Models;
using TMS.Models.DTO.Comment;
using TMS.Models.DTO.Vacation;
using TMS.Services;

namespace TMS.Controllers
{
    [Route("api")]
    public class CommentsController : Controller
    {
        private ISystemRepository _repo;

        public CommentsController(ISystemRepository repo)
        {
            this._repo = repo;
        }

        #region Resource manipulation

        [HttpGet("comment")]
        public IActionResult Bla()
        {
            return Ok("dasdas");
        }

        [HttpGet("comments")]
        public IActionResult GetComments()
        {
            var comments = _repo.GetComments();
            if (comments == null || !comments.Any()) return NotFound();

            return Ok(comments.Select(ModelsMapping.GetCommentDto));
        }

        [HttpGet("tasks/{taskId}/comments")]
        public IActionResult GetCommentsForTask(int taskId)
        {
            var comments = _repo.GetComments().Where(o => o.TaskId == taskId).Select(ModelsMapping.GetCommentDto);
            return Ok((comments));
        }

        [HttpGet("comments/{commentId}")]
        public IActionResult GetComment(int commentId)
        {
            var comment = _repo.GetComment(commentId);
            if (comment == null) return NotFound();

            return Ok(ModelsMapping.GetCommentDto(comment));
        }

        [HttpPost("comments")]
        public IActionResult PostComment([FromBody] CommentForCreationDto commentFromRequest)
        {
            if (commentFromRequest == null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest();

            _repo.AddComment(ModelsMapping.GetCommentEntity(commentFromRequest));
            return Ok();
        }

        [HttpPut("comment/{commentId}")]
        public IActionResult PutComment([FromBody] CommentForCreationDto commentFromRequest, int commentId)
        {
            if (commentFromRequest == null) return NotFound();
            if (!ModelState.IsValid) return BadRequest();

            var comment = _repo.GetComment(commentId);
            ValuesUpdater.UpdateCommentFromDto(comment, commentFromRequest);
            _repo.SaveChanges();

            return Ok();
        }

        [HttpDelete("comments/{commentId}")]
        public IActionResult DeleteComment(int commentId)
        {
            var comment = _repo.GetComment(commentId);
            if (comment == null) return NotFound();

            _repo.DeleteComment(comment);
            return Ok();
        }

        #endregion
    }
}
