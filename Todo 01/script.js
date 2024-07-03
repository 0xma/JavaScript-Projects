document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.querySelector(".todo-input");
  const todoButton = document.querySelector(".todo-button");
  const todoList = document.querySelector(".todo-list");
  const filterOption = document.querySelector(".filter-todo");

  todoButton.addEventListener("click", addTodo);
  todoList.addEventListener("click", handleTodoClick);
  filterOption.addEventListener("click", filterTodo);

  loadTodos();

  function addTodo(e) {
    e.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText === "") return;

    const todoDiv = createTodoDiv(todoText);
    todoList.appendChild(todoDiv);
    saveLocalTodos(todoText);
    todoInput.value = "";
  }

  function handleTodoClick(e) {
    const item = e.target;
    const todo = item.parentElement;

    if (item.classList.contains("trash-btn")) {
      deleteTodoItem(todo);
    } else if (item.classList.contains("complete-btn")) {
      toggleCompleteTodoItem(todo);
    }
  }

  function deleteTodoItem(todo) {
    todo.classList.add("fade-out");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  function toggleCompleteTodoItem(todo) {
    todo.classList.toggle("completed");
  }

  function filterTodo() {
    const filter = filterOption.value;
    const todos = Array.from(todoList.children);

    todos.forEach(todo => {
      switch (filter) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          todo.style.display = todo.classList.contains("completed") ? "flex" : "none";
          break;
        case "uncompleted":
          todo.style.display = !todo.classList.contains("completed") ? "flex" : "none";
          break;
      }
    });
  }

  function saveLocalTodos(todo) {
    const todos = getLocalTodos();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function removeLocalTodos(todo) {
    const todos = getLocalTodos();
    const todoIndex = todo.querySelector(".todo-item").innerText;
    const updatedTodos = todos.filter(t => t !== todoIndex);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function getLocalTodos() {
    return localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
  }

  function loadTodos() {
    const todos = getLocalTodos();
    todos.forEach(todoText => {
      const todoDiv = createTodoDiv(todoText);
      todoList.appendChild(todoDiv);
    });
  }

  function createTodoDiv(todoText) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoText;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    return todoDiv;
  }
});
