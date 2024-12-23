// import { allTodos } from "./todoManage";
import {addTask, allTodos, addProject} from "./todoManage";
export {renderTodo, renderProj};
// const library = allTodos;

const newProj = document.querySelector('.newProject');
const newTodo = document.querySelector('.newTodo');
const projModal = document.querySelector('.projModal');
const todoModal = document.querySelector('.todoModal');
const formModal = document.querySelector('.formModal'); //to reset inside the todo fn
const formProj = document.querySelector('.formProjModal'); //to reset inside the proj fn

// const projWrap = document.querySelector('.sidebarWrap'); //to add projs to the wrap
// const todoWrap = document.querySelector('.contentWrap'); //to add todos to the wrap

newProj.addEventListener('click', () => {
    projModal.showModal();
});

newTodo.addEventListener('click', () => {
    todoModal.showModal();
});

todoModal.addEventListener('submit', (event) => {
    event.preventDefault();
    // selects forms to update info
    const title = document.querySelector('#todoTitle').value;
    const description = document.querySelector('#todoDesc').value;
    const date = document.querySelector('#todoDate').value;
    const priority = document.querySelector('#todoPriority').value;
    const projIndex = document.querySelector('#projIndex').value; //Just added

    if(!(title === '')){
        // correct projIndex to be the index
        // const projIndex = 0
        addTask(title, description, date, priority, projIndex);
        console.log(allTodos.myProjects);
        // renderTodo(title, description, date, priority, allTodos.myProjects[projIndex].length); //-1?
        formModal.reset();
        todoModal.close();

    }; 
});

projModal.addEventListener('submit', (event) => {
    event.preventDefault();
    // selects forms to update info
    const title = document.querySelector('#projTitle').value;
    const description = document.querySelector('#projDesc').value;

    if(!(title === '')){
        addProject(title, description);
        console.log(allTodos.myProjects);
        // renderProj(title, description) TO IMPLEMENT
        formProj.reset();
        projModal.close();
    
    };
});

function renderTodo(title, description, date, priority, index){
    const todoWrap = document.querySelector('.contentWrap');

    const todoObj = document.createElement('div');
    todoObj.innerHTML = `<div class='todoObj' <p>Title: ${title}</p>
    <p>Description: ${description}</p>
    <p>Date: ${date}</p>
    <p>Priority: ${priority}</p>
    <button class="deleteTodo" data-index="${index}">Remove</button>
    <button class="editTodo">Edit</button> </div>`; //to get index from when adding render
    todoObj.className = 'todoObj';

    todoWrap.appendChild(todoObj);
};

function renderProj(title, description){
    const projWrap = document.querySelector('.sidebarWrap');

    const projObj = document.createElement('div');
    projObj.innerHTML = `<p>${title}</p>
    <button class="deleteProj" data-index="${allTodos.myProjects.length - 1}">Del</button>` //edit btn?
    projObj.className = 'projObj';

    projWrap.appendChild(projObj);
};



// runs updater to show projs, todos

