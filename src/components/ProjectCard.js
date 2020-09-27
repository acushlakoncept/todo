import store, { LOCAL_STORAGE_PROJECT_ID_KEY } from '../utils/data';
/* eslint-disable import/no-cycle */
import {
  clearCompletedTaskEventHandler, completedTaskEventhandler,
  deleteProjectEventHandler, projectCardEventHandler,
} from './Listeners';

export default () => {
  const projects = store();
  const currentProjectId = LOCAL_STORAGE_PROJECT_ID_KEY();
  const currentProject = projects.find((project) => project.id === currentProjectId);
  const uncompletedTasks = currentProject.tasks.filter((task) => !task.complete);

  const projectCards = document.createElement('div');
  projectCards.classList.add('card', 'project-card');
  const projectCardHead = document.createElement('div');
  projectCardHead.classList.add('card-header');
  projectCardHead.innerText = 'Default';
  projectCards.appendChild(projectCardHead);
  const projectTaskCount = document.createElement('p');
  projectTaskCount.innerHTML = `${uncompletedTasks.length} ${uncompletedTasks.length > 1 ? 'tasks' : 'task'} remaining`;
  projectTaskCount.classList.add('project-task-count');
  projectCards.appendChild(projectTaskCount);
  const projectCardList = document.createElement('div');
  projectCardList.classList.add('list-group', 'list-group-flush', 'project-task');
  projectCards.appendChild(projectCardList);
  const addTaskBtn = document.createElement('button');
  addTaskBtn.classList.add('btn', 'btn-success', 'btn-medium', 'add-task', 'mt-4');
  addTaskBtn.setAttribute('aria-label', 'create new task');
  addTaskBtn.innerText = 'Add task';
  addTaskBtn.dataset.toggle = 'modal';
  addTaskBtn.dataset.target = '#taskModal';
  projectCards.appendChild(addTaskBtn);
  const removeProject = document.createElement('button');
  removeProject.classList.add('btn', 'btn-danger', 'btn-medium', 'delete-project', 'mt-2');
  removeProject.innerText = 'Delete this project';
  projectCards.appendChild(removeProject);
  const clearCompletedTask = document.createElement('button');
  clearCompletedTask.classList.add('btn', 'btn-light', 'btn-medium', 'setAttribute-task', 'mt-2');
  clearCompletedTask.innerText = 'Clear complete task';
  projectCards.appendChild(clearCompletedTask);


  projectCards.addEventListener('click', projectCardEventHandler);
  removeProject.addEventListener('click', deleteProjectEventHandler);
  projectCardList.addEventListener('click', completedTaskEventhandler);
  clearCompletedTask.addEventListener('click', clearCompletedTaskEventHandler);

  return projectCards;
};
