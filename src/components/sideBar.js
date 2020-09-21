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

const header = () => (
  `<div class="d-flex align-items-center justify-content-between flex-wrap">
    <i class="fas fa-bars toggle-nav"></i>
    <h2>My TODO</h2>
  </div>`
);

export default header;