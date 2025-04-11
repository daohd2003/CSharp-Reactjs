using Microsoft.EntityFrameworkCore;
using TodosBackEnd.Models;

namespace TodosBackEnd.Seeders
{
    public static class DatabaseSeeder
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Todo>()
                .HasData(
                    new Todo { Id = 1, Name = "Learn ASP.NET Core", IsCompleted = false },
                    new Todo { Id = 2, Name = "Build a REST API", IsCompleted = false },
                    new Todo { Id = 3, Name = "Deploy to Azure", IsCompleted = false }
                );
        }
    }
}
