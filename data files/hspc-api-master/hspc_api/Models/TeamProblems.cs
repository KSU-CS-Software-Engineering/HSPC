using System;
using System.ComponentModel.DataAnnotations;

namespace hspc_api.Models
{
    public class TeamProblems
    {
        [Key]
        public int Id { get; set; }

        public Team Team { get; set; }

        public Problem Problem { get; set; }

        public bool? MarkedForJudging { get; set; }

        public bool? Correct { get; set; }

        public int Attempts { get; set; }

    }
}
