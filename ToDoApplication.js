let unorderedList = document.getElementById("todo");
let saveButton = document.getElementById("saveTodoButton");
localStorage.removeItem("todoList");
function save() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (stringifiedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage();
let addBtn = document.getElementById("addTodoButton");
let todosCount = todoList.length;

function onAddTodo() {
    let userInput = document.getElementById("todoUserInput");
    let userInputValue = userInput.value;

    if (userInputValue === "") {
        alert("Enter Valid Input!");
        return;
    }

    todosCount = todosCount + 1;
    let newTodo = {
        text: userInputValue,
        uniqueNumber: todosCount,
        isChecked: false
    }
    console.log("userInput",newTodo,userInputValue)
    todoList.push(newTodo);
    createAndAppendTodoItems(newTodo);
    userInput.value = "";
}


function add() {
    onAddTodo();
}

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelledElement = document.getElementById(labelId);
    labelledElement.classList.toggle("checked");
    /*if (checkboxElement.checked === true) {
        labelledElement.classList.add("checked");
    } else {
        labelledElement.classList.remove("checked");
    }*/

    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNumber;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoObjectIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
}

function onTodoDelete(todoId) {
    let todoElement = document.getElementById(todoId);
    unorderedList.removeChild(todoElement);

    let deletedElementIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNumber;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deletedElementIndex, 1);
}

function createAndAppendTodoItems(todo) {
    let todoText = todo.text;
    let checkboxId = "checkbox" + todo.uniqueNumber;
    let labelId = "label" + todo.uniqueNumber;
    let todoId = "todo" + todo.uniqueNumber;
    let list = document.getElementById("todo")
    let listElement = document.createElement("li");
    if(list && listElement){
        listElement.classList.add("todo-item-container", "d-flex", "flex-row");
        listElement.id = todoId;
        list.appendChild(listElement);  
    }
    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.classList.add("checkbox-input");
    inputElement.checked = todo.isChecked;

    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    }

    listElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("d-flex", "flex-row", "label-container");
    listElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todoText;
    labelElement.id = labelId;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIcon.onclick = function() {
        onTodoDelete(todoId);
    }

    deleteContainer.appendChild(deleteIcon);
}

for (let eachTodo of todoList) {
    createAndAppendTodoItems(eachTodo);
}