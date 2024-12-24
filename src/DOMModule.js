// import { allTodos } from "./todoManage";
import {addTask, allTodos, addProject, editTodo, delTodo} from "./todoManage";
export {renderTodo, renderProj, renderSection};
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
        // if((typeof index == Number) || (typeof index == String)){
        addTask(title, description, date, priority, projIndex);
        // } else {
        //     editTodo(title, description, date, priority, projIndex, index);
        // };
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

function renderTodo(title, description, date, priority, index, projIndex){
    const todoWrap = document.querySelector('.contentWrap');

    const todoObj = document.createElement('div');
    todoObj.innerHTML = `<div class='todoObj' <p>Title: ${title}</p>
    <p>Description: ${description}</p>
    <p>Date: ${date}</p>
    <p>Priority: ${priority}</p>
    <p>Complete: ${allTodos.myProjects[projIndex][index].complete}`
    // <button class="deleteTodo" data-index="${index}" proj-index="${projIndex}">Remove</button>
    // <button class="editTodo" data-index="${index}" proj-index="${projIndex}">Edit</button> </div>; //to get index from when adding render
    todoObj.className = 'todoObj';

    const delBtn = document.createElement('button');
    delBtn.setAttribute('data-index', index);
    delBtn.setAttribute('proj-index', projIndex);
    delBtn.textContent = "Remove";
    delBtn.addEventListener('click', (e) => {
        const index = delBtn.getAttribute('data-index');
        const projIndex = delBtn.getAttribute('proj-index');
        delTodo(index, projIndex);
    });

    const editBtn = document.createElement('button');
    editBtn.setAttribute('data-index', index);
    editBtn.setAttribute('proj-index', projIndex);
    editBtn.textContent = "Edit";
    editBtn.classList.add('editTodo');
    editBtn.addEventListener('click', (e) => {
        const index = editBtn.getAttribute('data-index');
        const projIndex = editBtn.getAttribute('proj-index');
        editModal(index, projIndex);
    });

    const completeBtn = document.createElement('input');
    completeBtn.type = 'checkbox';
    completeBtn.classList.add('completeMark');
    completeBtn.addEventListener('click', (e) => {
        allTodos.myProjects[projIndex][index].setAsComplete();
        completeBtn.checked == false ? completeBtn.checked == true : completeBtn.checked == false;
        renderSection(projIndex);
    });

    todoObj.appendChild(completeBtn);
    todoObj.appendChild(delBtn);
    todoObj.appendChild(editBtn);
    todoWrap.appendChild(todoObj);
    // return index;
};

function renderProj(title, description, i){
    const projWrap = document.querySelector('.sidebarWrap');

    const projObj = document.createElement('div');
    // removed from innerhtml <button class="view" data-index="${allTodos.myProjects.length - 1}">View</button>

    projObj.innerHTML = `<p>${title}</p>
    <button class="deleteProj" data-index="${i}">Del</button>` //edit btn?
    projObj.className = 'projObj';

    const viewBtn = document.createElement('button');
    // viewBtn.innerHTML = `<button class="view" proj-index="${allTodos.myProjects.length - 1}">View</button>`;
    viewBtn.setAttribute('proj-index', i);
    viewBtn.classList.add('view');
    viewBtn.textContent = "View";
    projObj.appendChild(viewBtn);
    viewBtn.addEventListener('click', (e) => {
        const index = viewBtn.getAttribute('proj-index');
        renderSection(index);
    });

    projWrap.appendChild(projObj);
};

function renderSection(projIndex) {
    // const todoWrap = document.querySelector('.contentWrap');
    const allTodoObjs = document.querySelectorAll('.todoObj');
    for(const elem of allTodoObjs){
        elem.remove();
    };
    allTodos.myProjects[projIndex].forEach((e) => renderTodo(e.title, e.description, e.date, e.priority, e.index, e.projIndex));
};

function editModal(index, projIndex) {
    todoModal.showModal();
    const indexHere = index;
    document.querySelector('#todoTitle').value = allTodos.myProjects[projIndex][index].title;
    document.querySelector('#todoDesc').value = allTodos.myProjects[projIndex][index].description;
    document.querySelector('#todoDate').value = allTodos.myProjects[projIndex][index].date;
    document.querySelector('#todoPriority').value = allTodos.myProjects[projIndex][index].priority;
    document.querySelector('#projIndex').value = allTodos.myProjects[projIndex][index].index;

    const editApply = document.createElement('button');
    editApply.setAttribute('proj-index', projIndex);
    editApply.setAttribute('data-index', index);
    editApply.textContent = "Edit To-do";
    editApply.addEventListener('click', (e) => {
        const title = document.querySelector('#todoTitle').value;
        const descr = document.querySelector('#todoDesc').value;
        const date = document.querySelector('#todoDate').value;
        const priority = document.querySelector('#todoPriority').value;
        // document.querySelector('#projIndex').value;

        editTodo(title, descr, date, priority, projIndex, index);
        editApply.remove();
        formModal.reset();
        todoModal.close();
        renderSection(projIndex);
    });
    todoModal.appendChild(editApply);
};


// runs updater to show projs, todos

