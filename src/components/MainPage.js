import head from './Header';
import createTaskBtn from './TaskButton';
import projectList from './ProjectList';
import projectCards from './ProjectCard';
import editTaskElement from './EditTask';
import projectModal from './ProjectModal';
import taskModal from './TaskModal';

export default (content) => {
  const page = document.createElement('div');
  const side = document.createElement('div');
  const main = document.createElement('main');

  page.classList.add('row');
  side.classList.add('col-3', 'p-5', 'side-bar');
  main.classList.add('col-9', 'bg-light', 'p-5', 'main', 'd-flex', 'flex-wrap');

  side.appendChild(head());
  side.appendChild(createTaskBtn());
  side.appendChild(projectList());
  main.appendChild(projectCards());
  page.appendChild(side);
  page.appendChild(main);
  content.insertAdjacentElement('beforeend', taskModal());
  content.insertAdjacentElement('beforeend', projectModal());
  content.insertAdjacentElement('beforeend', editTaskElement());

  return page;
};