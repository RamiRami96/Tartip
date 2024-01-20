import { Board } from "../../models/board.model";
import { Todo } from "../../models/todo.model";

interface BoardState {
  boards: Board[];
  currentBoard: Board | null;
  currentTodo: Todo | null;
}

export const initialStateBoard: BoardState = {
  boards: [
    {
      id: 1,
      name: "Health",
      todos: [
        {
          id: 6,
          title: "1. todo first a 2. to do second 3. To do third",
        },
        { id: 1, title: "Todo 1" },
        { id: 2, title: "Todo 2" },
        { id: 3, title: "Todo 3" },
        { id: 4, title: "Todo 4" },
        { id: 5, title: "Todo 5" },
      ],
    },
    {
      id: 2,
      name: "Work",
      todos: [
        {
          id: 7,
          title: "Todo 7",
        },
      ],
    },
    {
      id: 3,
      name: "Find girlfriend",
      todos: [],
    },
  ],
  currentBoard: null,
  currentTodo: null,
};
