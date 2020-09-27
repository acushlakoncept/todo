export default () => {
  const projectList = document.createElement('div');
  projectList.classList.add('project-links');
  const projectListTitle = document.createElement('h2');
  projectListTitle.classList.add('border-bottom', 'pb-2', 'title', 'mt-4');
  projectListTitle.innerHTML = 'Projects <i class="fas fa-plus plus ml-4 btn-success p-1 rounded" data-name="project" data-toggle="modal" data-target="#projectModal"></i>';
  projectList.appendChild(projectListTitle);
  const projectNav = document.createElement('nav');
  projectNav.classList.add('nav', 'flex-column', 'projects-nav');
  projectList.appendChild(projectNav);

  return projectList;
};