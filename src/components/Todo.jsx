import { DeleteForever } from "@mui/icons-material";
import { List, ListItem, ListItemText } from "@mui/material";
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

export const Todo = ({ arr, setInput }) => {
  return (
    <List className="todo__list">
      <ListItem>
        <ListItemText primary={arr.item.todo} secondary={arr.item.todo} />
      </ListItem>

      <DeleteForever
        style={{ cursor: "pointer" }}
        fontSize="large"
        onClick={async () => {
          await deleteDoc(doc(db, "todos", arr.id));
          setInput(arr.item.todo);
        }}
      />
    </List>
  );
};
