using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Net.Mail;
using System.Text.RegularExpressions;

namespace hspc_api.Models
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }

        [Required]
        [RegularExpression(@"^(?=.*[a-z|A-Z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).{6,100}", ErrorMessage = "Password requires upper case, lower case, number, special character, and a mininmum length of 6.")]
        public string Password { get; set; }

    }
}
