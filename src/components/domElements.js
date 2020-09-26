const createTaskBtn = document.createElement("button");
createTaskBtn.classList.add(
  "btn",
  "btn-primary",
  "mt-4",
  "mb-4",
  "text-center"
);
createTaskBtn.dataset.name = "task";
createTaskBtn.dataset.toggle = "modal";
createTaskBtn.dataset.target = "#taskModal";
createTaskBtn.innerText = "Create Task";

const head = document.createElement("div");
head.classList.add(
  "d-flex",
  "align-items-center",
  "justify-content-between",
  "flex-wrap",
  "border-bottom",
  "pb-2"
);
const hamburgerMenu = document.createElement("i");
hamburgerMenu.classList.add("fas", "fa-bars", "toggle-nav");
head.appendChild(hamburgerMenu);
const appTitle = document.createElement("h2");
appTitle.innerText = "My TODO";
head.appendChild(appTitle);

// const quickLinks = document.createElement("div");
// quickLinks.classList.add("quick-links");
// quickLinks.innerHTML = `<h2 class="border-bottom pb-2 title mt-4">Quick Links</h2>
// <nav class="nav flex-column">
//   <a id='allTasks' class="nav-link" href="#">All Task</a>
//   <a id='todayTasks' class="nav-link" href="#">Today</a>
//   <a id='weeklyTasks' class="nav-link" href="#">This Week</a>
// </nav>`;

const projectList = document.createElement("div");
projectList.classList.add("project-links");
const projectListTitle = document.createElement('h2')
projectListTitle.classList.add('border-bottom', 'pb-2', 'title', 'mt-4')
projectListTitle.innerHTML = `Projects <i class="fas fa-plus plus ml-4 btn-success p-1 rounded" data-name="project" data-toggle="modal" data-target="#projectModal"></i>`;
projectList.appendChild(projectListTitle)
const projectNav = document.createElement("nav");
projectNav.classList.add('nav', 'flex-column', 'projects-nav')
projectList.appendChild(projectNav)


const modalElement = document.createElement("div");
modalElement.classList.add("modal", "fade");
modalElement.id = "taskModal";
modalElement.setAttribute("tabindex", "-1");
modalElement.setAttribute("role", "dialog");
modalElement.setAttribute("aria-labelledby", "dialog");
modalElement.setAttribute("role", "exampleModalLabel");
modalElement.setAttribute("aria-hidden", "true");
modalElement.innerHTML = `<div class="modal-dialog" role="document">
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
            <input name='name' type="text" class="form-control" id="task-name" placeholder="Task name" required>
          </div>

          <div class="form-group">
            <input id='description' name='description' type="text" class="form-control" id="task-desc" placeholder="Task decription" required>
          </div>

          <div class="form-group">
            <input id='date' name='date' type="date" class="form-control" id="task-date" required>
          </div>

          <div class="form-group">
          <select name='priority' class="form-control" id="priority" required>
            <option value='Low'>Low</option>
            <option value='Medium'>Medium</option>
            <option value='High'>High</option>
          </select>
        </div>

        <div class="form-group">
          <textarea name='note' class="form-control" id="task-note" rows="3" placeholder="Add Note" required></textarea>
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

const editTaskElement = document.createElement("div");
editTaskElement.classList.add("modal", "fade");
editTaskElement.id = "editTaskModal";
editTaskElement.setAttribute("tabindex", "-1");
editTaskElement.setAttribute("role", "dialog");
editTaskElement.setAttribute("aria-labelledby", "dialog");
editTaskElement.setAttribute("role", "exampleModalLabel");
editTaskElement.setAttribute("aria-hidden", "true");
editTaskElement.innerHTML = `<div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Update Task</h5>
        <button id='newTaskFormClose' type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        
        <form id='taskForm'>
          <div class="form-group">
            <input name='name' type="text" class="form-control" id="taskName" placeholder="Task name" required>
          </div>

          <div class="form-group">
            <input name='description' type="text" class="form-control" id="taskDesc" placeholder="Task decription" required>
          </div>

          <div class="form-group">
            <input name='date' type="date" class="form-control" id="taskDate" required>
          </div>

          <div class="form-group">
          <select name='priority' class="form-control" id="taskPriority" required>
            <option value='Low'>Low</option>
            <option value='Medium'>Medium</option>
            <option value='High'>High</option>
          </select>
        </div>

        <div class="form-group">
          <textarea name='note' class="form-control" id="taskNote" rows="3" placeholder="Add Note" required></textarea>
        </div>

        <input name='task-id' type="hidden" id="taskId">

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button id='UpdateTask' type="submit" class="btn btn-primary">Submit</button>
        </div>
        </form>
    </div>
    </div>
  </div>
  `;

const projectModal = document.createElement("div");
projectModal.classList.add("modal", "fade");
projectModal.id = "projectModal";
projectModal.setAttribute("tabindex", "-1");
projectModal.setAttribute("role", "dialog");
projectModal.setAttribute("aria-labelledby", "dialog");
projectModal.setAttribute("role", "exampleModalLabel");
projectModal.setAttribute("aria-hidden", "true");
projectModal.innerHTML = `<div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add New Project</h5>
          <button id='newProjectFormClose' type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form id='project-form'>
            <div class="form-group">
              <input data-project-name-input id='name' name='name' type="text" class="form-control" placeholder="Project name" required>
            </div>
            
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button id='createProject' type="submit" data-project-form-submit class="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    `;
    
const projectCards = document.createElement("div");
projectCards.classList.add("card", "project-card");
const projectCardHead = document.createElement("div");
projectCardHead.classList.add("card-header");
projectCardHead.innerText = "Default";
projectCards.appendChild(projectCardHead);
const projectTaskCount = document.createElement('p')
projectTaskCount.classList.add('project-task-count')
projectCards.appendChild(projectTaskCount)
const projectCardList = document.createElement("div");
projectCardList.classList.add("list-group", "list-group-flush", "project-task");
projectCards.appendChild(projectCardList);
const addTaskBtn = document.createElement('button')
addTaskBtn.classList.add('btn', 'btn-success', 'btn-medium', 'add-task', 'mt-4')
addTaskBtn.setAttribute('aria-label', 'create new task')
addTaskBtn.innerText = 'Add task'
addTaskBtn.dataset.toggle = "modal";
addTaskBtn.dataset.target = "#taskModal";
projectCards.appendChild(addTaskBtn)
const removeProject = document.createElement('button')
removeProject.classList.add('btn', 'btn-danger', 'btn-medium', 'delete-project', 'mt-2')
removeProject.innerText = 'Delete this project'
projectCards.appendChild(removeProject)
const clearCompletedTask = document.createElement('button')
clearCompletedTask.classList.add('btn', 'btn-light', 'btn-medium', 'clear-task', 'mt-2')
clearCompletedTask.innerText = 'Clear complete task'
projectCards.appendChild(clearCompletedTask)


const mainPage = () => {
  const page = document.createElement("div");
  const side = document.createElement("div");
  const main = document.createElement("main");

  page.classList.add("row");
  side.classList.add("col-3", "p-5", "side-bar");
  main.classList.add("col-9", "bg-light", "p-5", "main", "d-flex", "flex-wrap");

  side.appendChild(head);
  side.appendChild(createTaskBtn);
  // side.appendChild(quickLinks);
  side.appendChild(projectList);
  main.appendChild(projectCards);
  page.appendChild(side);
  page.appendChild(main);
  content.insertAdjacentElement("beforeend", modalElement);
  content.insertAdjacentElement("beforeend", projectModal);
  content.insertAdjacentElement("beforeend", editTaskElement);

  return page;
};


export {
  createTaskBtn,
  projectList,
  modalElement,
  projectCards,
  projectModal,
  editTaskElement,
  mainPage
};
