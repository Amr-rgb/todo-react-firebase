import { useEffect, useState } from "react";
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import { Todo } from "./components/Todo";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { query, orderBy, serverTimestamp, addDoc } from "firebase/firestore";

function App() {
  const [todos, setTodos] = useState([]);

  const [input, setInput] = useState("");

  useEffect(() => {
    const todosRef = collection(db, "todos");
    getDocs(query(todosRef, orderBy("timestamp", "desc"))).then((snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          item: doc.data(),
        }))
      );
    });
  }, [input]);

  const addTodo = async (e) => {
    e.preventDefault();
    const todosRef = await addDoc(collection(db, "todos"), {
      todo: input,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="App">
      <h1>TODO React Firebase</h1>

      <form>
        <FormControl>
          <InputLabel>Write a TODO</InputLabel>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
        </FormControl>
        <Button
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
          disabled={!input}
        >
          Add Todo
        </Button>
      </form>

      <ul>
        {todos.map((item) => (
          <Todo key={item.id} arr={item} setInput={setInput} />
        ))}
      </ul>
    </div>
  );
}

export default App;
