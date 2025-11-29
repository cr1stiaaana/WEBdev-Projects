// incarcam task-urile din localstorage sau initializam lista goala
let tasks = JSON.parse(localStorage.getItem('tasks')) || []
let currentFilter = 'all'

// referinte la elementele html
const taskInput = document.getElementById('taskInput')
const addBtn = document.getElementById('addBtn')
const tasksContainer = document.getElementById('tasksContainer')
const totalTasksEl = document.getElementById('totalTasks')
const completedTasksEl = document.getElementById('completedTasks')
const remainingTasksEl = document.getElementById('remainingTasks')
const themeToggle = document.getElementById('themeToggle')
const deleteAllBtn = document.getElementById('deleteAllBtn')

// adauga task la apasarea butonului
addBtn.addEventListener('click', addTask)

// adauga task la apasarea enter in input
taskInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') addTask()
})

// comuta tema light/dark
themeToggle.addEventListener('click', toggleTheme)

// filtreaza task-urile la apasarea butoanelor de filtrare
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter
    renderTasks()
  })
})

// adauga un nou task in lista
function addTask() {
  const text = taskInput.value.trim()
  if (!text) return
  tasks.push({ id: Date.now(), text, completed: false })
  taskInput.value = ''
  saveTasks()
  renderTasks()
}

// marcheaza un task ca terminat sau neterminat
function toggleComplete(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  )
  saveTasks()
  renderTasks()
}

// sterge un task individual
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id)
  saveTasks()
  renderTasks()
}

// permite editarea textului unui task
function editTask(id) {
  const task = tasks.find(t => t.id === id)
  if (!task) return

  const span = document.querySelector(`[data-id=\"${id}\"] .task-text`)
  if (!span) return

  span.contentEditable = true
  span.focus()

  const range = document.createRange()
  range.selectNodeContents(span)
  const selection = window.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)

  function finishEdit() {
    const newText = span.textContent.trim()
    span.contentEditable = false
    if (newText && newText !== task.text) {
      task.text = newText
      saveTasks()
      renderTasks()
    } else {
      span.textContent = task.text
    }
  }

  span.addEventListener('blur', finishEdit, { once: true })
  span.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      span.blur()
    }
  }, { once: true })
}

// returneaza task-urile filtrate
function getFilteredTasks() {
  if (currentFilter === 'completed') {
    return tasks.filter(t => t.completed)
  } else if (currentFilter === 'uncompleted') {
    return tasks.filter(t => !t.completed)
  }
  return tasks
}

// afiseaza toate task-urile in pagina
function renderTasks() {
  tasksContainer.innerHTML = ''

  const filteredTasks = getFilteredTasks()

  filteredTasks.forEach(task => {
    const taskDiv = document.createElement('div')
    taskDiv.className = 'task-item' + (task.completed ? ' completed' : '')
    taskDiv.setAttribute('data-id', task.id)

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.className = 'task-checkbox'
    checkbox.checked = task.completed
    checkbox.addEventListener('change', () => toggleComplete(task.id))

    const span = document.createElement('span')
    span.className = 'task-text'
    span.textContent = task.text

    const btnGroup = document.createElement('div')
    btnGroup.style.display = 'flex'
    btnGroup.style.gap = '8px'

    const editBtn = document.createElement('button')
    editBtn.className = 'edit-btn'
    editBtn.textContent = 'Edit'
    editBtn.title = 'edit task'
    editBtn.addEventListener('click', () => editTask(task.id))

    const deleteBtn = document.createElement('button')
    deleteBtn.className = 'delete-btn'
    deleteBtn.textContent = 'Delete'
    deleteBtn.title = 'delete task'
    deleteBtn.addEventListener('click', () => deleteTask(task.id))

    btnGroup.appendChild(editBtn)
    btnGroup.appendChild(deleteBtn)

    taskDiv.appendChild(checkbox)
    taskDiv.appendChild(span)
    taskDiv.appendChild(btnGroup)

    tasksContainer.appendChild(taskDiv)
  })

  updateStats()
}

// actualizeaza statisticile
function updateStats() {
  const total = tasks.length
  const completed = tasks.filter(t => t.completed).length
  const remaining = total - completed

  totalTasksEl.textContent = total
  completedTasksEl.textContent = completed
  remainingTasksEl.textContent = remaining
}

// salveaza in localstorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// comuta intre modurile light si dark
function toggleTheme() {
  document.body.classList.toggle('dark-mode')
  const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light'
  localStorage.setItem('theme', theme)
}

// aplica tema salvata anterior
function applyStoredTheme() {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark') {
    document.body.classList.add('dark-mode')
  }
}

// sterge toate task-urile
deleteAllBtn.addEventListener('click', () => {
  if (tasks.length === 0) return
  const confirmDelete = confirm('Are you sure you want to delete all tasks?')
  if (confirmDelete) {
    tasks = []
    saveTasks()
    renderTasks()
  }
})

// pornim aplicatia
applyStoredTheme()
renderTasks()
