const sideBar = document.querySelector(".side-bar");

const closeSidenav = () => {
  const hamburger = document.querySelector(".toggle-nav");
  hamburger.addEventListener("click", () => {
    sideBar.classList.toggle("col-1");
    sideBar.classList.toggle("col-2");
  });
};

const hamburger = () => {
  const bars = document.createElement("i");
  bars.classList.add("fas", "fa-bars", "toggle-nav");
};

const createTask = () =>
  '<button class="btn btn-primary mt-4 mb-4 text-center" data-name="task" data-toggle="modal" data-target="#taskModal">Create Task</button>';

const quickLinks = () =>
  `<div class="quick-links">
      <h2 class="border-bottom pb-2 title mt-4">Quick Links</h2>
      <nav class="nav flex-column">
        <a class="nav-link" href="#">All Task</a>
        <a class="nav-link" href="#">Today</a>
        <a class="nav-link" href="#">Next 7 Days</a>
      </nav>
  </div>
  `;

const lists = () =>
  `<div class="quick-links">
      <h2 class="border-bottom pb-2 title mt-4">Lists</h2>
      <nav class="nav flex-column">
        <a class="nav-link" href="#">Personal <span class="badge badge-light">1</span> </a>
        <a class="nav-link" href="#">Work <span class="badge badge-light">4</span> </a>
        <a class="nav-link" href="#">Grocery <span class="badge badge-light">2</span> </a>
      </nav>
  </div>
  `;

const taskModal = () =>
  `
  <!-- Modal -->
<div class="modal fade" id="taskModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add New Task</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        
        <form>
          <div class="form-group">
            <input type="text" class="form-control" id="task-name" placeholder="Task name">
          </div>
          <div class="form-group">
            <select class="form-control" id="list-select">
              <option>Work</option>
              <option>Business</option>
              <option>Grocery</option>
            </select>
          </div>
          <div class="form-group">
            <input type="text" class="form-control" id="task-desc" placeholder="Task decription">
          </div>

          <div class="form-group">
            <input type="date" class="form-control" id="task-date" >
          </div>

          <div class="form-group">
          <select class="form-control" id="priority">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div class="form-group">
          <textarea class="form-control" id="task-note" rows="3" placeholder="Add Note"></textarea>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
        </form>
    </div>
    </div>
  </div>
  </div>
  `;

const header = () =>
  `<div class="d-flex align-items-center justify-content-between flex-wrap border-bottom pb-2">
    <i class="fas fa-bars toggle-nav"></i>
    <h2 class="title">My TODO</h2>
  </div>
  ${createTask()}
  ${quickLinks()}
  ${lists()}
  ${taskModal()}
  `;

export default header;
