// TO UNCOMMENT FOR WEBPACK
// import "./styles.css";

// import { testingExport } from "./todoManage.js";


console.log('Script Connected, line 3.');

// array to hold all to=dos
const allTodos = (function allTodos() {
    // const myLibrary = [];
    const myProjects = [[],];
    return { /*myLibrary,*/ myProjects };
})();


class Task {
    constructor(title, description, dueDate, priority, projectIndex) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.complete = false;
        this.index = (allTodos.myProjects[0].length);
        this.projIndex = projectIndex;
    };

    changePriority() {
        this.priority = this.priority === 'Urgent' ? 'Important' : 'Urgent';
    };

    setAsComplete() {
        this.complete = this.complete === false ? true : false;
    };
};

function delTodo(index, projIndex) {
    allTodos.myProjects[projIndex].splice(index, 1);
};

function delProject(projectIndex){
    allTodos.myProjects.splice(projectIndex, 1);
};

class Project {
    constructor(title, description){
        this.title = title;
        this.description = description;
    };
};

// 3 default tasks
function adding3Books(){
    let task1 = new Task('cook','food','today','Urgent', "0");
    allTodos.myProjects[0].push(task1);
    let task2 = new Task('read','book','tomorrow','Important', "0");
    allTodos.myProjects[0].push(task2);
    let task3 = new Task('gym', 'exercise', 'next week', 'Important', 0);
    allTodos.myProjects[0].push(task3);
};
adding3Books();

function adding1Project(){
    let proj1 = new Project('reno', 'paint the appt');
    allTodos.myProjects.push(proj1);
};
// projects item creator, w/ a default one - partially done

// todo-item creator - done
// title, descr, dueDate, priority

// set todo item as complete - done

// changing todo priority - done



// DOM = diff module;

// localStorage = 2 fn, one to save and one to load