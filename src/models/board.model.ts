import { Todo } from "./todo.model";

export type Board = {
  id: number;
  name: string;
  todos: Todo[];
};
