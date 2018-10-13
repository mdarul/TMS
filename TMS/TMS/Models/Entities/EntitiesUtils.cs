using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TMS.Models.Entities
{
    public class EntitiesUtils
    {
        public static bool IsDateEmpty(DateTime dateTime)
        {
            DateTime empty = new DateTime();
            if (dateTime.Equals(empty)) return true;
            return false;
        }
    }
}
