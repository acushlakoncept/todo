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

deleteProjectBtn.addEventListener("click", (e) => {
  projects = projects.filter((project) => project.id !== selectedProjectId);
  selectedProjectId = null;
  saveAndRender();
});

projectList.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "a") {
    selectedProjectId = e.target.dataset.projectId;
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

modalElement.addEventListener("submit", (e) => {
  e.preventDefault();
  if (selectedProjectId === 'null') {
    document.querySelector('[data-dismiss="modal"]').click();
    return alert('select a project first') 
  }

  const taskName = e.target.children[0].children[0].value;
  const taskDesc = e.target.children[2].children[0].value;
  const taskDate = e.target.children[3].children[0].value;
  const taskPriority = e.target.children[4].children[0].value;
  const taskNote = e.target.children[5].children[0].value;

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
    taskElement.classList.add("form-check");
    taskElement.innerHTML = `
      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
      <label class="form-check-label" for="defaultCheck1">
        
      </label>
      `;
    const checkbox = taskElement.querySelector("input");
    checkbox.id = task.id;
    checkbox.checked = task.complete;
    const label = taskElement.querySelector("label");
    label.htmlFor = task.id;
    label.append(task.name);
    projectCards.querySelector(".project-task").appendChild(taskElement);
  });
};


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
