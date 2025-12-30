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

            group.MapGet("course/{courseId}/sections", GetCourseSectionsAsync);
            group.MapGet("course/section/{courseSectionId}", GetCourseSectionAsync);
            group.MapPost("course/section", AddSectionAsync);
            group.MapPatch("course/section/{courseSectionId}", PatchCourseSectionAsync);
            group.MapDelete("course/section/{courseSectionId}", DeleteCourseSectionAsync);

            return group;
        }

        static Task<Course?> GetAsync(AppDbContext dbContext,
                                             int id,
                                             CancellationToken cancellationToken = default)
            => dbContext.Courses
                .AsNoTracking()
                .SingleOrDefaultAsync(c => c.Id == id, cancellationToken);

        static async Task<IEnumerable<Course>> GetAllAsync(AppDbContext dbContext,
                                                                  CancellationToken cancellationToken = default)
            => await dbContext.Courses
                .AsNoTracking()
                .ToListAsync(cancellationToken);

        static async Task<int> CreateAsync(AppDbContext dbContext,
                                                  Course course,
                                                  CancellationToken cancellationToken = default)
        {
            await dbContext.Courses.AddAsync(course, cancellationToken);
            await dbContext.SaveChangesAsync(cancellationToken);
            return course.Id;
        }

        static async Task UpdateAsync(AppDbContext dbContext,
                                             Course course,
                                             CancellationToken cancellationToken = default)
        {
            dbContext.Courses.Update(course);
            await dbContext.SaveChangesAsync(cancellationToken);
        }

        static async Task<bool> DeleteAsync(AppDbContext dbContext,
                                            int id,
                                            CancellationToken cancellationToken = default)
        {
            var deletedCount = await dbContext.Courses
                                                .Where(c => c.Id == id)
                                                .ExecuteDeleteAsync(cancellationToken);

            return deletedCount == 1;
        }
    
        static async Task<int> AddSectionAsync(AppDbContext dbContext,
                                                CourseSection section,
                                                CancellationToken cancellationToken = default)
        {
            await dbContext.CourseSections.AddAsync(section, cancellationToken);
            await dbContext.SaveChangesAsync(cancellationToken);
            return section.Id;
        }

        static async Task<IEnumerable<CourseSectionDisplay>> GetCourseSectionsAsync(AppDbContext dbContext,
                                                                                    int courseId,
                                                                                    CancellationToken cancellationToken = default)
        {
#pragma warning disable CS8602 // Dereference of a possibly null reference. Required relations can't be null
            var res = await dbContext.CourseSections
                                        .Where(c => c.CourseId == courseId)
                                        .Select(c => new CourseSectionDisplay
                                        {
                                           Id = c.Id,
                                           CourseName = c.Course.Name,
                                           TeacherName = $"{c.Teacher.FirstName} {c.Teacher.LastName}",
                                           SectionCode = c.SectionCode
                                        })
                                        .ToListAsync(cancellationToken);
#pragma warning restore CS8602 // Dereference of a possibly null reference.

            return res;
        }

        static Task<CourseSectionDisplay?> GetCourseSectionAsync(AppDbContext dbContext,
                                                                       int courseSectionId,
                                                                       CancellationToken cancellationToken = default)
#pragma warning disable CS8602 // Dereference of a possibly null reference. Required relations can't be null
            => dbContext.CourseSections
                        .Where(c => c.Id == courseSectionId)
                        .Select(c => new CourseSectionDisplay
                        {
                            Id = c.Id,
                            CourseName = c.Course.Name,
                            TeacherName = $"{c.Teacher.FirstName} {c.Teacher.LastName}",
                            SectionCode = c.SectionCode
                        })
                        .SingleOrDefaultAsync(cancellationToken);
#pragma warning restore CS8602 // Dereference of a possibly null reference.

        static Task<int> DeleteCourseSectionAsync(AppDbContext dbContext,
                                                 int courseSectionId,
                                                 CancellationToken cancellationToken = default)
            => dbContext.CourseSections
                        .Where(c => c.Id == courseSectionId)
                        .ExecuteDeleteAsync(cancellationToken);

        static Task<int> PatchCourseSectionAsync(AppDbContext dbContext,
                                                    int courseSectionId,
                                                    string sectionCode,
                                                    CancellationToken cancellationToken = default)
            => dbContext.CourseSections
                        .Where(c => c.Id == courseSectionId)
                        .ExecuteUpdateAsync(c => c.SetProperty(p => p.SectionCode, sectionCode), cancellationToken: cancellationToken);

    }

}
