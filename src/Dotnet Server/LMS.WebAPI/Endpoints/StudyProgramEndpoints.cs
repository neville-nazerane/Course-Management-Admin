using LMS.Models;
using LMS.WebAPI.Services;
using Microsoft.EntityFrameworkCore;

namespace LMS.WebAPI.Endpoints
{
    public static class StudyProgramEndpoints
    {
        public static IEndpointConventionBuilder MapStudyProgramEndpoints(this IEndpointRouteBuilder endpoints)
        {
            var group = endpoints.MapGroup("study-program");

            group.MapGet("{id}", GetAsync);
            group.MapGet("~/study-programs", GetAllAsync);
            group.MapPost("", CreateAsync);
            group.MapPut("", UpdateAsync);
            group.MapDelete("{id}", DeleteAsync);

            return group;
        }

        public static Task<StudyProgram?> GetAsync(
            AppDbContext dbContext,
            int id,
            CancellationToken cancellationToken = default)
            => dbContext.StudyPrograms
                .AsNoTracking()
                .SingleOrDefaultAsync(p => p.Id == id, cancellationToken);

        public static async Task<IEnumerable<StudyProgram>> GetAllAsync(
            AppDbContext dbContext,
            CancellationToken cancellationToken = default)
            => await dbContext.StudyPrograms
                .AsNoTracking()
                .ToListAsync(cancellationToken);

        public static async Task<int> CreateAsync(
            AppDbContext dbContext,
            StudyProgram studyProgram,
            CancellationToken cancellationToken = default)
        {
            await dbContext.StudyPrograms.AddAsync(studyProgram, cancellationToken);
            await dbContext.SaveChangesAsync(cancellationToken);
            return studyProgram.Id;
        }

        public static async Task UpdateAsync(
            AppDbContext dbContext,
            StudyProgram studyProgram,
            CancellationToken cancellationToken = default)
        {
            dbContext.StudyPrograms.Update(studyProgram);
            await dbContext.SaveChangesAsync(cancellationToken);
        }

        public static async Task<bool> DeleteAsync(
            AppDbContext dbContext,
            int id,
            CancellationToken cancellationToken = default)
        {
            var deletedCount = await dbContext.StudyPrograms
                                                .Where(p => p.Id == id)
                                                .ExecuteDeleteAsync(cancellationToken);

            return deletedCount == 1;
        }
    }

}
