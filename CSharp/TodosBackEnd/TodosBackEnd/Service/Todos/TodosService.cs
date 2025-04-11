using TodosBackEnd.Data;
using TodosBackEnd.Models;

namespace TodosBackEnd.Service.Todos
{
    public class TodosService : ITodosService
    {
        private readonly TodosDbContext _context;
        public TodosService(TodosDbContext context)
        {
            _context = context;
        }

        public bool AddTodo(Todo todo)
        {
            _context.Todos.Add(todo);
            return _context.SaveChanges() > 0;
        }

        public bool DeleteTodo(int id)
        {
            var todo = _context.Todos.Find(id);
            if (todo == null) return false;

            _context.Todos.Remove(todo);
            return _context.SaveChanges() > 0;
        }

        public Todo GetTodo(int id)
        {
            return _context.Todos.Find(id);
        }

        public List<Todo> GetTodos()
        {
            return _context.Todos.ToList();
        }

        public bool UpdateTodo(Todo todo)
        {
            var existTodo = _context.Todos.Find(todo.Id);
            if (existTodo == null) return false;
            if(existTodo.Name == todo.Name)
            {
                return false;
            }
            _context.Todos.Update(todo);
            return _context.SaveChanges() > 0;
        }
    }
}
