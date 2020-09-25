import { renderList, renderMain } from '../utils/render';
import projectCard from './Project';

const generateOptions = (arr, projectName) => {
  arr.map((prj) => `<option slected=${projectName === prj.name}> ${prj.name} </option>`);
};

const taskModal = (projects, index) => {
  const project = projects[index];
  const mod = document.createElement('div');
  mod.classList.add('modal', 'fade');
  mod.id = 'taskModal';
  mod.setAttribute('tabindex', '-1');
  mod.setAttribute('role', 'dialog');
  mod.setAttribute('aria-labelledby', 'dialog');
  mod.setAttribute('role', 'exampleModalLabel');
  mod.setAttribute('aria-hidden', 'true');
  mod.innerHTML = `<div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add New Task</h5>
        <button id='newTaskFormClose' type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        
        <form id='task-form'>
          <div class="form-group">
            <input id='name' name='name' type="text" class="form-control" id="task-name" value=${project.name} placeholder="Task name" required>
          </div>
          <div class="form-group">
            <select name='project' class="form-control" id="list-select" required>
              ${project ? generateOptions(projects, project.name) : generateOptions(projects)}
            </select>
          </div>
          <div class="form-group">
            <input id='description' name='description' type="text" class="form-control" id="task-desc" value=${project.description}  placeholder="Task decription" required>
          </div>

          <div class="form-group">
            <input id='date' name='date' type="date" class="form-control" id="task-date" value=${project.date}  required>
          </div>

          <div class="form-group">
          <select id='priority' name='priority' class="form-control" id="priority" required>
            <option value='Low'>Low</option>
            <option value='Medium'>Medium</option>
            <option value='High'>High</option>
          </select>
        </div>

        <div class="form-group">
          <textarea id='note' name='note' class="form-control" id="task-note" rows="3" placeholder="Add Note" value=${project.note}  required></textarea>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button id='createTask' type="submit" class="btn btn-primary">Submit</button>
        </div>
        </form>
    </div>
    </div>
  </div>
  `;
  const btn = mod.querySelector('#createTask');
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const form = document.querySelector('#task-form');
    const name = form.querySelector('#name').value;
    const description = form.querySelector('#description').value;
    const priority = form.querySelector('#priority').value;
    const date = form.querySelector('#date').value;
    const note = form.querySelector('#note').value;
    const project = form.querySelector('#list-select');
    const projectIndex = form.querySelector('#list-select').options[project.selectedIndex].getAttribute('data-index');

    const foundProject = projects[projectIndex];
    foundProject.addTask({
      name, date, description, priority, note,
    });
    form.reset();
    document.querySelector('#newTaskFormClose').click();
    renderList(projects);
    const foundProjectCard = projectCard(foundProject);
    renderMain([foundProjectCard]);
  });
  return mod;
};
export default taskModal;