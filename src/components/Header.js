export default () => {
  const head = document.createElement('div');
  head.classList.add(
    'd-flex',
    'align-items-center',
    'justify-content-between',
    'flex-wrap',
    'border-bottom',
    'pb-2',
  );
  const hamburgerMenu = document.createElement('i');
  hamburgerMenu.classList.add('fas', 'fa-bars', 'toggle-nav');
  head.appendChild(hamburgerMenu);
  const appTitle = document.createElement('h2');
  appTitle.innerText = 'My TODO';
  head.appendChild(appTitle);

  return head;
};