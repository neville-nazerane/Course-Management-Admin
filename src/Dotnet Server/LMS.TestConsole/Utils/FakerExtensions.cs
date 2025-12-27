using Bogus;
using Bogus.DataSets;
using System;
using System.Collections.Generic;
using System.Text;

namespace LMS.TestConsole.Utils
{
    public static class FakerExtensions
    {

        public static string? MakeTitleByGender(this Faker f)
        {
            var gender = f.Person.Gender;

            var num = f.Random.Number(10);

            if (num < 6)
                return "Dr";
            else return gender == Name.Gender.Male ? "Mr" : "Mrs";
        }

    }
}
