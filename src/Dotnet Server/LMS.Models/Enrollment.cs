using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace LMS.Models
{
    public class Enrollment
    {
        public int Id { get; set; }

        [Required]
        public int? StudentId { get; set; }

        public Student? Student { get; set; }

        [Required]
        public int? CourseSectionId { get; set; }

        public CourseSection? CourseSection { get; set; }

        public required DateTime EnrolledOn { get; set; }
    }

}
