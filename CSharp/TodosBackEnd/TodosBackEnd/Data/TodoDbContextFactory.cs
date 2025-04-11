using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace TodosBackEnd.Data
{
    public class TodoDbContextFactory : IDesignTimeDbContextFactory<TodosDbContext>
    {
        public TodosDbContext CreateDbContext(string[] args)
        {
            IConfiguration configurationRoot = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var connectionString = configurationRoot.GetConnectionString("TodosDatabase");

            var optionsBuilder = new DbContextOptionsBuilder<TodosDbContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new TodosDbContext(optionsBuilder.Options);
        }
    }
}
