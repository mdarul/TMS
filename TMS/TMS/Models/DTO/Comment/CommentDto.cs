using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TMS.Models.DTO.Comment
{
    public class CommentDto
    {
        public int Id { get; set; }

        public DateTime CreationTime { get; set; }

        public string Content { get; set; }

        [Required]
        public int UserId { get; set; }
        [Required]
        public int TaskId { get; set; }
    }
}
