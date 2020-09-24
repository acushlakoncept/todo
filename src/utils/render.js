import projectCard from '../components/Project';

export const renderMain = (arr) => {
  const main = document.querySelector('.main');
  main.innerHTML = '';
  arr.forEach(element => {
    main.appendChild(element);
  });
};


export const renderList = (projects) => {
  const parent = document.querySelector('.projects-nav');
  parent.innerHTML = '';
  projects.map((project, index) => {
    const projectLink = document.createElement('a');
    projectLink.classList.add('nav-link', 'project');
    projectLink.setAttribute('data-index', index);
    projectLink.innerHTML = project.name;
    const linkBadge = document.createElement('span');
    linkBadge.classList.add('badge', 'badge-light');
    linkBadge.textContent = project.tasks.length;
    projectLink.appendChild(linkBadge);
    projectLink.addEventListener('click', (e) => {
      e.preventDefault();
      const index = projectLink.getAttribute('data-index');
      const view = projectCard(projects[index]);
      renderMain([view]);
    });
    parent.appendChild(projectLink);
    return parent;
  });
};
