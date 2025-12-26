using LMS.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace LMS.WebAPI.Services
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Teacher> Teachers => Set<Teacher>();

        public DbSet<Student> Students => Set<Student>();

        public DbSet<StudyProgram> StudyPrograms => Set<StudyProgram>();

        public DbSet<Course> Courses => Set<Course>();

        public DbSet<CourseSection> CourseSections => Set<CourseSection>();

        public DbSet<Enrollment> Enrollments => Set<Enrollment>();

        public DbSet<StudyProgramCourse> StudyProgramCourses => Set<StudyProgramCourse>();
    }

}
