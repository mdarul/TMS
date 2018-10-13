﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TMS.Models.Entities
{
    public class SystemContext: DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<WorkTime> WorkTimes { get; set; }

        public SystemContext(DbContextOptions<SystemContext> options) : base(options)
        {
//            Database.EnsureCreated();
        }
    }
}
