import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Button from "react-bootstrap/Button";
import CrearTodo from "../components/CrearTodo";
import { Collapse } from "react-bootstrap";

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

function App() {
  const [todos, setTodos] = useState<todo[]>([]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState<input>({
    title: "",
    completed: false,
  });

  const todosReverse = todos.reverse();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setTodos(json));
  }, []);

  const createTodo = () =>{
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
      setTodos([
        ...todos,
        json
      ])
    }
    )
  }


  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="text-center">Tareas por terminar</h2>
        <div className="w-75 d-flex-inline m-auto border-dark border">
          <h4
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
            />
            </div>
          </Collapse>
          
        </div>
        <div className="d-flex gap-2 mt-2 flex-column-reverse">

        {todosReverse.map((todo) => (
          <div
          className={
            todo.completed
            ? "d-flex w-75 justify-content-between m-auto align-items-center rounded p-2  bg-success "
            : "d-flex w-75 justify-content-between m-auto align-items-center rounded p-2 bg-warning "
          }
          key={todo.id}
          >
            <div className="w-75">
              <h3>{todo.title}</h3>
              <p>{todo.completed ? "Completed" : "Not Completed"}</p>
            </div>
            <div className="d-flex flex-nowrap">
              {
                todo.completed?
              <Button className="bg-primary m-1">Terminar</Button>
              : <></>
              }
              <Button className="bg-danger m-1">Eliminar</Button>
            </div>
          </div>
        ))}
        </div>
      </div>
    </>
  );
}

export default App;
