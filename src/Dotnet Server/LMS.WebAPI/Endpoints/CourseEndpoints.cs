using LMS.Models;
using LMS.WebAPI.Services;
using Microsoft.EntityFrameworkCore;

namespace LMS.WebAPI.Endpoints
{
    public static class CourseEndpoints
    {
        public static IEndpointConventionBuilder MapCourseEndpoints(this IEndpointRouteBuilder endpoints)
        {
            var group = endpoints.MapGroup("");

            group.MapGet("course/{id}", GetAsync);
            group.MapGet("courses", GetAllAsync);
            group.MapPost("course", CreateAsync);
            group.MapPut("course", UpdateAsync);
            group.MapDelete("course/{id}", DeleteAsync);

            return group;
        }

        public static Task<Course?> GetAsync(AppDbContext dbContext,
                                             int id,
                                             CancellationToken cancellationToken = default)
            => dbContext.Courses
                .AsNoTracking()
                .SingleOrDefaultAsync(c => c.Id == id, cancellationToken);

        public static async Task<IEnumerable<Course>> GetAllAsync(AppDbContext dbContext,
                                                                  CancellationToken cancellationToken = default)
            => await dbContext.Courses
                .AsNoTracking()
                .ToListAsync(cancellationToken);

        public static async Task<int> CreateAsync(AppDbContext dbContext,
                                                  Course course,
                                                  CancellationToken cancellationToken = default)
        {
            await dbContext.Courses.AddAsync(course, cancellationToken);
            await dbContext.SaveChangesAsync(cancellationToken);
            return course.Id;
        }

        public static async Task UpdateAsync(AppDbContext dbContext,
                                             Course course,
                                             CancellationToken cancellationToken = default)
        {
            dbContext.Courses.Update(course);
            await dbContext.SaveChangesAsync(cancellationToken);
        }

        public static async Task<bool> DeleteAsync(AppDbContext dbContext,
                                                   int id,
                                                   CancellationToken cancellationToken = default)
        {
            var deletedCount = await dbContext.Courses
                                                .Where(c => c.Id == id)
                                                .ExecuteDeleteAsync(cancellationToken);

            return deletedCount == 1;
        }
    }

}
