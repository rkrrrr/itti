//imports
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Button from "react-bootstrap/Button";
import CrearTodo from "../components/CrearTodo";
import { Collapse } from "react-bootstrap";
import Fade from 'react-bootstrap/Fade';

//Interfaces

interface todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface input {
  title: string;
  completed: boolean;
}

interface Errors {
  numberError : boolean;
  stringError : boolean;
  success : boolean;
  duplicate : boolean;
  delete : boolean;
}

//Main Function 

function App() {
  //estados
  const [todos, setTodos] = useState<todo[]>([]);
  const [open, setOpen] = useState(false);
  const [deleteInput, setDeleteInput] = useState<number>();
  const [input, setInput] = useState<input>({
    title: "",
    completed: false,
  });
  const [errors, setErrors] = useState<Errors>({
    numberError : false,
    stringError : false,
    success : false,
    duplicate : false,
    delete : true
  })



  //useEffect, Uso de funcion que comprueba si el titulo de la tarea contiene numeros
  useEffect(() => {
    if(input.title.match(/\d+/g)){
      setErrors({
        ...errors,
        numberError : true
      })}else{
      setErrors({
        ...errors,
        numberError : false
      })
    }
  }, [input]);
  
  //useEffect, Uso de funcion que trae las tareas de la API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setTodos(json));
  }, []);
  //Funciones

  //Funcion que modifica el estado de la tarea a completada
  const modifyTodo = (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setTodos([
        ...todos.filter((todo) => todo.id !== id),
        {
          ...todo,
          completed: true,
        },
      ]
      )
    }
    console.log(todo)
  };

  // Funcion que elimina la tarea

  const deleteTodo = (e) => {
    e.preventDefault()
    const todo = todos.find((todo) => todo.id === deleteInput);
    if (todo) {
      setTodos([
        ...todos.filter((todo) => todo.id !== deleteInput)
      ]
      )
    }
  };




// funcion que en un principio verifica que el input no contenga un string vacio, luego verifica 
  const createTodo = () =>{
    if(input.title === ""){
      setErrors({
        ...errors,
        stringError : true
      })
      setTimeout(() => {
        setErrors({
          ...errors,
          stringError : false
        })
      }, 3000);
      console.log(errors)
      return
      //verifica si el titulo es el mismo de una tarea ya creada
    }if(todos.find((todo) => todo.title === input.title)){
      setErrors({
        ...errors,
        duplicate : true
      })
      setTimeout(() => {
        setErrors({
          ...errors,
          duplicate : false
        })
      }, 3000);
      console.log(errors)
      return
    }
    // realiza la llamada a la API para crear la tarea y luego la agrega al estado
    fetch('https://jsonplaceholder.typicode.com/todos',{
      method: 'POST',
      body: JSON.stringify({
        title: input.title,
        completed: input.completed
        }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((json) =>{
      if(json){
        setErrors({
          ...errors,
          success : true
        })
        setTimeout(() => {
          setErrors({
            ...errors,
            success : false
          })
        }, 2000);
        setTodos([
          ...todos,
          {
            userId: 1,
            id: todos.length + 1,
            title: input.title,
            completed: input.completed
          }
        ])
        setInput({
          title: "",
          completed: false,
        })
      }
    }
    )
  }
 // funcion que muestra las tareas
  const showTodo = () => {
    const todosSortByNumber = todos.sort((a, b) => a.id - b.id);

    return todosSortByNumber.map((todo) => (
      <div
      className={
        todo.completed
        ? "d-flex w-75 justify-content-between m-auto align-items-center rounded p-2  bg-success "
        : "d-flex w-75 justify-content-between m-auto align-items-center rounded p-2 bg-warning "
      }
      key={todo.id}>
        <div className="w-75">
          <h6>{todo.title}</h6>
          <p>{todo.completed}</p>
          <p>Numero de tarea : {todo.id}</p>
        </div>
        <div className="d-flex flex-nowrap">
          {
            todo.completed?
             <></> :
          <Button onClick={()=>{
            modifyTodo(todo.id)
          }} className="bg-primary m-1">Terminar</Button>
          }
          <Button onClick={()=>{
            setErrors({
              ...errors,
              delete : !errors.delete
            })
          }} className="bg-danger m-1">Eliminar</Button>
        </div>
        
      </div>
    ))
  }


  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="text-center">Tareas por terminar</h2>
        <div className="w-75 d-flex-inline m-auto shadow-sm border rounded-3">
          <h4    className="p-2 text-center"
                 onClick={() => setOpen(!open)}
                 aria-controls="example-collapse-text"
                 aria-expanded={open} 
            >Crear tarea</h4>
          <Collapse in={open}>
            <div id="example-collapse-text">
            <CrearTodo
              input={input}
              setInputs={setInput}
              createTodo={createTodo}
              error = {errors.numberError}
            />
            </div>
          </Collapse>
          
        </div>
        <div className="d-flex gap-2 mt-2 flex-column-reverse">
          {showTodo()}
        </div>
        <div>
          <Fade in={errors.stringError}>
            <div className="alert alert-danger   position-fixed top-0 w-75 text-center" role="alert">
              Debes ingresar un titulo
          </div>
          </Fade>
          <Fade in={errors.success}>
            <div className="alert alert-success   position-fixed top-0 w-75 text-center" role="alert">
              Tarea creada con exito
              </div>
          </Fade>
          <Fade in={errors.numberError}>
              <div className="alert alert-warning   position-fixed top-0 w-75 text-center" role="alert">
              El titulo no puede contener numeros
              </div>
          </Fade>
          <Fade in={errors.duplicate}>
              <div className="alert alert-warning  position-fixed top-0 w-75 text-center" role="alert">
              El titulo no puede ser igual a una tarea ya creada
              </div>
          </Fade>
        </div>
      </div>
          { errors.delete ? <></> :
        <Fade in={errors.delete}>
              <div className="alert alert-danger  position-fixed opacity-100 top-0 w-100  text-center" role="alert">
              <p>Confirma el numero de tarea que quieres eliminar</p>
              <input type="text" onChange={(e)=>{
                setDeleteInput(Number(e.target.value))
              }}  />
              <br />
              <button type="submit" className="btn  btn-danger m-1" onClick={(e)=>{
                deleteTodo(e)
                setErrors({
                  ...errors,
                  delete : !errors.delete
                })
              }}>Eliminar</button>
              <button className="btn btn-primary  m-1 " onClick={()=>{
                setErrors({
                  ...errors,
                  delete : !errors.delete
                })
              }}>Cancelar</button>
              </div>
          </Fade>}
    </>
  );
}

export default App;
