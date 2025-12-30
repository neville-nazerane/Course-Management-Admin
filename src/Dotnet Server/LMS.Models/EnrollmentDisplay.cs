using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace LMS.Models
{
    public class EnrollmentDisplay
    {

        public int Id { get; set; }

        public int? StudentId { get; set; }

        public string? StudentName { get; set; }

        public int? CourseSectionId { get; set; }
        public string? CourseSectionCode { get; set; }

        public string? CourseName { get; set; }

        public string? TeacherName { get; set; }

    }
}
