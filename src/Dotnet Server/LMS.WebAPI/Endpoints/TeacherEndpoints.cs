using LMS.Models;
using LMS.WebAPI.Services;
using Microsoft.EntityFrameworkCore;

namespace LMS.WebAPI.Endpoints
{
    public static class TeacherEndpoints
    {

        public static IEndpointConventionBuilder MapTeacherEndpoints(this IEndpointRouteBuilder endpoints)
        {
            var group = endpoints.MapGroup("");

            group.MapGet("teacher/{id}", GetAsync);
            group.MapGet("teachers", GetAllAsync);
            group.MapPost("teacher", CreateAsync);
            group.MapPut("teacher", UpdateAsync);
            group.MapDelete("teacher/{id}", DeleteAsync);

            group.MapGet("teacher/{teacherId}/courseSections", GetCourseSectionsAsync);

            return group;
        }


        static Task<Teacher?> GetAsync(AppDbContext dbContext,
                                              int id,
                                              CancellationToken cancellationToken = default)
            => dbContext.Teachers
                .AsNoTracking()
                .SingleOrDefaultAsync(t => t.Id == id, cancellationToken);

        static async Task<IEnumerable<Teacher>> GetAllAsync(AppDbContext dbContext,
                                                                   CancellationToken cancellationToken = default)
            => await dbContext.Teachers
                .AsNoTracking()
                .ToListAsync(cancellationToken);

        static async Task<int> CreateAsync(AppDbContext dbContext,
                                                  Teacher teacher,
                                                  CancellationToken cancellationToken = default)
        {
            await dbContext.Teachers.AddAsync(teacher, cancellationToken);
            await dbContext.SaveChangesAsync(cancellationToken);
            return teacher.Id;
        }

        static async Task UpdateAsync(AppDbContext dbContext,
                                             Teacher teacher,
                                             CancellationToken cancellationToken = default)
        {
            dbContext.Teachers.Update(teacher);
            await dbContext.SaveChangesAsync(cancellationToken);
        }

        static async Task<bool> DeleteAsync(AppDbContext dbContext,
                                            int id,
                                            CancellationToken cancellationToken = default)
        {
            var deletedCount = await dbContext.Teachers
                                                .Where(t => t.Id == id)
                                                .ExecuteDeleteAsync(cancellationToken);

            return deletedCount == 1;
        }

        static async Task<IEnumerable<CourseSectionDisplay>> GetCourseSectionsAsync(AppDbContext dbContext,
                                                                                    int teacherId,
                                                                                    CancellationToken cancellationToken = default)
        {
#pragma warning disable CS8602 // Dereference of a possibly null reference. Required relations can't be null
            var res = await dbContext.CourseSections
                                        .Where(c => c.TeacherId == teacherId)
                                        .Select(c => new CourseSectionDisplay
                                        {
                                            Id = c.Id,
                                            CourseId = c.CourseId ?? 0,
                                            CourseName = c.Course.Name,
                                            TeacherId = c.TeacherId ?? 0,
                                            TeacherName = $"{c.Teacher.FirstName} {c.Teacher.LastName}",
                                            SectionCode = c.SectionCode
                                        })
                                        .ToListAsync(cancellationToken);
#pragma warning restore CS8602 // Dereference of a possibly null reference.

            return res;
        }


    }
}
