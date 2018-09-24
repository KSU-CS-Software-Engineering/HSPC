using System;
using System.ComponentModel.DataAnnotations;

namespace hspc_api.Models
{
    public class MarkTeamForJudgeDto
    {
        [Required]
        public int TeamId { get; set; }
        [Required]
        public int ProblemId { get; set; }

    }
}
