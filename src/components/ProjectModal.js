export default () => {
  const projectModal = document.createElement('div');
  projectModal.classList.add('modal', 'fade');
  projectModal.id = 'projectModal';
  projectModal.setAttribute('tabindex', '-1');
  projectModal.setAttribute('role', 'dialog');
  projectModal.setAttribute('aria-labelledby', 'dialog');
  projectModal.setAttribute('role', 'exampleModalLabel');
  projectModal.setAttribute('aria-hidden', 'true');
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
  return projectModal;
};
