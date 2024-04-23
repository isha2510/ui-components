import { useRef, useState } from 'react';
import './todoList.css';
const TodoList = () => {
    const [task, setTask] = useState("");
    const [todoList, setTodoList] = useState([]);
    const inputRef = useRef();
    const [editMode, setEditMode] = useState(false);
    const [todoId, setTodoId] = useState();

    const debounce = (fn, delay) => {
        let timer;
        return function (...args) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                fn(...args);
            }, delay);
        }
    }
    const handleChange = debounce((e) => {
        setTask(e.target.value)
    }, 1000)

    const handleClick = () => {
        setTodoList(prev => [...prev, task]);
        inputRef.current.value = ""
    }
    const handleEdit = (todo, index) => {
        setEditMode(true);
        setTodoId(index);
        inputRef.current.focus();
        inputRef.current.value = todo;
    }
    const handleDelete = (index) => {
        let arr = [...todoList];
        arr.splice(index, 1);
        setTodoList(arr);
    }
    const handleEditClick = () => {
        let arr=[...todoList];
        arr[todoId]=task;
        setTodoList(arr);
        inputRef.current.value = ""
        setEditMode(false)
    }
    return (
        <div className='container'>
            <h3>Todo List</h3>
            <div className='addTodo'>
                <input type="text" ref={inputRef} onChange={handleChange} />
                <button onClick={editMode ? handleEditClick : handleClick}>{editMode?'Update Todo' : 'Add Todo'}</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th style={{ width: '80%' }}>Task</th>
                        <th style={{ width: '20%' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {todoList.length > 0 &&
                        todoList.map((todo, index) => (
                            <tr key={todo}>
                                <td>{todo}</td>
                                <td className='action'>
                                    <button onClick={() => handleEdit(todo, index)}>✍️</button>
                                    <button onClick={() => handleDelete(index)}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div >
    )
}

export default TodoList;