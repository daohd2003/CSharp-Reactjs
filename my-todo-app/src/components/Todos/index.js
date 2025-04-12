import { useState, useEffect, useRef } from 'react'
import './index.css'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

import {
  getTodosAPI,
  delTodoAPI,
  addTodosAPI,
  editTodosAPI,
} from '../../api/todo'

const Todos = () => {
  const [todos, setTodosAPI] = useState([])
  const [txtBtn, setTxtBtn] = useState('Thêm mới')
  const todoRef = useRef([])

  useEffect(() => {
    featchData()
  }, [])

  const featchData = async () => {
    setTodosAPI(await getTodosAPI())
  }

  const delTodo = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa không?')) {
      await delTodoAPI(id)
      window.location.reload()
    }
  }

  const addOrEditTodo = async (event) => {
    event.preventDefault()
    const val = event.target[0].value
    const id = event.target[1].value
    console.log({
      val,
      id,
    })
    if (id) {
      //Update
      await editTodosAPI({
        id: id,
        name: val,
      })
    } else {
      //Add
      await addTodosAPI({
        name: val,
        isComplete: false,
      })
    }
    featchData()
    event.target[0].value = ''
    event.target[1].value = null
    setTxtBtn('Thêm mới')
    if (id && todoRef.current[id]) {
      todoRef.current[id].className = 'fas fa-edit'
    }
  }

  const editTodo = (id) => {
    todoRef?.current.forEach((item) => {
      if (
        item.getAttribute('data-id') &&
        item.getAttribute('data-id') !== String(id)
      ) {
        item.className = 'fas fa-edit'
      }
    })

    const inputName = document.getElementById('name')
    const inputId = document.getElementById('id')
    if (todoRef?.current[id].className === 'fas fa-edit') {
      todoRef.current[id].className = 'fas fa-user-edit'
      setTxtBtn('Cập nhật')
      inputName.value = todoRef.current[id].getAttribute('data-name')
      inputId.value = id
    } else if (todoRef?.current[id].className === 'fas fa-user-edit') {
      todoRef.current[id].className = 'fas fa-edit'
      inputName.value = ''
      inputId.value = null
      setTxtBtn('Thêm mới')
    }
  }

  const onIsCompleteTodo = async (todo) => {
    if (todo.isCompleted) {
      await editTodosAPI({
        ...todo,
        isCompleted: false
      });
    } else {
      await editTodosAPI({
        ...todo,
        isCompleted: true
      });
    }
    featchData()
  }

  return (
    <main id="todolist">
      <h1>
        Danh sách
        <span>Việc hôm nay không để ngày mai.</span>
      </h1>

      {todos ? (
        todos?.map((item, key) => (
          <li className={item.isCompleted ? 'done' : ''} key={key} onDoubleClick={() => onIsCompleteTodo(item)}>
            <span className="label">{item.name}</span>
            <div className="actions">
              <button
                className="btn-picto"
                type="button"
                onClick={() => editTodo(item.id)}
              >
                <i
                  className="fas fa-edit"
                  ref={(el) => (todoRef.current[item.id] = el)}
                  data-name={item.name}
                  data-id={item.id}
                  data-tooltip-id={`tooltip-${item.id}`}
                  data-tooltip-content={`Sửa: ${item.name}`}
                />
              </button>
              <Tooltip id={`tooltip-${item.id}`} place="top" effect="solid" />
              <button
                className="btn-picto"
                type="button"
                aria-label="Delete"
                title="Delete"
                onClick={() => delTodo(item.id)}
              >
                <i className="fas fa-trash" />
              </button>
            </div>
          </li>
        ))
      ) : (
        <p>Danh sách nhiệm vụ trống.</p>
      )}

      {/* <li className="done">
        <span className="label">123</span>
        <div className="actions">
          <button className="btn-picto" type="button">
            <i className="fas fa-edit" />
          </button>
          <button
            className="btn-picto"
            type="button"
            aria-label="Delete"
            title="Delete"
          >
            <i className="fas fa-trash" />
          </button>
        </div>
      </li>
      <li>
        <span className="label">123</span>
        <div className="actions">
          <button className="btn-picto" type="button">
            <i className="fas fa-user-edit" />
          </button>
          <button
            className="btn-picto"
            type="button"
            aria-label="Delete"
            title="Delete"
          >
            <i className="fas fa-trash" />
          </button>
        </div>
      </li> */}
      <form onSubmit={addOrEditTodo}>
        <label>Thêm nhiệm vụ mới</label>
        <input type="text" name="name" id="name" />
        <input type="text" name="id" id="id" style={{ display: 'none' }} />
        <button type="submit">{txtBtn}</button>
      </form>
    </main>
  )
}
export default Todos
