namespace TodoApi.Domain.Models;
public class Todo
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public bool IsDone { get; set; }
    public int Priority { get; set; }
}