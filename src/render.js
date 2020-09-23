
export default (content) => {
  const main = document.querySelector('.main');
  main.innerHTML = '';
  console.log('Content', content);
  main.appendChild(content);
};
