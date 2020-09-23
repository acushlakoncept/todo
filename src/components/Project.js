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
          ${project.tasks.map((task) => `<li class='list-group-item'>${task.name}</li>`)}
          </ul>
        </div>`;
  return card;
};