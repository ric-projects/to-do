import { renderTodo, renderProj, renderSection } from "./DOMModule";
export { allTodos, addTask, addProject, editTodo, delTodo };

// const firstRun = (function firstRun() {
//     if (!localStorage.getItem("myArray")){
//         const myProjects = [[],];
//         myProjects[0].title = "Default";
//         const string = JSON.stringify(myProjects);
//         localStorage.setItem("myArray", string);
//         // return { myProjects };
//     };
// })();
// array to hold all to=dos
const allTodos = (function allTodos() {
    // const myLibrary = [];
    if (!localStorage.getItem("myArray")){
        const myProjects = [[],];
        myProjects[0].title = "Default";
        return { myProjects };
    } else {
        const retString = localStorage.getItem("myArray");
        const myProjects = JSON.parse(retString);
        return { myProjects };
    };
    // return { /*myLibrary,*/ myProjects };
})();

// Project Constructor
// class Project {
//     constructor(title, description){
//         this.title = title;
//         this.description = description;
//         this.projIndex = allTodos.myProjects.length; // -1?; ln34 of DOMModule
//     };
// };

// Task constructor
class Task {
    constructor(title, description, dueDate, priority, projIndex) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.complete = false;
        // const projectIndex = projectIndex;
        // if(projectIndex == undefined) //ln34 of DOM Module
        this.index = (allTodos.myProjects[projIndex].length);
        this.projIndex = projIndex;
    };

    changePriority() {
        this.priority = this.priority === 'Urgent' ? 'Important' : 'Urgent';
    };

    setAsComplete() {
        this.complete = this.complete === false ? true : false;
    };
};

class TaskReviver {
    changePriority() {
        this.priority = this.priority === 'Urgent' ? 'Important' : 'Urgent';
    };

    setAsComplete() {
        this.complete = this.complete === false ? true : false;
    };
}

function setClasses(){
    const outerLength = allTodos.myProjects.length;
    const instance = new TaskReviver();
    for (let index = 0; index < outerLength; index++) {
        for(let j = 0; j < allTodos.myProjects[index].length; j++){
            Object.setPrototypeOf(allTodos.myProjects[index][j], instance);
            return allTodos.myProjects[index][j];
        };  
    };
};
setClasses();


// To implement
function delTodo(index, projIndex) {
    allTodos.myProjects[projIndex].splice(index, 1);
    renderSection(projIndex);
    saveToLocal();
};

// To Implement
function delProject(projIndex){
    allTodos.myProjects.splice(projIndex, 1);
};

function addTask(title, description, date, importance, projIndex){
    // if(projIndex == '') {projIndex = 0}; //ln34 of DOMModule
    const newTask = new Task(title, description, date, importance, projIndex);
    // projIndex = Number(projIndex);
    allTodos.myProjects[projIndex].push(newTask);
    renderTodo(title, description, date, importance, allTodos.myProjects[projIndex].length -1, projIndex); //-1
    renderSection(projIndex);
    saveToLocal();
};

function addProject(title, description){
    const newProj = new Array();
    newProj.title = title;
    newProj.description = description;
    allTodos.myProjects.push(newProj);
    console.log('addProj' + allTodos.myProjects);
    renderProj(title, description, allTodos.myProjects.length - 1);
    saveToLocal();
};

function editTodo(title, description, date, importance, projIndex, index){

    allTodos.myProjects[projIndex][index].title = title;
    allTodos.myProjects[projIndex][index].description = description;
    allTodos.myProjects[projIndex][index].date = date;
    allTodos.myProjects[projIndex][index].importance = importance;
    
    const indexHere = index;
    renderSection(projIndex);
    saveToLocal();
};

function saveToLocal(){
    const string = JSON.stringify(allTodos.myProjects);
    localStorage.setItem("myArray", string);
};

// 3 default tasks
// addTask('cook','food','today','Urgent', "0");
// addTask('read','book','tomorrow','Important', "0");
// addTask('gym', 'exercise', 'next week', 'Important', 0);
renderSection(0);

for (let i = 0; i < allTodos.myProjects.length; i++) {
    // const element = array[index];
    renderProj(allTodos.myProjects[i].title, allTodos.myProjects[i].description, i);
};
// renderProj(allTodos.myProjects[0].title, allTodos.myProjects[0].description);

// addProject('reno', 'paint the appt');
