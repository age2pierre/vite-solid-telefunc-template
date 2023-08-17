module default {
  type Todo {
    required label: str;
    done: bool {
      default := false;
    }
    list: TodoList;
  }

  type TodoList {
    multi link todos := .<list[is Todo]
  }

  type AuthLocal {
    required username: str {
      constraint exclusive;
      readonly := true;
    }
    required password: str;
  }
}