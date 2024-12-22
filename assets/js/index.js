const tareas = [
	{ id: 1, tarea: "Estudiar para la prueba", done: false },
	{ id: 2, tarea: "Bañar al perro", done: false },
	{ id: 3, tarea: "Hacer la cama", done: false }
]

const btn = document.querySelector("button")
const input = document.getElementById("task")
const taskCount = document.getElementById("task-count")
const doneCount = document.getElementById("done-count")
const elementosList = document.querySelector(".elementos")


function generateID(arrayTareas) {
	let uniqueID;
	let exist = true;
	
	while (exist) {
	  uniqueID = Math.floor(Math.random() * 1000) + 1;
	  
	  exist = arrayTareas.some(obj => obj.id === uniqueID);
	}
	
	return uniqueID;
  }

btn.addEventListener('click', () => {
	tareas.push({ id: generateID(tareas), tarea: input.value, done: false})
	renderTasks()
} 
)

function renderTasks(){
	let html = ""
	tareas.forEach(tarea => {
		html += `<div class="elemento"><p>${tarea.id}</p>`
		html += `<p>${tarea.tarea}</p>`
		html += `<input type="checkbox" class="task-checkbox" data-id="${tarea.id}" ${tarea.done ? "checked" : ''}>`
		html += `<button class="task-btn" data-id="${tarea.id}">Eliminar</button></div>`
	})

	elementosList.innerHTML = html

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

