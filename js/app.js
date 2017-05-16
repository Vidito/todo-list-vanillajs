// todoList object represents the model of this app.
var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  // Takes in todo item position and switches the boolean value of the completed status.
  toggleCompleted: function(position) {
    // Grabs the todo item from the array and sets it to the todo variable.
    var todo = this.todos[position];
    // Switches the boolean value of the completed status.
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    // Get number of completed todos.
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    
    this.todos.forEach(function(todo) {
      // Case 1: If everything's true, make everything false.
      if (completedTodos === totalTodos) {
        todo.completed = false;
      // Case 2: Otherwise, make everything true.
      } else {
        todo.completed = true;
      }
    });
  }
};

// handlers object represents the controller of this app.
var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  addTodoEntered: function() {
    var inputElement = document.getElementById("addTodoTextInput");
    if (inputElement.value && event.keyCode === 13) {
      this.addTodo();
    }
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  // The controller for the todo item toggle
  toggleCompleted: function() {
    // Grabs the toggle position input box and sets it to the toggleCompletedPositionInput variable.
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    // Grabs the toggleCompletedPositionInput's value, converts it to a number, and passes it to the todoList.toggleCompleted method as an argument. This line basically changes the boolean value of the completed status of the todo item.
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    // Clears out the toggle position input box so the user can enter another number next time.
    toggleCompletedPositionInput.value = '';
    // Runs the view.displayTodos() to update the DOM so the user can see the changes.
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }  
};

// view object represents the view of this app.
var view = {
  displayTodos: function() {
    // grabs the <ul> element and sets it to todosUl variable.
    var todosUl = document.querySelector('ul');
    // Clears out the content inside <ul> to make sure we're starting clean.
    todosUl.innerHTML = '';
    
    // Note that the 'this' argument in the forEach method is to bind 'this' for the callback function so it has access to the view object inside the callback.
    todoList.todos.forEach(function(todo, position) {
      // Creates an li element
      var todoLi = document.createElement('li');
      // Initialize todoTextWithCompletion to empty string.
      var todoTextWithCompletion = '';
      
      // Builds the artificial checkboxes and the actual todo item text.
      if (todo.completed === true) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }
      
      // Sets the position of the forEach loop as the id for the todoLi element we're building.
      todoLi.id = position;
      // Sets the artificial checkboxes and the actual todo item text to the inside of the created <li> element." <li>todoLi.textContent</li>"
      todoLi.textContent = todoTextWithCompletion;
      // Adds the delete button as a child to the created <li> element by running the createDeleteButton method.
      todoLi.appendChild(this.createDeleteButton());
      // Adds the finalized <li> element as a child to the <ul> element.
      todosUl.appendChild(todoLi);
    }, this);
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners: function() {
    var todosUl = document.querySelector('ul');

    todosUl.addEventListener('click', function(event) {
      // Get the element that was clicked on.
      var elementClicked = event.target;

      // Check if elementClicked is a delete button.
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.setUpEventListeners();
