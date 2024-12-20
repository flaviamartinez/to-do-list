const tareas = [
	{ id: 1, tarea: "Estudiar para la prueba", done: false },
	{ id: 2, tarea: "Bañar al perro", done: false },
	{ id: 3, tarea: "Hacer la cama", done: false }
]

const btn = document.querySelector("button")
const input = document.getElementById("task")
const idList = document.getElementById("id-list")
const taskList = document.getElementById("task-list")
const taskCount = document.getElementById("task-count")
const doneCount = document.getElementById("done-count")

function generateID(arrayTareas) {
	let uniqueID;
	let exist = true;
	
	while (exist) {
	  uniqueID = Math.floor(Math.random() * 1000) + 1;
	  
	  // Verificamos si el ID existe
	  exist = arrayTareas.some(obj => obj.id === uniqueID);
	}
	
	return uniqueID;
  }

btn.addEventListener('click', () => {
	tareas.push({ id: generateID(tareas), tarea: input.value})
	mostrar()
} 
)

function mostrar(){
	let idHTML = ""
	let taskHTML = ""

	tareas.forEach(tarea => {
		idHTML += `<li>${tarea.id}</li>`
		taskHTML += `<li>${tarea.tarea}</li>`
	})

	idList.innerHTML = idHTML
	taskList.innerHTML = taskHTML

	taskCount.innerHTML = `Total: ${tareas.length}`
	doneCount.innerHTML = `Realizadas: ${tareas.filter(obj => obj.done === true).length}`
}

mostrar()