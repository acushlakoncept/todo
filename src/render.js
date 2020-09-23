
export default (content) => {
  const main = document.querySelector('.main');
  main.innerHTML = 'Na so';
  main.appendChild(content());
};
