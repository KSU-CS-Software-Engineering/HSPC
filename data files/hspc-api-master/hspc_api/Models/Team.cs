using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace hspc_api.Models
{
    public class Team
    {
        public Team()
        {
        }

        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Beginner { get; set; }
        public bool Advanced { get; set; }
    }
}
