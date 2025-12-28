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



    }
}
