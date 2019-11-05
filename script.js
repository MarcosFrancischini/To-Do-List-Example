"use strict";

window.onload = startApplication;

function startApplication() {
   var toDoList = document.querySelector("#app ul");
   var inputElement = document.querySelector("#app input");
   var buttonElement = document.querySelector("#app button");
   var toDos = JSON.parse(localStorage.getItem("ToDoList")) || [];
   var toDo;

   renderToDos(toDoList, toDos);
   createEmptyListMessage(toDoList);
    
   buttonElement.addEventListener("click", function() {
       toDo = inputElement.value;
       addTodo(toDoList, toDos, toDo);
       inputElement.value = "";
   });
}

function renderToDos(toDoList, toDos){
    toDoList.innerHTML = "";
    
    for(let toDo of toDos) {
        createListItem(toDoList, toDos, toDo);
    }
}

function addTodo(toDoList, toDos, toDo) {
    checkInvalidToDo(toDo) ? createToDo(toDoList, toDos, toDo) : alert("Enter a valid to do !");
    saveToStorage(toDos);
}

function createListItem(toDoList, toDos, toDo) {
    var li = createListElement(toDo + " ");
    var a = createDeleteElement(toDoList, toDos, toDo);

    li.appendChild(a);
    toDoList.appendChild(li);
}

function checkInvalidToDo(toDo) {
    return toDo != null && toDo.trim() != "";
}

function createToDo(toDoList, toDos, toDo) {
    toDos.push(toDo);
    renderToDos(toDoList, toDos);
}

function createDeleteElement(toDoList, toDos, toDo) {
    var toDoList = document.querySelector("#app ul");
    
    var a = document.createElement("a");
    var aContent = document.createTextNode("Delete");
    a.setAttribute("href", "#");
    a.appendChild(aContent);
    a.addEventListener("click", function() {
        deleteToDo(toDoList, toDos, toDos.indexOf(toDo));
    })

    return a;
}

function createListElement(content) {
    var li = document.createElement("li");
    var liContent = document.createTextNode(content);
    li.appendChild(liContent);

    return li;
}

function createEmptyListMessage(toDoList) {
    if(!toDoList.hasChildNodes()) {
        var li = createListElement("The list is empty");
        li.setAttribute("id", "emptyListMessage");
        toDoList.appendChild(li);
    }
}

function deleteToDo(toDoList, toDos, pos) {
    toDos.splice(pos, 1);
    renderToDos(toDoList, toDos);
    createEmptyListMessage(toDoList);
    saveToStorage(toDos);
}

function saveToStorage(toDos) {
    localStorage.setItem("ToDoList", JSON.stringify(toDos));
}





