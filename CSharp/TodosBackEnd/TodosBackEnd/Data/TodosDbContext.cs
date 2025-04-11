using Microsoft.EntityFrameworkCore;
using TodosBackEnd.Configuration;
using TodosBackEnd.Seeders;
using TodosBackEnd.Models;

namespace TodosBackEnd.Data
{
    public class TodosDbContext : DbContext
    {
        public TodosDbContext(DbContextOptions<TodosDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new TodoConfiguration());

            modelBuilder.Seed();
        }

        public DbSet<Todo> Todos { get; set; } = null!;
    }
}
