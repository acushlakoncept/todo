const generateOptions = (arr) => arr.map((prj) => `<option> ${prj.name} </option>`);

const taskModal = (options) => `<!-- Modal -->
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
              ${generateOptions(options)}
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

export default taskModal;