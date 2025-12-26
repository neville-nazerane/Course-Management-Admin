using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace LMS.Models
{

    [PrimaryKey(nameof(StudyProgramId), nameof(CourseId))]
    public class StudyProgramCourse
    {
        [Required]
        public int? StudyProgramId { get; set; }

        public StudyProgram? StudyProgram { get; set; }

        [Required]
        public int? CourseId { get; set; }

        public Course? Course { get; set; }
    }

}
