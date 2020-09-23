import 'bootstrap';
import './css/app.scss';
import sideBar from './components/sideBar';
import ProjectLists from './components/ProjectList';
import render from './render';
// import taskModal from './components/TaskModal';

const content = document.querySelector('#content');

const projectList = new ProjectLists();

// taskModal(projects);
// const as = () => {
//   const rt = document.createElement('p');
//   rt.textContent = 'Here we go';
//   return rt;
// };

const mainPage = () => {
  const page = document.createElement('div');
  const side = document.createElement('div');
  const main = document.createElement('main');

  page.classList.add('row');
  side.classList.add('col-2', 'p-5', 'side-bar');
  main.classList.add('col-10', 'bg-light', 'p-5', 'main');

  side.appendChild(sideBar(projectList));
  main.innerHTML = '<h1>Main Element</h1>';
  page.appendChild(side);
  page.appendChild(main);

  main.addEventListener('', () => console.log('Changed'));
  return page;
};

const displayPage = () => {
  content.appendChild(mainPage());
};

displayPage();
