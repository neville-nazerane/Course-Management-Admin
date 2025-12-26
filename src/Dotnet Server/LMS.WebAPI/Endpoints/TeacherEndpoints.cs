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

            return group;
        }


        public static Task<Teacher?> GetAsync(AppDbContext dbContext,
                                              int id,
                                              CancellationToken cancellationToken = default)
            => dbContext.Teachers
                .AsNoTracking()
                .SingleOrDefaultAsync(t => t.Id == id, cancellationToken);

        public static async Task<IEnumerable<Teacher>> GetAllAsync(AppDbContext dbContext,
                                                                   CancellationToken cancellationToken = default)
            => await dbContext.Teachers
                .AsNoTracking()
                .ToListAsync(cancellationToken);

        public static async Task<int> CreateAsync(AppDbContext dbContext,
                                                  Teacher teacher,
                                                  CancellationToken cancellationToken = default)
        {
            await dbContext.Teachers.AddAsync(teacher, cancellationToken);
            await dbContext.SaveChangesAsync(cancellationToken);
            return teacher.Id;
        }

        public static async Task UpdateAsync(AppDbContext dbContext,
                                             Teacher teacher,
                                             CancellationToken cancellationToken = default)
        {
            dbContext.Teachers.Update(teacher);
            await dbContext.SaveChangesAsync(cancellationToken);
        }

        public static async Task<bool> DeleteAsync(AppDbContext dbContext,
                                                   int id,
                                                   CancellationToken cancellationToken = default)
        {
            var deletedCount = await dbContext.Teachers
                                                .Where(t => t.Id == id)
                                                .ExecuteDeleteAsync(cancellationToken);

            return deletedCount == 1;
        }

    }
}
