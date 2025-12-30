using LMS.Models;
using LMS.WebAPI.Services;
using Microsoft.EntityFrameworkCore;

namespace LMS.WebAPI.Endpoints
{
    public static class StudentEndpoints
    {
        public static IEndpointConventionBuilder MapStudentEndpoints(this IEndpointRouteBuilder endpoints)
        {
            var group = endpoints.MapGroup("");

            group.MapGet("student/{id}", GetAsync);
            group.MapGet("students", GetAllAsync);
            group.MapPost("student", CreateAsync);
            group.MapPut("student", UpdateAsync);
            group.MapDelete("student/{id}", DeleteAsync);

            group.MapGet("student/{studentId}/enrollments", GetEnrollmentsAsync);

            return group;
        }

        static Task<Student?> GetAsync(AppDbContext dbContext,
                                              int id,
                                              CancellationToken cancellationToken = default)
            => dbContext.Students
                .AsNoTracking()
                .SingleOrDefaultAsync(s => s.Id == id, cancellationToken);

        static async Task<IEnumerable<Student>> GetAllAsync(AppDbContext dbContext,
                                                                   CancellationToken cancellationToken = default)
            => await dbContext.Students
                .AsNoTracking()
                .ToListAsync(cancellationToken);

        static async Task<int> CreateAsync(AppDbContext dbContext,
                                                  Student student,
                                                  CancellationToken cancellationToken = default)
        {
            await dbContext.Students.AddAsync(student, cancellationToken);
            await dbContext.SaveChangesAsync(cancellationToken);
            return student.Id;
        }

        static async Task UpdateAsync(AppDbContext dbContext,
                                             Student student,
                                             CancellationToken cancellationToken = default)
        {
            dbContext.Students.Update(student);
            await dbContext.SaveChangesAsync(cancellationToken);
        }

        static async Task<bool> DeleteAsync(AppDbContext dbContext,
                                                   int id,
                                                   CancellationToken cancellationToken = default)
        {
            var deletedCount = await dbContext.Students
                                                .Where(s => s.Id == id)
                                                .ExecuteDeleteAsync(cancellationToken);

            return deletedCount == 1;
        }

        static async Task<IEnumerable<EnrollmentDisplay>> GetEnrollmentsAsync(AppDbContext dbContext,
                                                                              int studentId,
                                                                              CancellationToken cancellationToken = default)
#pragma warning disable CS8602 // Dereference of a possibly null reference. Required relations can't be null
        {
            var items = await dbContext.Enrollments
                                        .Where(e => e.StudentId == studentId)
                                        .Select(e => new EnrollmentDisplay
                                        {
                                            Id = e.Id,
                                            StudentId = e.StudentId,
                                            StudentName = e.Student.FirstName,
                                            CourseSectionId = e.CourseSectionId,
                                            CourseSectionCode = e.CourseSection.SectionCode,
                                            CourseName = e.CourseSection.Course.Name,
                                            TeacherName = e.CourseSection.Teacher.FirstName
                                        })
                                        .ToListAsync(cancellationToken);

            return items;
        }
#pragma warning restore CS8602 // Dereference of a possibly null reference.
    }

}
