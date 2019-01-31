using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TMS.Models.DTO.Comment
{
    public class CommentForCreationDto
    {
        public DateTime CreationTime { get; set; }

        public string Content { get; set; }

        [Required]
        public int UserId { get; set; }
        [Required]
        public int TaskId { get; set; }
    }
}
