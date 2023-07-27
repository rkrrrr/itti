import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function CrearTodo() {
  return (
    <div className=''>
    <Form>
      <Form.Group className="mb-3 p-3" controlId="">
        <Form.Label>Titulo de la tarea</Form.Label>
        <Form.Control type="text" placeholder="Introduce el titulo de la tarea"/>
      </Form.Group>
        <div className="mb-3 p-3">
        <p>Titulo de la tarea</p>
            <select name="estado" id="estadoTarea">
                <option value="1">Terminada</option>
                <option value="2">No terminada</option>
            </select>
        </div>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default CrearTodo;