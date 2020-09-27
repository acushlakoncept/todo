/* eslint-disable no-alert */
import {
  saveAndRender, createTask, createProject, renderTaskCount, renderProjects,
} from '../utils/common';
import store, { LOCAL_STORAGE_PROJECT_ID_KEY, save } from '../utils/data';

let projects = store();
let selectedProjectId = LOCAL_STORAGE_PROJECT_ID_KEY;


export const editTaskEventHandler = () => {
  const editTaskElement = document.querySelector('#editTaskModal');

  editTaskElement.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskName = e.target.elements[0].value;
    const taskDesc = e.target.elements[1].value;
    const taskDate = e.target.elements[2].value;
    const taskPriority = e.target.elements[3].value;
    const taskNote = e.target.elements[4].value;
    const taskId = e.target.elements[5].value;

    const currentProject = projects.find(
      (project) => project.id === selectedProjectId,
    );
    const currentTask = currentProject.tasks.find((task) => task.id === taskId);
    currentTask.name = taskName;
    currentTask.description = taskDesc;
    currentTask.date = taskDate;
    currentTask.priority = taskPriority;
    currentTask.note = taskNote;

    saveAndRender();
    editTaskElement.querySelector('[data-dismiss="modal"]').click();
  });
};

export const projectCardEventHandler = () => {
  const projectCards = document.querySelector('.project-card');
  const editTaskElement = document.querySelector('#editTaskModal');

  projectCards.addEventListener('click', (e) => {
    if (e.target.classList.contains('task-edit')) {
      const taskId = e.target.parentNode.firstElementChild.id;
      const currentProject = projects.find(
        (project) => project.id === selectedProjectId,
      );
      const currentTask = currentProject.tasks.find((task) => task.id === taskId);
      editTaskElement.querySelector('#taskName').value = currentTask.name;
      editTaskElement.querySelector('#taskDesc').value = currentTask.description;
      editTaskElement.querySelector('#taskDate').value = currentTask.date;
      editTaskElement.querySelector('#taskPriority').value = currentTask.priority;
      editTaskElement.querySelector('#taskNote').value = currentTask.note;
      editTaskElement.querySelector('#taskId').value = taskId;
    }
  });
};

export const projectModalEventHandler = () => {
  const projectModal = document.querySelector('#projectModal');

  projectModal.addEventListener('submit', (e) => {
    e.preventDefault();
    const projectName = e.target.children[0].children[0].value;
    if (projectName == null || projectName === '') return;

    const project = createProject(projectName);
    e.target.children[0].children[0].value = null;
    projects.push(project);
    saveAndRender(projects, selectedProjectId);
    projectModal.querySelector('[data-dismiss="modal"]').click();
    renderProjects();
  });
};

export const projectAddEventHandler = () => {
  const projectModalButton = document.querySelector('.plus');

  projectModalButton.addEventListener('click', (e) => {
    e.preventDefault();
    projectModalEventHandler();
  });
};

export const projectListEventHandler = () => {
  const projectList = document.querySelector('.project-links');
  const createTaskBtn = document.querySelector('#createNewTaskBtn');


  projectList.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'a') {
      selectedProjectId = e.target.dataset.projectId;
      createTaskBtn.dataset.target = '#taskModal';
      saveAndRender(projects, selectedProjectId);
    }
  });
};

export const deleteProjectEventHandler = () => {
  const deleteProjectBtn = document.querySelector('.delete-project');
  const createTaskBtn = document.querySelector('#createNewTaskBtn');

  deleteProjectBtn.addEventListener('click', () => {
    projects = projects.filter((project) => project.id !== selectedProjectId);
    selectedProjectId = null;
    createTaskBtn.dataset.target = '';
    saveAndRender();
  });
};

export const createTaskEventHandler = () => {
  const taskModal = document.querySelector('#task-form');

  taskModal.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!selectedProjectId) {
      document.querySelector('[data-dismiss="modal"]').click();
      return alert('select a project first');
    }
    const taskName = e.target.elements[0].value;
    const taskDesc = e.target.elements[1].value;
    const taskDate = e.target.elements[2].value;
    const taskPriority = e.target.elements[3].value;
    const taskNote = e.target.elements[4].value;
    if (
      taskName == null
      || taskName === ''
      || taskDate == null
      || taskDate === ''
      || taskDesc == null
      || taskDesc === ''
      || taskPriority == null
      || taskPriority === ''
    ) return null;

    const task = createTask(taskName, taskDate, taskDesc, taskPriority, taskNote);
    e.target.reset();
    const selectedProject = projects.find(
      (project) => project.id === selectedProjectId,
    );
    selectedProject.tasks.push(task);
    taskModal.querySelector('[data-dismiss="modal"]').click();
    saveAndRender(projects, selectedProject.id);
    return null;
  });
};

export const createTaskBtnEventHandler = () => {
  const createTaskBtn = document.querySelector('#createNewTaskBtn');

  createTaskBtn.addEventListener('click', () => {
    if (selectedProjectId === null) {
      alert('Select a project first');
    }
    createTaskEventHandler();
  });
};

export const clearCompletedTaskEventHandler = () => {
  const clearCompletedTaskBtn = document.querySelector('.clear-task');
  clearCompletedTaskBtn.addEventListener('click', () => {
    const selectedProject = projects.find(
      (project) => project.id === selectedProjectId,
    );
    selectedProject.tasks = selectedProject.tasks.filter(
      (task) => !task.complete,
    );
    saveAndRender();
  });
};

export const completedTaskEventhandler = () => {
  const completeTaskInput = document.querySelector('.project-task');

  completeTaskInput.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'input') {
      const selectedProject = projects.find(
        (project) => project.id === selectedProjectId,
      );
      const selectedTask = selectedProject.tasks.find(
        (task) => task.id === e.target.id,
      );
      selectedTask.complete = e.target.checked;
      save(projects, selectedProjectId);
      renderTaskCount(selectedProject);
    }
  });
};