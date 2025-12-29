using Bogus;
using LMS.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace LMS.TestConsole.Utils
{
    public static class FakerSetupExtensions
    {



        public static Faker<Student> SetupDefaults(this Faker<Student> faker)
        {
            return faker.RuleFor(t => t.FirstName, f => f.Person.FirstName)
                        .RuleFor(t => t.LastName, f => f.Person.LastName)
                        .RuleFor(t => t.DateOfBirth, f => f.Person.DateOfBirth)
                        .RuleFor(t => t.EnrolledOn, f => DateTime.Now.AddRandomPastDays());
        }

        public static Faker<Teacher> SetupDefaults(this Faker<Teacher> faker)
        {
            return faker.RuleFor(t => t.FirstName, f => f.Person.FirstName)
                        .RuleFor(t => t.LastName, f => f.Person.LastName)
                        .RuleFor(t => t.Title, f => f.MakeTitleByGender())
                        .RuleFor(t => t.DateOfBirth, f => f.Person.DateOfBirth)
                        .RuleFor(t => t.HiredOn, f => DateTime.Now.AddRandomPastDays());
        }

        public static Faker<Course> SetupDefaults(this Faker<Course> faker)
        {
            return faker.RuleFor(t => t.Name, f => f.PopRandom(CustomData.CourseNames))
                        .RuleFor(t => t.Description, f => f.Commerce.ProductDescription())
                        .RuleFor(t => t.Code, f => f.Random.AlphaNumeric(6));

        }

        private static TResult PopRandom<TResult>(this Faker faker, ICollection<TResult> data)
        {
            if (data.Count == 0)
                throw new Exception("No more items available");

            var item = faker.Random.CollectionItem(data);
            data.Remove(item);
            return item;
        }

    }
}
