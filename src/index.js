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

projectModal.addEventListener('submit', e => {
  e.preventDefault();
  const projectName = e.target.children[0].children[0].value
  if (projectName == null || projectName === "") return;

  const project = createProject(projectName);
  e.target.children[0].children[0].value = null;
  projects.push(project);
  saveAndRender();
  projectModal.
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
  clearElement(projectList.getElementsByTagName('nav'));
  renderProjects()

  // const selectedProject = projects.find(project => project.id === selectedProjectId)

  // if (selectedProjectId == null) {
  //     projectCards.style.display = 'none'
  // } else {
  //       projectCards.style.display = ''
  //       projectCards.document.querySelector('card-header').innerText = selectedProject.name
  //       renderTaskCount(selectedProject)
  //       clearElement(projectCards.document.querySelector('project-task'))
  //       renderTasks(selectedProject)
  // }
};



const renderProjects = () => {
  const projectNav = document.createElement("nav");
  projectNav.classList.add('nav', 'flex-column', 'projects-nav')
  projects.forEach((project) => {
    const projectElem = document.createElement('a')
    projectElem.dataset.projectId = project.id;
    projectElem.classList.add("project-name", "nav-link");
    projectElem.innerText = project.name;
    if (project.id == selectedProjectId) {
      projectElem.classList.add("active-project");
    }
    projectNav.appendChild(projectElem);  
  });
  projectList.appendChild(projectNav)
};

const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

renderProjects()