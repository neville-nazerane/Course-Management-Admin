using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace LMS.Models
{
    public class Student
    {
        public int Id { get; set; }

        [Required(AllowEmptyStrings = false), MaxLength(100)]
        public required string FirstName { get; set; }

        [Required(AllowEmptyStrings = false), MaxLength(100)]
        public required string LastName { get; set; }

        public required DateTime DateOfBirth { get; set; }

        public required DateTime EnrolledOn { get; set; }

        [Required]
        public int? StudyProgramId { get; set; }

        public StudyProgram? StudyProgram { get; set; }

        public IEnumerable<Enrollment>? Enrollments { get; set; }

    }
}
