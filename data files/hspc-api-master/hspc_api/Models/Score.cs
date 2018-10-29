using System;
using System.Collections.Generic;

namespace hspc_api.Models
{
    public class Score
    {
        public Score()
        {
        }

        public Team Team { get; set; }

        public List<TeamProblems> Problems { get; set; }

        public int TotalPoints { get; set; }
    }
}
