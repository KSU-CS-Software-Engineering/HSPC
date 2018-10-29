using System;
using System.ComponentModel.DataAnnotations;

namespace hspc_api.Models
{
    public class CreateTeamDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public bool Beginner { get; set; }
        [Required]
        public bool Advanced { get; set; }    }
}
