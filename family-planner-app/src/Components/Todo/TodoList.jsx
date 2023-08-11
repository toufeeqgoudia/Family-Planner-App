import { useState } from "react";
import { supabase } from "../../Config/supabaseClient";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import PropTypes from "prop-types";

const TodoList = ({ todo }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(todo.task);

  const updateTodo = async () => {
    try {
      const { error } = await supabase
        .from("todoList")
        .update({
          task: name,
        })
        .eq("id", todo.id);

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteTodo = async () => {
    try {
      const { error } = await supabase
        .from("todoList")
        .delete()
        .eq("id", todo.id);

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {editing === false ? (
        <div className="mt-2 flex flex-row justify-between items-center w-4/5 max-w-2xl border-2 bg-slate-300 rounded-lg">
          <p className="text-base p-3">{todo.task}</p>
          <div>
            <button className="text-base p-3">
              <DeleteIcon color="error" onClick={() => deleteTodo()} />
            </button>
            <button className="text-base p-3" onClick={() => setEditing(true)}>
              <EditIcon color="action" />
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={() => updateTodo()}
          className="mt-2 flex flex-row justify-between items-center w-4/5 max-w-2xl border-2 bg-slate-300 rounded-lg"
        >
          <input
            className="w-4/5 text-base p-2 ml-1 outline-none bg-slate-300"
            defaultValue={todo.task}
            onChange={(e) => setName(e.target.value)}
          />
          <div>
            <button className="text-base p-3" onClick={() => setEditing(false)}>
              <CancelIcon color="action" />
            </button>
            <button className="text-base p-3" type="submit">
              <CheckIcon color="action" />
            </button>
          </div>
        </form>
      )}
    </>
  );
};

TodoList.propTypes = {
  todo: PropTypes.object,
};

export default TodoList;
