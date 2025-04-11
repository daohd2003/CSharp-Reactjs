using TodosBackEnd.Models;

namespace TodosBackEnd.Service.Todos
{
    public interface ITodosService
    {
        List<Todo> GetTodos();
        Todo GetTodo(int id);
        Boolean AddTodo(Todo todo);
        Boolean UpdateTodo(Todo todo);
        Boolean DeleteTodo(int id);
    }
}
