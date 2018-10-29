using System;
using System.ComponentModel.DataAnnotations;

namespace hspc_api.Models
{
    public class DeleteJudgeDto
    {

        [Required]
        public string Email { get; set; }
    }
}
