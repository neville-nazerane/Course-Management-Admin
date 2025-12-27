using System;
using System.Collections.Generic;
using System.Text;

namespace LMS.TestConsole.Utils
{
    public static class DataExtensions
    {

        public static DateTime AddRandomPastDays(this DateTime dateTime, int maxDays = 10) 
            => dateTime.AddDays(-Random.Shared.Next(maxDays));

    }
}
