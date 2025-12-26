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

            return group;
        }

        public static Task<Student?> GetAsync(AppDbContext dbContext,
                                              int id,
                                              CancellationToken cancellationToken = default)
            => dbContext.Students
                .AsNoTracking()
                .SingleOrDefaultAsync(s => s.Id == id, cancellationToken);

        public static async Task<IEnumerable<Student>> GetAllAsync(AppDbContext dbContext,
                                                                   CancellationToken cancellationToken = default)
            => await dbContext.Students
                .AsNoTracking()
                .ToListAsync(cancellationToken);

        public static async Task<int> CreateAsync(AppDbContext dbContext,
                                                  Student student,
                                                  CancellationToken cancellationToken = default)
        {
            await dbContext.Students.AddAsync(student, cancellationToken);
            await dbContext.SaveChangesAsync(cancellationToken);
            return student.Id;
        }

        public static async Task UpdateAsync(AppDbContext dbContext,
                                             Student student,
                                             CancellationToken cancellationToken = default)
        {
            dbContext.Students.Update(student);
            await dbContext.SaveChangesAsync(cancellationToken);
        }

        public static async Task<bool> DeleteAsync(AppDbContext dbContext,
                                                   int id,
                                                   CancellationToken cancellationToken = default)
        {
            var deletedCount = await dbContext.Students
                                                .Where(s => s.Id == id)
                                                .ExecuteDeleteAsync(cancellationToken);

            return deletedCount == 1;
        }
    }

}
