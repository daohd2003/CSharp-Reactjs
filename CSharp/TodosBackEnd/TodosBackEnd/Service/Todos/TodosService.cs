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

        public bool UpdateTodo(Todo updatedTodo)
        {
            if (updatedTodo == null) return false;

            var existingTodo = _context.Todos.Find(updatedTodo.Id);
            if (existingTodo == null) return false;

            // Lấy tất cả properties của Todo
            var properties = typeof(Todo).GetProperties();

            foreach (var property in properties)
            {
                // Không update Id (vì là khóa chính)
                if (property.Name == "Id") continue;

                var newValue = property.GetValue(updatedTodo);
                var oldValue = property.GetValue(existingTodo);

                // Chỉ update nếu giá trị thay đổi
                if (!Equals(oldValue, newValue))
                {
                    property.SetValue(existingTodo, newValue);
                }
            }

            return _context.SaveChanges() > 0;
        }
    }
}
