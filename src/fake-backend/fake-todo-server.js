import { createServer, Model } from "miragejs";
import { TODOS } from "./fake-todo-database";

export const server = createServer({
  models: { todo: Model },
  seeds(server) {
    server.db.loadData({ todos: TODOS});
  },
  routes() {
      this.get("/data/todos");
      this.delete("/data/todos/:id");
      this.post("/data/todos", (schema, request) => {
          const newTodo = JSON.parse(request.requestBody);
          return schema.todos.create(newTodo);
      });
  }
});