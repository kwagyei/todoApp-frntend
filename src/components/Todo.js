import React, { useState, useEffect} from 'react'
import axios from 'axios'
// import { useLocation } from 'react-router-dom';


function Todo() {

    const [listOfTodosFromDb,setlistOfTodosFromDb] = useState([])

    useEffect( () => {
  
      axios.get("http://localhost:3001/todoList").then((response) => {
        setlistOfTodosFromDb(response.data)
      })
  
    }, [] )



    const [todo,setTodo] = useState({

            todoName : "",
            todoDate : ""
        }
    )

    const [todoList, setTodoList] = useState([])




    const [editIndex, seteditIndex] = useState(null)


    const addItem = () => {
        if (todo.todoName.trim() !== '' && todo.todoDate.trim() !== '') {
            if (editIndex !== null ) {

                const updatedList = [...todoList];
                updatedList[editIndex] = todo;
                setTodoList(updatedList);
                seteditIndex(null)

            } else {
                setTodoList( [...todoList, todo])
            }
            
          setTodo({
            todoName: '',
            todoDate: '',
          })

        }
      };

  

    const handleInput = (event) => {

        setTodo(prev => ({...prev, [event.target.name] : event.target.value }))

    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // console.log(todo)
        addItem(todo)   
    }

    const handleRemove = (index) => {
        const updatedList = [...todoList];
        updatedList.splice(index, 1);
        setTodoList(updatedList);
    }

    const handleEdit = (index) => {
        setTodo(todoList[index])
        seteditIndex(index)
    }

    //Using the useLocation hook to grab data from the 'parent component'
    
//     const { state } = useLocation()
//     const loginDetails = state && state.loginData

//     if (!loginDetails) {
//         // Handle the case where the user directly navigates to this page without submitting the form
//         return <div>No data received. Go back to the form and submit.</div>;
//    }
    


   return (
    <div className='container mt-5'>
      {/* <h3 className='text-center'>Hello {loginDetails.email}</h3> */}
      <div className='container mt-3 align-items-center justify-content-center'>
        <form onSubmit={handleSubmit}>
          <div className='mb-3 row align-items-center justify-content-center'>
            <label className='col-md-2 col-form-label text-md-end' htmlFor='todoName'>
              Task
            </label>
            <div className='col-md-10'>
              <input
                className='form-control'
                type='text'
                name='todoName'
                value={todo.todoName}
                onChange={handleInput}
              />
            </div>
            <label htmlFor='todoDate' className='col-md-2 text-md-end'>
              Due date
            </label>
            <div className='col-md-10'>
              <input
                className='form-control'
                type='date'
                name='todoDate'
                value={todo.todoDate}
                onChange={handleInput}
              />
            </div>
          </div>
          <div className='text-center'>
            <button type='submit' className='btn btn-outline-primary'>
              { editIndex !== null ? "Edit Todo" : "Add Todo"}
            </button>
          </div>
        </form>
      </div>

      <div className='mt-3'>
        {todoList.map((item, index) => (
          <div className='container mb-3 bg-light p-3 rounded' key={index}>
            <div>
              <h4>{item.todoName}</h4>
            </div>
            <div>
              <p>{item.todoDate}</p>
            </div>
            <div className='text-end'>
            <button onClick={() => handleEdit(index)} className='btn btn-info me-1'>
                Edit
              </button>
              <button onClick={() => handleRemove(index)} className='btn btn-danger'>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Todo