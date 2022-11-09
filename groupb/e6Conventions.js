// Create empty array that will contain all tasks
let todoList = []
const possibleStatus = ['New', 'Working on', 'Finished']
let taskID = 0 // created in order to easily manage deleting, reorganizing, editings tasks

// Create a factory function for created tasks (objects for the todoList)
const taskCreator = (title, description, dateCreated, dateDue, status) => {
  if (possibleStatus.includes(status) && 
  typeof title === 'string' &&
  typeof description === 'string' &&
  typeof dateCreated === 'string' &&
  typeof dateDue === 'string') {
    taskID = taskID + 1
    return {
      _title: title,
      _description: description,
      _dateCreated: dateCreated,
      _dateDue: dateDue,
      _status: status,
      _id: taskID,
      get title() {
        if (typeof this._title === 'string') {
          return this._title
        }
      },
      set title(newTitle) {
        if (typeof newTitle === 'string') {
          this._title = newTitle 
        }
      },
      get description() {
        if (typeof this._description === 'string') {
          return this._description
        }
      },
      set description(newDescription) {
        if (typeof newDescription === 'string') {
          this._description = newDescription 
        }
      },
      get dateCreated() {
        if (typeof this._dateCreated === 'string') {
          return this._dateCreated
        }
      },
      set dateCreated(newDateCreated) {
        if (typeof newDateCreated === 'string') {
          this._dateCreated = newDateCreated 
        }
      },
      get dateDue() {
        if (typeof this._dateDue === 'string') {
          return this._dateDue
        }
      },
      set dateDue(newDateDue) {
        if (typeof newDateDue === 'string') {
          this._dateDue = newDateDue 
        }
      },
      get status() {
        if (typeof this._status === 'string') {
          return this._status
        }
      },
      set status(newStatus) {
        if (typeof newStatus === 'string' && possibleStatus.includes(newStatus)) {
          this._status = newStatus 
        }
      },
      get id() {
        if (typeof this._id === 'number') {
          return this._id
        }
      },
    }
  }
  console.log('Recheck parameters, all must be a string and the status can only be either New, Working on, or Finished')
  return
}

// create a function that creates a task and add that task to the todolist
function createAndAddToList(title, description, dateCreated, dateDue, status) {
  const newTask = taskCreator(title, description, dateCreated, dateDue, status)
  if (newTask == undefined) {
    return
  }
  todoList.push(newTask)
}


// delete a task given the id of the task
function deleteTask(id) {
  // Check that id exists
  let idPresent = false
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id == id) {
      idPresent = true
    }
  }
  if (idPresent == false) {
    console.log('Id does not exist in todoList')
    return
  }

  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id == id) {
      for (let j = i; j < todoList.length-1; j = j + 1) {
        todoList[j] = todoList[j+1];
      }
    }
  }
  todoList.pop()
}


// display the entire todoList in order
function displayTodoList() {
  for (let i = 0; i < todoList.length; i = i + 1) {
    console.log(`Task ID: ${todoList[i].id}\n Task Title: ${todoList[i].title}\n Description: ${todoList[i].description}\n Date Created: ${todoList[i].dateCreated}\n Date Due: ${todoList[i].dateDue}\n Status: ${todoList[i].status}`)
  }
}

function swap(id1, id2) {
  // Check to see if the tasks are present through checking all ids in todoList and return function if both of them are not present
  let id1Present = false
  let id2Present = false
  for (let i = 0; i < todoList.length; i = i + 1) {
    if (todoList[i].id == id1) {
      id1Present = true
    }
    else if (todoList[i] == id2) {
      id2Present = true
    }
  }

  if (id1Present == false || id2Present == false) {
    console.log('One of the ids you have passed are not present in the todoList')
    return
  }

  // passed check, now swap the positions of the two tasks
  let task1;
  let task1Position;
  let task2Position;
  for (let i = 0; i < todoList.length; i = i + 1) {
    if (todoList[i].id == id1) {
      task1 = todoList[i]
      task1Position = i
    }
    if (todoList[i].id == id2) {
      task2Position = i
    }
  }

  todoList[task1Position] = todoList[task2Position]
  todoList[task2Position] = task1
}

function shift(id1, magnitude, direction) {
  // search for position of id1 in todoList
  let taskPosition = -1
  let taskToBeShifted;
  for (let i = 0; i < todoList.length; i = i + 1) {
    if (todoList[i].id === id1) {
      taskPosition = i
      taskToBeShifted = todoList[i]
    }
  }

  // if task does not exist based on id
  if (taskPosition === -1) {
    console.log('No task with that id does not exist')
    return
  }

  // determine if the magnitude of movement based on direction is within the bounds of the array
  if (direction === 'up') {
    console.log('Cannot move task that far up (falls out of bounds), the task will be moved to the first position')
    if (taskPosition - magnitude < 0) {
      magnitude = taskPosition;
    }
  }
  else if (direction === 'down') {
    console.log('Cannot move task that far down (falls out of bounds), the task will be moved to the last position')
    if (taskPosition + magnitude >= todoList.length) {
      magnitude = todoList.length - taskPosition 
    }
  }
  else {
    console.log('\'direction\' value can only be \'up\' or \'down\' (case-sensitive)')
    return
  }

  if (direction === 'up') {
    for (let i = 0; i < magnitude; i = i + 1) {
      todoList[taskPosition] = todoList[taskPosition-1]
      taskPosition--
    }
  }
  else {
    for (let i = 0; i < magnitude; i = i + 1) {
      todoList[taskPosition] = todoList[taskPosition+1]
      taskPosition++
    }
  }
  todoList[taskPosition] = taskToBeShifted

  let newList = []
  for (let i = 0; i < todoList.length; i = i + 1) {
    if (todoList[i] !== undefined) {
      newList.push(todoList[i])
    }
  }
  todoList = newList
}

// TODO: Must make new function
function toEnd(id1) {
  shift(id1, todoList.length, 'down')
}

// TODO: Must make a new function
function toBeginning(id1) {
  shift(id1, todoList.length, 'up')
}

// to edit function
function editTask(id, prop, edit) {
  let taskPosition 
  for (let i = 0; i < todoList.length; i = i + 1) {
    if (todoList[i].id === id) {
      taskPosition = i
    }
  }

  let task = todoList[taskPosition]

  switch (prop) {
    case 'title':
      task.title = edit
      break
    case 'description':
      task.description = edit
      break
    case 'dateCreated':
      task.dateCreated = edit
      break
    case 'dateDue':
      task.dateDue = edit
      break
    case 'status':
      task.status = edit
      break
    default:
      break
  }
}

function find(prop, query) {
  let id
  switch (prop) {
    case 'title':
      for (let i = 0; i < todoList.length; i = i + 1) {
        if (todoList[i].title == query) {
          id = todoList[i].id
        }
      }
      break
    case 'description':
      for (let i = 0; i < todoList.length; i = i + 1) {
        if (todoList[i].description == query) {
          id = todoList[i].id
        }
      }
      break
    case 'description':
      for (let i = 0; i < todoList.length; i = i + 1) {
        if (todoList[i].dateCreated == query) {
          id = todoList[i].id
        }
      }
      break
    case 'description':
      for (let i = 0; i < todoList.length; i = i + 1) {
        if (todoList[i].dateDue == query) {
          id = todoList[i].id
        }
      }
      break
    default:
      break
  }
  return id
}
