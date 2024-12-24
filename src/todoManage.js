import { renderTodo, renderProj, renderSection } from "./DOMModule";
export { allTodos, addTask, addProject, editTodo, delTodo };

// array to hold all to=dos
const allTodos = (function allTodos() {
    // const myLibrary = [];
    const myProjects = [[],];
    myProjects[0].title = "Default";
    return { /*myLibrary,*/ myProjects };
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


// To implement
function delTodo(index, projIndex) {
    allTodos.myProjects[projIndex].splice(index, 1);
    renderSection(projIndex);
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
};

function addProject(title, description){
    const newProj = new Array();
    newProj.title = title;
    newProj.description = description;
    allTodos.myProjects.push(newProj);
    console.log('addProj' + allTodos.myProjects);
    renderProj(title, description);
};

function editTodo(title, description, date, importance, projIndex, index){

    allTodos.myProjects[projIndex][index].title = title;
    allTodos.myProjects[projIndex][index].description = description;
    allTodos.myProjects[projIndex][index].date = date;
    allTodos.myProjects[projIndex][index].importance = importance;
    
    const indexHere = index;
    renderSection(projIndex);
};

// 3 default tasks
// addTask('cook','food','today','Urgent', "0");
// addTask('read','book','tomorrow','Important', "0");
addTask('gym', 'exercise', 'next week', 'Important', 0);
renderProj(allTodos.myProjects[0].title, allTodos.myProjects[0].description);
addProject('reno', 'paint the appt');
