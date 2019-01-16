using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TMS.Models.Entities
{
    public class Team
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { set; get; }

        public string Name { set; get; }

        public int? ManagerId { get; set; }
        public User Manager { get; set; }

        public List<User> Members { get; set; }
    }
}
