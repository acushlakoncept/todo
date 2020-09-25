import "bootstrap";
import "./css/app.scss";
// import sideBar from './components/sideBar';
import {createTaskBtn, head, quickLinks, projectList, modalElement, projectCards, projectModal} from './components/domElements';

const content = document.querySelector("#content");

const LOCAL_STORAGE_PROJECT_KEY = "todo-projects";
const LOCAL_STORAGE_PROJECT_ID_KEY = "todo.selectedProjectId";

let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [];
let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_PROJECT_ID_KEY);

const mainPage = () => {
  const page = document.createElement("div");
  const side = document.createElement("div");
  const main = document.createElement("main");

  page.classList.add("row");
  side.classList.add("col-3", "p-5", "side-bar");
  main.classList.add(
    "col-9",
    "bg-light",
    "p-5",
    "main",
    "d-flex",
    "flex-wrap"
  );

  side.appendChild(head);
  side.appendChild(createTaskBtn);
  side.appendChild(quickLinks);
  side.appendChild(projectList);
  main.appendChild(projectCards)
  page.appendChild(side);
  page.appendChild(main);
  content.insertAdjacentElement("beforeend", modalElement);
  content.insertAdjacentElement("beforeend", projectModal);

  return page;
};

const displayPage = () => {
  content.appendChild(mainPage());
};

window.addEventListener("load", () => {
  displayPage();
});



const setProjectsForModal = () => {
  const modEl = modalElement.querySelector('.project-list')
    projects.forEach(project => {
      const projectOption = document.createElement('option')
      projectOption.dataset.projectId = project.id
      projectOption.setAttribute('value', project.name)
      projectOption.innerText = project.name
      modEl.appendChild(projectOption)
      
    })
}

createTaskBtn.addEventListener('click', setProjectsForModal)
projectCards.querySelector('.add-task').addEventListener('click', setProjectsForModal)

projectList.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "a") {
    selectedProjectId = e.target.dataset.projectId;
    saveAndRender();
  }
});

projectModal.addEventListener('submit', e => {
  e.preventDefault();
  const projectName = e.target.children[0].children[0].value
  if (projectName == null || projectName === "") return;

  const project = createProject(projectName);
  e.target.children[0].children[0].value = null;
  projects.push(project);
  saveAndRender();
  //TODO: dismiss modal after saving
})

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
  clearElement(projectList.querySelector('.projects-nav'));
  renderProjects()

  const selectedProject = projects.find(project => project.id === selectedProjectId)

  if (selectedProjectId == null) {
      projectCards.style.display = 'none'
  } else {
        projectCards.style.display = ''
        projectCards.querySelector('.card-header').innerText = selectedProject.name
        renderTaskCount(selectedProject)
        clearElement(projectCards.querySelector('.project-task'))
        renderTasks(selectedProject)
  }
};

const renderTaskCount = (selectedProject) => {
  const incompleteTaskCount = selectedProject.tasks.filter(task => !task.complete).length
  const taskString = incompleteTaskCount === 1 ? 'task' : 'tasks'
  projectCards.querySelector('.project-task-count').innerText = `${incompleteTaskCount} ${taskString} remaining`
}


const renderTasks = (selectedProject) => {
  selectedProject.tasks.forEach(task => {
      const taskElement = document.createElement('div')
      taskElement.classList.add('form-check')
      taskElement.innerHTML = `
      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
      <label class="form-check-label" for="defaultCheck1">
        Default checkbox
      </label>
      `
      const checkbox = taskElement.querySelector('input')
      checkbox.id = task.id
      checkbox.checked = task.complete
      const label = taskElement.querySelector('label')
      label.htmlFor = task.id
      label.append(task.name)
      projectCards.appendChild(taskElement)

  })
}




const renderProjects = () => {
  projects.forEach((project) => {
    const projectElem = document.createElement('a')
    projectElem.dataset.projectId = project.id;
    projectElem.classList.add("project-name", "nav-link");
    projectElem.innerText = project.name;
    if (project.id == selectedProjectId) {
      projectElem.classList.add("active-project");
    }
    projectList.querySelector('.projects-nav').appendChild(projectElem);  
  });
};

const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

render()