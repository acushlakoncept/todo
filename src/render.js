
export default (content) => {
  const main = document.querySelector('.main');
  main.innerHTML = '';
  main.appendChild(content);
};
