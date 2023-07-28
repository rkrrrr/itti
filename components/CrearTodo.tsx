import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface input {
  title: string;
  completed: boolean;
}

function CrearTodo({input ,setInputs, createTodo, error}: { createTodo:()=> void, input: input, error: boolean ,  setInputs: React.Dispatch<React.SetStateAction<input>>}) {
  
  return (
    <div className=''>
    <Form>
      <Form.Group className="mb-3 p-3" controlId="">
        <Form.Label >Titulo de la tarea</Form.Label>
        <Form.Control
        value={input.title}
        onChange={(e)=>{
          setInputs({
            ...input,
            title: e.target.value
          })
        }} type="text" placeholder="Introduce el titulo de la tarea"/>
      </Form.Group>
        <div className="mb-3 p-3">
        <p>Titulo de la tarea</p>
            <select onChange={(e)=>{
              setInputs({
                ...input,
                completed: e.target.value === '1' ? true : false
              })
            }} name="estado" id="estadoTarea">
                <option value="2">No terminada</option>
                <option value="1">Terminada</option>
            </select>
        </div>
      <Button 
      disabled={error}
      className='m-auto d-block p-3 mb-2'
      onClick={(e)=>{
        e.preventDefault()
        createTodo()
      }} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default CrearTodo;