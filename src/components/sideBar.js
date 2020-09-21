const sideBar = document.querySelector('.side-bar');

const closeSidenav = () => {
  const hamburger = document.querySelector('.toggle-nav');
  hamburger.addEventListener('click', () => {
    sideBar.classList.toggle('col-1');
    sideBar.classList.toggle('col-2');
  });
};

const hamburger = () => {
  const bars = document.createElement('i');
  bars.classList.add('fas', 'fa-bars', 'toggle-nav');
};

const createTask = () => (
  '<button class="btn btn-primary mt-4 mb-4 text-center">Create Task</button>'
);

const quickLinks = () => (
  `<div class="quick-links">
      <h2 class="border-bottom pb-2 title mt-4">Quick Links</h2>
      <nav class="nav flex-column">
        <a class="nav-link" href="#">All Task</a>
        <a class="nav-link" href="#">Today</a>
        <a class="nav-link" href="#">Next 7 Days</a>
      </nav>
  </div>
  `
)

const lists = () => (
  `<div class="quick-links">
      <h2 class="border-bottom pb-2 title mt-4">Lists</h2>
      <nav class="nav flex-column">
        <a class="nav-link" href="#">Personal <span class="badge badge-light">1</span> </a>
        <a class="nav-link" href="#">Work <span class="badge badge-light">4</span> </a>
        <a class="nav-link" href="#">Grocery <span class="badge badge-light">2</span> </a>
      </nav>
  </div>
  `
)

const header = () => (
  `<div class="d-flex align-items-center justify-content-between flex-wrap border-bottom pb-2">
    <i class="fas fa-bars toggle-nav"></i>
    <h2 class="title">My TODO</h2>
  </div>
  ${createTask()}
  ${quickLinks()}
  ${lists()}
  `
);

export default header;