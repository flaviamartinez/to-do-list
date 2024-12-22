const tareas = [
	{ id: 1, tarea: "Estudiar para la prueba", done: false },
	{ id: 2, tarea: "Bañar al perro", done: false },
	{ id: 3, tarea: "Hacer la cama", done: false }
]

const btn = document.querySelector("button")
const input = document.getElementById("task-input")
const taskCount = document.getElementById("task-count")
const doneCount = document.getElementById("done-count")
const tasksList = document.querySelector(".tasks")


function generateID(arrayTasks) {
	let uniqueID;
	let exist = true;
	
	while (exist) {
	  uniqueID = Math.floor(Math.random() * 100) + 1;
	  
	  exist = arrayTasks.some(obj => obj.id === uniqueID);
	}
	
	return uniqueID;
  }

btn.addEventListener('click', () => {
	if (input.value.trim() != ''){
		tareas.push({ id: generateID(tareas), tarea: input.value, done: false})
	
		renderTasks()
	}
}
)

function renderTasks(){
	let html = ""

	tareas.forEach(tarea => {
		html += `<div class="task">`
		html += `<p>${tarea.id}</p>`
		html += `<p>${tarea.tarea}</p>`
		html += `<div class="modify-task">
				<input type="checkbox" class="task-checkbox" data-id="${tarea.id}" ${tarea.done ? "checked" : ''}>
				<button class="task-btn" data-id="${tarea.id}">Eliminar</button>
			</div>`
		html += `</div>`

	})

	tasksList.innerHTML = html

	attachCheckboxEvents()

	attachBtnEvents()

	taskCount.innerHTML = `Total: ${tareas.length}`
	doneCount.innerHTML = `Realizadas: ${tareas.filter(obj => obj.done === true).length}`

}


function attachCheckboxEvents() {
	const checkboxes = document.querySelectorAll('.task-checkbox');
	
	checkboxes.forEach(checkbox => {
	  checkbox.addEventListener('change', (c => {
		const taskId = Number(c.target.dataset.id);
  
		const taskSelected = tareas.find(tarea => tarea.id === taskId);
  
		if (taskSelected) {
		  taskSelected.done = c.target.checked;
		  console.log(taskSelected)
		}

		doneCount.innerHTML = `Realizadas: ${tareas.filter(obj => obj.done === true).length}`
	  })
	)
	})
}

function attachBtnEvents() {
	const taskBtn = document.querySelectorAll(".task-btn")

	taskBtn.forEach(button => {
		button.addEventListener('click', (b => {
			const taskID = Number(b.target.dataset.id)

			const index = tareas.findIndex(tarea => tarea.id === taskID)

			tareas.splice(index, 1)

			renderTasks()
		}))
	}

	)
}

renderTasks()

