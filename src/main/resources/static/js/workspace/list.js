class WorkspaceManager {
    constructor() {
        this.workspaceList = [];
    }

    updateWorkspaceList(workspaces) {
      this.workspaceList = workspaces;
      this.renderWorkspaceList();
    }

    updateWorkspace(updatedWorkspace) {
        this.workspaceList = this.workspaceList.map((workspace) => {
            if (workspace['id'] == updatedWorkspace['id']) {
                workspace['name'] = updatedWorkspace['name'];
            }
            return workspace;
        });
        this.renderWorkspaceList();
    }

    addWorkspace(workspace) {
        this.workspaceList.push(workspace);
        this.renderWorkspaceList();
    }

    renderWorkspaceList() {
            const $workspaceList = document.getElementById("workspace-list");
            $workspaceList.innerHTML = '';
            this.workspaceList.forEach((workspace) => {
                const $workspace = this.createWorkspaceCard(workspace);
                $workspaceList.appendChild($workspace);
            });
    }

    createWorkspaceCard(workspace) {
            const $workspace = document.createElement("div");
            $workspace.className = "card";
            $workspace.innerHTML = `
                <h3>${workspace.name}</h3>
                <div class="card-buttons">
                    <button class="btn btn-primary edit-btn">Edit</button>
                    <button class="btn btn-danger delete-btn">Delete</button>
                </div>
            `;
            $workspace.querySelector(".edit-btn").addEventListener("click", (event) => {
                event.stopPropagation();
                this.editWorkspace(workspace);
            });
            $workspace.querySelector(".delete-btn").addEventListener("click", (event) => {
                event.stopPropagation();
                this.deleteWorkspace(workspace);
            });
            $workspace.addEventListener("click", () => location.href = `/testcases?workspaceId=${workspace['id']}`);
            return $workspace;
    }

    editWorkspace(workspace) {
        document.getElementById("action").value = 'update';
        document.getElementById("workspace-name").value = workspace['name'];
        document.getElementById("workspaceId").value = workspace['id'];
        modal.style.display = "block"
    }

    deleteWorkspace(workspace) {
        if(!confirm('삭제하시겠습니까?')) {
            return;
        }
        apiClient.delete(`/api/workspaces/${workspace['id']}`, () => {
            const index = this.workspaceList.indexOf(workspace);
            if (index > -1) {
                    this.workspaceList.splice(index, 1);
                    this.renderWorkspaceList();
                }
            })
        }
}

const submitWorkspace = (workspaceManager) => {
    const name = document.getElementById("workspace-name").value
    const action = document.getElementById("action").value
    const workspaceId = document.getElementById("workspaceId").value
    if(action === 'create') {
        apiClient.post('/api/workspaces', {name}, (data) => createSuccess(data, workspaceManager))
    } else {
        apiClient.put(`/api/workspaces/${workspaceId}`, { name }, (data) => updateSuccess(data, workspaceManager));
    }
}

const createSuccess = (data, workspaceManager) => {
    document.getElementById('workspace-form').reset();
    modal.style.display = "none"
    workspaceManager.addWorkspace(data);
}

const updateSuccess = (data, workspaceManger) => {
    document.getElementById('workspace-form').reset();
    modal.style.display = "none"
    workspaceManger.updateWorkspace(data);
}

document.addEventListener("DOMContentLoaded", () => {

    const workspaceManager = new WorkspaceManager();

    const addCardButton = document.getElementById("add-card")
    const modal = document.getElementById("modal")
    const closeModal = document.getElementsByClassName("close")[0]
    const submitButton = document.getElementById("submit-button");

    addCardButton.addEventListener("click", () => {
      modal.style.display = "block";
      document.getElementById("action").value = "create";
    })

    closeModal.addEventListener("click", () => {
      modal.style.display = "none"
    })

    window.addEventListener("click", (event) => {
      if (event.target == modal) {
        modal.style.display = "none"
      }
    })
    submitButton.addEventListener("click", () => submitWorkspace(workspaceManager));


    apiClient.get('/api/workspaces', {}, (data) => workspaceManager.updateWorkspaceList(data));
  })
  
  
  