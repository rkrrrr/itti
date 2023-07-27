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

function App() {
  const [todos, setTodos] = useState<todo[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setTodos(json));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="text-center">Tareas por terminar</h2>
        <div className="w-75 d-flex-inline m-auto bg-success">
          <h4>Crear tarea</h4>
          <CrearTodo />
        </div>
        {todos.map((todo) => (
          <div
            className={
              todo.completed
                ? "d-flex w-75 justify-content-between m-auto align-items-center border border-primary p-2"
                : "d-flex w-75 justify-content-between m-auto align-items-center border border-primary p-2 bg-warning"
            }
            key={todo.id}
          >
            <div className="w-75">
              <h3>{todo.title}</h3>
              <p>{todo.completed ? "Completed" : "Not Completed"}</p>
            </div>
            <div>
              <Button className="bg-primary m-1">Terminar</Button>
              <Button className="bg-danger m-1">Eliminar</Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
