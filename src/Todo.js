import React, { useState, useEffect} from 'react'
import axios from 'axios'
// import { useLocation } from 'react-router-dom';


function Todo() {

    const [listOfTodosFromDb,setlistOfTodosFromDb] = useState([])

    const [todo,setTodo] = useState({

          todoTask : "",
          todoDate : ""
      })
     
    //const [todoList, setTodoList] = useState([])

    const [editIndex, seteditIndex] = useState(null)



    useEffect( () => {

      fetchTodoListFromDB()

    }, [])

    const fetchTodoListFromDB = async () => {

      await axios.get("https://todo-app-kwagyei-7f678d5987d6.herokuapp.com/todoList").then((response) => {
        setlistOfTodosFromDb(response.data)
        //console.log(listOfTodosFromDb)
      })
    }

    const addTodoToDB = async () => {

      await axios.post("https://todo-app-kwagyei-7f678d5987d6.herokuapp.com/todoList",todo).then((response) => {

      fetchTodoListFromDB()

      console.log('task  added')
      })
      

    }

    const deleteTodoFromDB = async (itemId) => {

      await axios.delete(`https://todo-app-kwagyei-7f678d5987d6.herokuapp.com/todoList/${itemId}`).then( (response) => {

      console.log("Item has been removed")

      fetchTodoListFromDB()

      })

    }

    const editTodoItemInDB = async (itemId) => {
      const newItem = todo; // Replace with your new item data
  
      try {
        const response = await axios.put(`https://todo-app-kwagyei-7f678d5987d6.herokuapp.com/todoList/replace/${itemId}`, newItem).then( (response) => {

        console.log("Item has been replaced")

        fetchTodoListFromDB()

        })
  
        if (response.ok) {
          console.log('Todo item replaced successfully');
          
          // Optionally, you can fetch and update the todo list here
        } else {
          console.error('Failed to replace todo item');
        }
      } catch (error) {
        console.error('Error:', error);

      } }
    

    const addItem = () => {
        if (todo.todoTask.trim() !== '' && todo.todoDate.trim() !== '') {
            if (editIndex !== null ) {

                editTodoItemInDB(editIndex)

                seteditIndex(null)

                // const updatedList = [...todoList];
                // updatedList[editIndex] = todo;
                // setTodoList(updatedList);

            } else {

              addTodoToDB()

             //setTodoList( [...todoList, todo])
              // POST REQUEST, send the todo item to the database
            }
            
          setTodo({
            todoTask: '',
            todoDate: '',
          })

        }
      };

  
/////FORM HANDLERS
    const handleInput = (event) => {

      setTodo(prev => ({...prev, [event.target.name] : event.target.value }))

    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // console.log(todo)
        addItem(todo)   

    }

    const handleRemove = (itemId) => {
       
      deleteTodoFromDB(itemId)

       // const updatedList = [...todoList];
        // updatedList.splice(index, 1);
        // setTodoList(updatedList);

    }

    const handleEdit = (index, itemId) => {
        setTodo(listOfTodosFromDb[index])
        seteditIndex(itemId)
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
            <label className='col-md-2 col-form-label text-md-end' htmlFor='todoTask'>
              Task
            </label>
            <div className='col-md-10'>
              <input
                className='form-control'
                type='text'
                name='todoTask'
                value={todo.todoTask}
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
        {listOfTodosFromDb.map((item, index) => (
          <div className='container mb-3 bg-light p-3 rounded' key={index}>
            <div>
              <h4>{item.todoTask}</h4>
            </div>
            <div>
              <p>{item.todoDate}</p>
            </div>
            <div className='text-end'>
            <button onClick={() => handleEdit(index, item.id)} className='btn btn-info me-1'>
                Edit
              </button>
              <button onClick={() => handleRemove(item.id)} className='btn btn-danger'>
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