/* eslint-disable no-alert */
import 'bootstrap';
import './css/app.scss';
import {
  saveAndRender, createProject, createTask, render,
} from './utils/common';
import mainPage from './components/MainPage';

import store from './utils/data';
import { createTaskBtnEventHandler, projectModalEventHandler } from './components/Listeners';

const content = document.querySelector('#content');

const projects = store();

const displayPage = () => {
  const main = mainPage(content);
  content.appendChild(main);
};

const createDefaultProject = () => {
  const project = createProject('Default Project');
  if (!projects.length) {
    const todaysDate = new Date().toISOString().slice(0, 10);
    const task = createTask(
      'Default Task',
      todaysDate,
      'A brief description',
      'Low',
      'Default task note',
    );
    project.tasks.push(task);
    projects.push(project);

    saveAndRender(projects, project.id);
  }
};

window.addEventListener('load', () => {
  displayPage();
  createDefaultProject();
  render();
  createTaskBtnEventHandler();
  projectModalEventHandler();
});
