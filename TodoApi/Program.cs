using Microsoft.EntityFrameworkCore;
using TodoApi;
using TodoApi.Domain;
using TodoApi.Domain.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<TodoDbContext>(opt => opt.UseInMemoryDatabase("TodoList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "TodoAPI";
    config.Title = "TodoAPI v1";
    config.Version = "v1";
});
builder.Services.AddAutoMapper(config =>
{
    config.AddProfile(new TodoMappingProfile());
});
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi(config =>
    {
        config.DocumentTitle = "TodoAPI";
        config.Path = "/swagger";
        config.DocumentPath = "/swagger/{documentName}/swagger.json";
        config.DocExpansion = "list";
    });
}

app.MapGet("/todoitems", async (TodoDbContext db) =>
    await db.Todos.ToListAsync());

app.MapGet("/todoitems/reordenarmasprioritario", async (TodoDbContext db) =>
    await db.Todos.Where(t => !t.IsDone).OrderBy(x =>x.Priority).ToListAsync());

app.MapGet("/todoitems/reordenarmenosprioritario", async (TodoDbContext db) =>
    await db.Todos.Where(t => !t.IsDone).OrderByDescending(x =>x.Priority).ToListAsync());

app.MapGet("/todoitems/listar/hecho", async (TodoDbContext db) =>
    await db.Todos.Where(t => t.IsDone).ToListAsync());

app.MapGet("/todoitems/listar/todos", async (TodoDbContext db) =>
    await db.Todos.ToListAsync());
           

app.MapPost("/todoitems/insertar", async (Todo todo, TodoDbContext db) =>
{
    db.Todos.Add(todo);
    await db.SaveChangesAsync();

    return Results.Created($"/todoitems/{todo.Id}", todo);
});

app.MapPut("/todoitems/marcarhecho/{id}", async (int id, Todo inputTodo, TodoDbContext db) =>
{
    var todo = await db.Todos.FindAsync(id);

    if (todo is null) return Results.NotFound();

    todo.Name = inputTodo.Name;
    todo.IsDone = inputTodo.IsDone;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.Run();
