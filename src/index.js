import 'bootstrap';
import './css/app.scss';
import sideBar from './components/sideBar';
// import ProjectLists from './components/ProjectList';
// import taskModal from './components/TaskModal';

const content = document.querySelector('#content');

// const projects = new ProjectLists();

// taskModal(projects);

const mainPage = () => (
  `<div class="row">
    <div class="col-2 p-5 side-bar">
      ${sideBar()}
    </div>
    <div class="col-10 bg-light p-5 main">
      <h1>I am Main</h1>
    </div>
  </div>`
);


// content.addEventListener('click', (e) => {
//   const taskBtn = e.target.getAttribute('data-name');
//   if(taskBtn != null) {
//     taskModal();
//   }
// });

const displayPage = () => {
  content.insertAdjacentHTML('beforeend', mainPage());
};

displayPage();
