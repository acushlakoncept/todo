import "bootstrap";
import "./css/app.scss";
import {
  createTaskBtn,
  head,
  quickLinks,
  projectList,
  modalElement,
  projectCards,
  projectModal,
  editTaskElement,
  mainPage
} from "./components/domElements";

const content = document.querySelector("#content");
const deleteProjectBtn = projectCards.querySelector(".delete-project");
const completeTaskInput = projectCards.querySelector('.project-task');
const clearCompletedTaskBtn = projectCards.querySelector(".clear-task");

const LOCAL_STORAGE_PROJECT_KEY = "todo-projects";
const LOCAL_STORAGE_PROJECT_ID_KEY = "todo.selectedProjectId";

let projects =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [];
let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_PROJECT_ID_KEY);

const displayPage = () => {
  content.appendChild(mainPage());
};

window.addEventListener("load", () => {
  displayPage();
});

createTaskBtn.addEventListener('click', e => {
  if(selectedProjectId === null) {
    alert('Select a project first')
  }
})

deleteProjectBtn.addEventListener("click", (e) => {
  projects = projects.filter((project) => project.id !== selectedProjectId);
  selectedProjectId = null;
  createTaskBtn.dataset.target = "";
  saveAndRender();
});

projectList.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "a") {
    selectedProjectId = e.target.dataset.projectId;
    createTaskBtn.dataset.target = "#taskModal";
    saveAndRender();
  }
});

projectModal.addEventListener("submit", (e) => {
  e.preventDefault();
  const projectName = e.target.children[0].children[0].value;
  if (projectName == null || projectName === "") return;

  const project = createProject(projectName);
  e.target.children[0].children[0].value = null;
  projects.push(project);
  saveAndRender();
  projectModal.querySelector('[data-dismiss="modal"]').click();
});

// EDIT TASK
projectCards.addEventListener('click', e => {
  if(e.target.classList.contains('task-edit')) {
    const taskId = e.target.parentNode.firstElementChild.id
    const currentProject = projects.find(project => project.id === selectedProjectId )
    const currentTask = currentProject.tasks.find(task => task.id === taskId)
    editTaskElement.querySelector('#taskName').value = currentTask.name
    editTaskElement.querySelector('#taskDesc').value = currentTask.description
    editTaskElement.querySelector('#taskDate').value = currentTask.date
    editTaskElement.querySelector('#taskPriority').value = currentTask.priority
    editTaskElement.querySelector('#taskNote').value = currentTask.note
    editTaskElement.querySelector('#taskId').value = taskId
  }
})

editTaskElement.addEventListener('submit', e => {
  e.preventDefault();

  const taskName = e.target.elements[0].value;
  const taskDesc = e.target.elements[1].value;
  const taskDate = e.target.elements[2].value;
  const taskPriority = e.target.elements[3].value;
  const taskNote = e.target.elements[4].value;
  const taskId = e.target.elements[5].value;

  const currentProject = projects.find(project => project.id === selectedProjectId )
  const currentTask = currentProject.tasks.find(task => task.id === taskId)
  currentTask.name = taskName
  currentTask.description = taskDesc
  currentTask.date = taskDate
  currentTask.priority = taskPriority
  currentTask.note = taskNote

  saveAndRender();
  editTaskElement.querySelector('[data-dismiss="modal"]').click();

})

modalElement.addEventListener("submit", (e) => {
  e.preventDefault();
  if (selectedProjectId === 'null') {
    document.querySelector('[data-dismiss="modal"]').click();
    return alert('select a project first') 
  }

  const taskName = e.target.elements[0].value;
  const taskDesc = e.target.elements[1].value;
  const taskDate = e.target.elements[2].value;
  const taskPriority = e.target.elements[3].value;
  const taskNote = e.target.elements[4].value;

  if (
    taskName == null ||
    taskName === "" ||
    taskDate == null ||
    taskDate === "" ||
    taskDesc == null ||
    taskDesc === "" ||
    taskPriority == null ||
    taskPriority === ""
  )
    return;

  const task = createTask(taskName, taskDate, taskDesc, taskPriority, taskNote);
  e.target.reset();
  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );
  selectedProject.tasks.push(task);
  saveAndRender();
  modalElement.querySelector('[data-dismiss="modal"]').click();
});

completeTaskInput.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'input') {
      const selectedProject = projects.find(project => project.id === selectedProjectId)
      const selectedTask = selectedProject.tasks.find(task => task.id === e.target.id)
      selectedTask.complete = e.target.checked
      save()
      renderTaskCount(selectedProject)
  }
})


clearCompletedTaskBtn.addEventListener('click', e => {
  const selectedProject = projects.find(project => project.id === selectedProjectId)
  selectedProject.tasks = selectedProject.tasks.filter(task => !task.complete)
  saveAndRender()
})

const createDefaultProject = () => {
  const project = createProject("Default Project");
  projects.push(project);
  saveAndRender();
}

const createTask = (name, date, description, priority, note) => {
  return {
    id: Date.now().toString(),
    name: name,
    date: date,
    description: description,
    priority: priority,
    note: note,
    complete: false
  };
};

const createProject = (name) => {
  return { id: Date.now().toString(), name: name, tasks: [] };
};

const saveAndRender = () => {
  save();
  render();
};

const save = () => {
  localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projects));
  localStorage.setItem(LOCAL_STORAGE_PROJECT_ID_KEY, selectedProjectId);
};

const render = () => {
  clearElement(projectList.querySelector(".projects-nav"));
  renderProjects();

  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );

  if (selectedProjectId == null) {
    projectCards.style.display = "none";
  } else {
    projectCards.style.display = "";
    projectCards.querySelector(".card-header").innerText = selectedProject.name;
    renderTaskCount(selectedProject);
    clearElement(projectCards.querySelector(".project-task"));
    renderTasks(selectedProject);
  }
};

const renderTaskCount = (selectedProject) => {
  const incompleteTaskCount = selectedProject.tasks.filter(
    (task) => !task.complete
  ).length;
  const taskString = incompleteTaskCount === 1 ? "task" : "tasks";
  projectCards.querySelector(
    ".project-task-count"
  ).innerText = `${incompleteTaskCount} ${taskString} remaining`;
};

const renderTasks = (selectedProject) => {
  selectedProject.tasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("form-check", "border-bottom", "pb-2", "pt-2", "ml-2");
    taskElement.innerHTML = `
      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
      <label class="form-check-label" for="defaultCheck1">
        
      </label>
      <i class="fas fa-edit task-edit float-right pr-3 text-primary" data-task-edit data-toggle="modal" data-target="#editTaskModal" ></i>
      `;

      // <button class="btn btn-primary mt-4 mb-4 text-center" data-name="task" data-toggle="modal" data-target="#taskModal">Create Task</button>

    const checkbox = taskElement.querySelector("input");
    checkbox.id = task.id;
    checkbox.checked = task.complete;
    const label = taskElement.querySelector("label");
    label.htmlFor = task.id;
    label.append(task.name);
    projectCards.querySelector(".project-task").appendChild(taskElement);
  });
};

const renderProjects = () => {
  projects.forEach((project) => {
    const projectElem = document.createElement("a");
    projectElem.dataset.projectId = project.id;
    projectElem.classList.add("project-name", "nav-link");
    projectElem.innerText = project.name;
    if (project.id == selectedProjectId) {
      projectElem.classList.add("active-project");
    }
    projectList.querySelector(".projects-nav").appendChild(projectElem);
  });
};

const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};


render();
