using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace LMS.Models
{
    public class Course
    {
        public int Id { get; set; }

        [Required(AllowEmptyStrings = false), MaxLength(150)]
        public required string Name { get; set; }

        [Required(AllowEmptyStrings = false), MaxLength(20)]
        public required string Code { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }

        public IEnumerable<StudyProgramCourse>? StudyProgramCourses { get; set; }

        public IEnumerable<CourseSection>? CourseSections { get; set; }
    }

}
