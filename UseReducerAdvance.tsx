import React, { useReducer } from "react";

interface Todo {
  id: number;
  name: string;
  status: boolean;
}

interface State {
  todos: Todo[];
  isloading: boolean;
  todo: Todo;
}

interface Action {
  type: string;
  payload: any;
}

const initialState: State = {
  todos: [],
  isloading: false,
  todo: {
    id: 0,
    name: "",
    status: false,
  },
};

const action = (type: string, payload: any): Action => ({
  type,
  payload,
});

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return { ...state, todo: { ...state.todo, name: action.payload } };
    case "ADD_TODO":
      if (!state.todo.name.trim()) return state; // Prevent adding empty todos
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            ...action.payload,
            id: Math.floor(Math.random() * 100 + new Date().getMilliseconds()),
          },
        ],
        todo: { ...state.todo, name: "" }, // Clear input after adding
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

export default function UseReducerAdvance() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(action("CHANGE_INPUT", event.target.value));
  };

  const addTodo = () => {
    dispatch(action("ADD_TODO", state.todo));
  };

  const deleteTodo = (id: number) => {
    dispatch(action("DELETE_TODO", id));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Thêm mới"
        value={state.todo.name}
        onChange={handleChange}
      />
      <button onClick={addTodo}>Thêm</button>
      <p>Danh sách công việc</p>
      <ul>
        {state.todos.map((item: Todo) => (
          <li key={item.id}>
            {item.name} <button onClick={() => deleteTodo(item.id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
