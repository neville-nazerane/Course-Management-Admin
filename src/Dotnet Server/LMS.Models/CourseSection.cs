using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace LMS.Models
{
    public class CourseSection
    {
        public int Id { get; set; }

        [Required]
        public int? CourseId { get; set; }

        public Course? Course { get; set; }

        [Required]
        public int? TeacherId { get; set; }

        public Teacher? Teacher { get; set; }

        [Required(AllowEmptyStrings = false), MaxLength(20)]
        public required string SectionCode { get; set; }

        public IEnumerable<Enrollment>? Enrollments { get; set; }

    }

}
