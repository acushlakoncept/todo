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


const createTask = () => '<button class="btn btn-primary mt-4 mb-4 text-center" data-name="task" data-toggle="modal" data-target="#taskModal">Create Task</button>';

const quickLinks = (projects) => {
  const quickLinks = document.createElement('div');
  quickLinks.classList.add('quick-links');
  quickLinks.innerHTML = `<h2 class="border-bottom pb-2 title mt-4">Quick Links</h2>
  <nav class="nav flex-column">
    <a id='allTasks' class="nav-link" href="#">All Task</a>
    <a id='todayTasks' class="nav-link" href="#">Today</a>
    <a id='sevenDaysTasks' class="nav-link" href="#">Next 7 Days</a>
  </nav>`;

  const allTaskBtn = quickLinks.querySelector('#allTasks');
  const todayTasksBtn = quickLinks.querySelector('#todayTasks');
  const sevenDaysTasksBtn = quickLinks.querySelector('#sevenDaysTasks');

  allTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();
    projects.forEach((project) => {
      console.log('All', project.allTasks());
    });
  });

  todayTasksBtn.addEventListener('click', (e) => {
    e.preventDefault();
    projects.forEach((project) => {
      console.log('Today', project.todayTasks());
    });
  });

  sevenDaysTasksBtn.addEventListener('click', (e) => {
    e.preventDefault();
    projects.forEach((project) => {
      console.log('Week', project.weekTasks());
    });
  });
  return quickLinks;
};

const lists = (projects) => {
  const lists = document.createElement('div');
  lists.classList.add('quick-links');
  lists.innerHTML = `<h2 class="border-bottom pb-2 title mt-4">Lists <i class="fas fa-plus plus" data-name="project" data-toggle="modal" data-target="#projectModal">A</i></h2>
   <nav class="nav flex-column">
   ${projects.map((project) => `<a class="nav-link" href="#"> ${project.name} <span class="badge badge-light">${project.taskCount
  }</span> </a>`)}
   </nav>`;
  // const addProjectBtn = lists.querySelector('.plus');

  // addProjectBtn.addEventListener('click', () => console.log('Ready To Add'));
  return lists;
};

const generateOptions = (projects) => projects.map((prj, index) => (
  `<option data-index=${index} value=${prj.name}> ${prj.name} </option>`
));

const taskModal = (projects) => {
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
            <input id='name' name='name' type="text" class="form-control" id="task-name" placeholder="Task name" required>
          </div>
          <div class="form-group">
            <select id='project' name='project' class="form-control" id="list-select" required>
              ${generateOptions(projects)}
            </select>
          </div>
          <div class="form-group">
            <input id='description' name='description' type="text" class="form-control" id="task-desc" placeholder="Task decription" required>
          </div>

          <div class="form-group">
            <input id='date' name='date' type="date" class="form-control" id="task-date" required>
          </div>

          <div class="form-group">
          <select id='priority' name='priority' class="form-control" id="priority" required>
            <option value='Low'>Low</option>
            <option value='Medium'>Medium</option>
            <option value='High'>High</option>
          </select>
        </div>

        <div class="form-group">
          <textarea id='note' name='note' class="form-control" id="task-note" rows="3" placeholder="Add Note" required></textarea>
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
    const project = form.querySelector('#project');
    const projectIndex = form.querySelector('#project').options[project.selectedIndex].getAttribute('data-index');

    const foundProject = projects[projectIndex];

    foundProject.addTask(name, date, description, priority, note);
    form.reset();
    document.querySelector('#newTaskFormClose').click();
  });
  return mod;
};

const projectModal = (projectList) => {
  const mod = document.createElement('div');
  mod.classList.add('modal', 'fade');
  mod.id = 'projectModal';
  mod.setAttribute('tabindex', '-1');
  mod.setAttribute('role', 'dialog');
  mod.setAttribute('aria-labelledby', 'dialog');
  mod.setAttribute('role', 'exampleModalLabel');
  mod.setAttribute('aria-hidden', 'true');
  mod.innerHTML = `<div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add New Task</h5>
        <button id='newProjectFormClose' type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id='project-form'>
          <div class="form-group">
            <input id='name' name='name' type="text" class="form-control" id="task-name" placeholder="Project name" required>
          </div>
          
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button id='createProject' type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  `;
  const btn = mod.querySelector('#createProject');
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const form = document.querySelector('#project-form');
    const name = form.querySelector('#name').value;
    console.log(name);
    form.reset();
    projectList.add(name);
    console.log(projectList);
    document.querySelector('#newProjectFormClose').click();
  });
  return mod;
};

const header = (projectList) => {
  const { projects } = projectList;
  const ele = document.createElement('div');
  ele.innerHTML = `<div class="d-flex align-items-center justify-content-between flex-wrap border-bottom pb-2">
  <i class="fas fa-bars toggle-nav"></i>
  <h2 class="title">My TODO</h2>
  </div>
  ${createTask()}`;
  ele.appendChild(quickLinks(projects));
  ele.appendChild(taskModal(projects));
  ele.appendChild(lists(projects));
  ele.appendChild(projectModal(projectList));
  return ele;
};

export default header;
