using System;
using System.Collections.Generic;
using System.Text;

namespace LMS.Models
{
    public class CourseSectionDisplay
    {

        public int Id { get; set; }

        public required string CourseName { get; set; }
        public int CourseId { get; set; }

        public required string TeacherName { get; set; }
        public int TeacherId { get; set; }

        public required string SectionCode { get; set; }

    }
}
