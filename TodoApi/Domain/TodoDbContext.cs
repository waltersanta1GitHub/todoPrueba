using Microsoft.EntityFrameworkCore;
using TodoApi.Domain.Models;
namespace TodoApi.Domain;
class TodoDbContext : DbContext
{
    public TodoDbContext(DbContextOptions<TodoDbContext> options)
        : base(options) { }

    public DbSet<Todo> Todos => Set<Todo>();
}