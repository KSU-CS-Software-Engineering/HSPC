using System;
using System.ComponentModel.DataAnnotations;

namespace hspc_api.Models
{
    public class MarkTeamForAnswerDto
    {
        [Required]
        public int TeamId { get; set; }
        [Required]
        public int ProblemId { get; set; }
        [Required]
        public bool Correct { get; set; }
    }
}
