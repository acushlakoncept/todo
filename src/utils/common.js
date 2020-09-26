/* eslint-disable import/no-cycle */
import projectCards from '../components/ProjectCard';
import projectList from '../components/ProjectList';
import store, { LOCAL_STORAGE_PROJECT_ID_KEY } from './data';

const selectedProjectId = localStorage.getItem(LOCAL_STORAGE_PROJECT_ID_KEY);
const projects = store();

export const createProject = (name) => ({ id: Date.now().toString(), name, tasks: [] });

export const createTask = (name, date, description, priority, note) => ({
  id: Date.now().toString(),
  name,
  date,
  description,
  priority,
  note,
  complete: false,
});

export const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

export const renderTaskCount = (selectedProject) => {
  const incompleteTaskCount = selectedProject.tasks.filter(
    (task) => !task.complete,
  ).length;
  const taskString = incompleteTaskCount === 1 ? 'task' : 'tasks';
  projectCards().querySelector(
    '.project-task-count',
  ).innerText = `${incompleteTaskCount} ${taskString} remaining`;
};

export const renderTasks = (selectedProject) => {
  const cards = projectCards();
  selectedProject.tasks.forEach((task) => {
    const taskElement = document.createElement('div');
    taskElement.classList.add(
      'form-check',
      'border-bottom',
      'pb-2',
      'pt-2',
      'ml-2',
    );
    taskElement.innerHTML = `
      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
      <label class="form-check-label" for="defaultCheck1">
        
      </label>
      <small class="due-date"></small>
      <i class="fas fa-edit task-edit float-right pr-3 text-primary" data-task-edit data-toggle="modal" data-target="#editTaskModal" ></i>
      `;

    const checkbox = taskElement.querySelector('input');
    checkbox.id = task.id;
    checkbox.checked = task.complete;
    const label = taskElement.querySelector('label');
    label.htmlFor = task.id;
    label.append(task.name);
    const dueDate = taskElement.querySelector('small');
    dueDate.innerText = ` | ${task.date}`;
    taskElement.addEventListener('mouseover', () => {
      // label.setAttribute('title', task.description)
      dueDate.innerHTML = `
      <br>
      Description: ${task.description} <br>
      Due Date: ${task.date} <br>
      Priority: ${task.priority} <br>
      Note: ${task.note}
      `;
    });

    taskElement.addEventListener('mouseout', () => {
      dueDate.innerHTML = `| ${task.date}`;
    });

    cards.querySelector('.project-task').appendChild(taskElement);
  });
};

export const renderProjects = () => {
  projects.forEach((project) => {
    const projectElem = document.createElement('a');
    projectElem.dataset.projectId = project.id;
    projectElem.classList.add('project-name', 'nav-link');
    projectElem.innerText = project.name;
    if (project.id === selectedProjectId) {
      projectElem.classList.add('active-project');
    }
    projectList().querySelector('.projects-nav').appendChild(projectElem);
  });
};

export const render = () => {
  clearElement(projectList().querySelector('.projects-nav'));
  renderProjects();

  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId,
  );

  if (selectedProjectId == null) {
    projectCards().style.display = 'none';
  } else {
    projectCards().style.display = '';
    projectCards().querySelector('.card-header').innerText = selectedProject.name;
    renderTaskCount(selectedProject);
    clearElement(projectCards.querySelector('.project-task'));
    renderTasks(selectedProject);
  }
};

export const save = () => {
  localStorage.setItem('todo-projects', JSON.stringify(projects));
  localStorage.setItem(LOCAL_STORAGE_PROJECT_ID_KEY, selectedProjectId);
};

export const saveAndRender = () => {
  save();
  render();
};