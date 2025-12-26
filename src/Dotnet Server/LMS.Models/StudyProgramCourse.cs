using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace LMS.Models
{
    public class StudyProgramCourse
    {
        public int Id { get; set; }

        [Required]
        public int? StudyProgramId { get; set; }

        public StudyProgram? StudyProgram { get; set; }

        [Required]
        public int? CourseId { get; set; }

        public Course? Course { get; set; }
    }

}
