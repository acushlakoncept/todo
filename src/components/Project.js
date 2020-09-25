import { setStorage } from '../data';

export default (project) => {
  const card = document.createElement('div');
  card.classList.add('card', 'm-2');
  card.innerHTML = `<div class="card-body">
        <div class='d-flex'>
          <h5 class="card-title">${project.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted pb-2 border-bottom"></h6>
            <i class="fas fa-plus plus ml-4" data-name="task" data-toggle="modal" data-target="#taskModal">NT</i>
          </div>
          <ul class='list-group'>
          ${project.tasks.map((task, index) => `
          <li class='list-group-item d-flex align-items-center ${task.completed && 'completed'}'>
          <input class='${task.completed && 'completed'}' type="checkbox" data-taskIndex="${index}">
          <p class="ml-4 mb-0">${task.name}</p>
          <div class="ml-5">
            <i class="fas fa-pen mx-4 pen"></i>
            <i class="far fa-trash-alt trash"></i>
          </div>
          </li>`).join('')}
          </ul>
        </div>`;

  const projectCompletion = card.querySelectorAll('input');
  const editPen = card.querySelector('.pen');
  const deleteBin = card.querySelector('.trash');

  projectCompletion.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.target.classList.toggle('completed');
      e.target.parentElement.classList.toggle('completed');
      const taskIndex = e.target.getAttribute('data-taskIndex');
      project.tasks[taskIndex].completed = !project.tasks[taskIndex].completed;
      setStorage();
    });
  });

  editPen.addEventListener('click', (e) => {

  });
  deleteBin.addEventListener('click', (e) => {

  });


  return card;
};