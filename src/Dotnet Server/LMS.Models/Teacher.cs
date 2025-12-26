using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace LMS.Models
{
    public class Teacher
    {
        public int Id { get; set; }

        [Required(AllowEmptyStrings = false), MaxLength(100)]
        public required string FirstName { get; set; }

        [Required(AllowEmptyStrings = false), MaxLength(100)]
        public required string LastName { get; set; }

        [MaxLength(50)]
        public string? Title { get; set; }

        public required DateTime DateOfBirth { get; set; }

        public required DateTime HiredOn { get; set; }

    }
}
