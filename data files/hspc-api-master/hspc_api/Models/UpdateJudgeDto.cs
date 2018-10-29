using System;
using System.ComponentModel.DataAnnotations;

namespace hspc_api.Models
{
    public class UpdateJudgeDto
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
