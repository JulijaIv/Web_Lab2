import React from "react";
import "./App.css";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Clock from "./Clock"; 
import DateComponent from "./Date"

function Todo({ todo, index, markTodo, removeTodo, editTodo, editingTodo, handleTodoEdit }) {
  return (
    <div className="todo">
      <div className="todo-text">
        {editingTodo === index ? (
          <div>
            <input
              type="text"
              value={todo.text}
              onChange={(e) => handleTodoEdit(index, e.target.value)}
            />
            <Button variant="outline-success" onClick={() => editTodo(null)}>Save</Button>
          </div>
        ) : (
          <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span>
        )}
      </div>
      <div className="todo-buttons">
        <Button variant="outline-success" onClick={() => markTodo(index)}>✓</Button>{' '}
        <Button variant="outline-primary" onClick={() => editTodo(index)}>Edit</Button>{' '}
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}> 
    <Form.Group>
      <Form.Label><b>Add Todo</b></Form.Label>
      <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
    </Form.Group>
    <Button variant="primary mb-3" type="submit" className="submit-button">
      Submit
    </Button>
  </Form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    {
      text: "This is a sample todo",
      isDone: false
    }
  ]);

  const [editingTodo, setEditingTodo] = React.useState(null);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const editTodo = index => {
    setEditingTodo(index);
  };

  const handleTodoEdit = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="container">
        <Clock /> 
        <DateComponent />
        <h1 className="text-center mb-4">Todo List</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <Card key={index}>
              <Card.Body>
                <Todo
                  index={index}
                  todo={todo}
                  markTodo={markTodo}
                  removeTodo={removeTodo}
                  editTodo={editTodo}
                  editingTodo={editingTodo}
                  handleTodoEdit={handleTodoEdit}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}


  



export default App;
