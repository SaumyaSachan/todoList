const addBtn = document.getElementById("addBtn");
const newTaskInput = document.getElementById("newTaskInput");
const tasksContainer = document.getElementById("tasksContainer");

const updateTaskCount = () => {
    const taskCount = document.querySelectorAll('.task').length;
    const countValue = document.querySelector('.count-value');
    countValue.textContent = taskCount;
};

const addTask = () => {
    const taskName = newTaskInput.value.trim();

    if (taskName !== "") {
        const task = `<div class="task">
            <input type="checkbox" class="task-check">
            <span class="taskname">${taskName}</span>
            <button class="edit">
                <i class="fa fa-pen-to-square"></i>
            </button>
            <button class="delete">
                <i class="fa fa-trash"></i>
            </button>
        </div>`;

        tasksContainer.insertAdjacentHTML("beforeend", task);
        updateTaskCount();

        const deleteButtons = document.querySelectorAll(".delete");
        deleteButtons.forEach((button) => {
            button.addEventListener("click", () => {
                button.parentNode.remove();
                updateTaskCount();
            });
        });

        const editButtons = document.querySelectorAll(".edit");
        editButtons.forEach((editBtn) => {
            editBtn.addEventListener("click", (e) => {
                let targetElement = e.target;
                if (!(e.target.className === "edit")) {
                    targetElement = e.target.parentElement;
                }
                newTaskInput.value = targetElement.previousElementSibling?.innerText;
                targetElement.parentNode.remove();
                updateTaskCount();
            });
        });

        const tasksCheck = document.querySelectorAll(".task-check");
        tasksCheck.forEach((checkBox) => {
            checkBox.addEventListener("change", () => {
                const taskName = checkBox.nextElementSibling;
                taskName.classList.toggle("completed", checkBox.checked);
                updateTaskCount();
            });
        });

        newTaskInput.value = "";
    }
};

addBtn.addEventListener("click", addTask);

window.addEventListener("load", loadTasksFromLocalStorage);

function displayCount(count) {
    console.log("Task count:", count);
}
