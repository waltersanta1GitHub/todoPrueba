using AutoMapper;
using TodoApi.Domain.Models;
using TodoApi.Dtos;

namespace TodoApi;
public class TodoMappingProfile : Profile
{
    public TodoMappingProfile()
    {
        CreateMap<TodoDto,Todo>()
          .ReverseMap();
    }
}

