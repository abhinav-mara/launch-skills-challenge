// Create empty array that will contain all tasks
let todoList = [];
// create an array of the only possible answers to the status of a task
const possibleStatus = ['New', 'Working on', 'Finished'];
// created in order to easily manage deleting, reorganizing, editings tasks
let taskID = 0;

// Create a factory function for created tasks (objects for the todoList)
const taskCreator = (title, description, dateCreated, dateDue, status) => {
  // make a validation checks to make sure that the values are of the proper data type and valid inputs
  if (possibleStatus.includes(status) && 
  typeof title === 'string' &&
  typeof description === 'string' &&
  typeof dateCreated === 'string' &&
  typeof dateDue === 'string') {
    // create the task, first update the taskID
    taskID = taskID + 1;
    // create the task content
    return {
      // set the properties as private with '_'
      _title: title,
      _description: description,
      _dateCreated: dateCreated,
      _dateDue: dateDue,
      _status: status,
      _id: taskID,
      // create getters and setters, and make sure to have validation to checks to make sure the data is the proper type
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
      // do not create a setter because the id should not be changed under any circumstance
      get id() {
        if (typeof this._id === 'number') {
          return this._id
        }
      },
    };
  }
  // give feedback is something is wrong
  console.log('Recheck parameters, all must be a string and the status can only be either New, Working on, or Finished');
  return
}

// create a function that creates a task and add that task to the todolist
function createAndAddToList(title, description, dateCreated, dateDue, status) {
  // create the task
  const newTask = taskCreator(title, description, dateCreated, dateDue, status);
  // if the task was not created, then just return (prevents the task from being .push() to the array
  if (newTask == void 0) {
    return;
  }
  todoList.push(newTask);
}


// a task given the id of the task
function deleteTask(id) {
  // Check that id exists
  let idPresent = false;
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id == id) {
      // if id is present, then change the boolean to true
      idPresent = true;
    }
  }
  // if boolean was not changed (false), that means id of the task is not there, therefore the task does not exist
  if (idPresent == false) {
    console.log('Id does not exist in todoList');
    return;
  }

  // update the array so that it moves up the array (replaces the task meant to be deleted)
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id == id) {
      for (let j = i; j < todoList.length-1; j = j + 1) {
        todoList[j] = todoList[j+1];
      }
    }
  }
  // pop the last value in remove an 'undefined' space in the array to manage memory more efficiently
  todoList.pop();
}


// display the entire todoList in order
function displayTodoList() {
  // iterate over every task in todoList
  for (let i = 0; i < todoList.length; i = i + 1) {
    // print out a formatted string into the console
    console.log(`Task ID: ${todoList[i].id}\n Task Title: ${todoList[i].title}\n Description: ${todoList[i].description}\n Date Created: ${todoList[i].dateCreated}\n Date Due: ${todoList[i].dateDue}\n Status: ${todoList[i].status}`);
  }
}

// swapping the position of two tasks
function swap(id1, id2) {
  // Check to see if the tasks are present through checking all ids in todoList and return function if both of them are not present
  let id1Present = false;
  let id2Present = false;
  // check to see if both ids are present (indicating that both tasks exist)
  for (let i = 0; i < todoList.length; i = i + 1) {
    if (todoList[i].id == id1) {
      id1Present = true;
    }
    else if (todoList[i] == id2) {
      id2Present = true;
    }
  }

  // if either one of the does not exist, the break out of the function and console.log some information about the break
  if (id1Present == false || id2Present == false) {
    console.log('One of the ids you have passed are not present in the todoList');
    return;
  }

  // passed check, now swap the positions of the two tasks
  
  // task1 is a temporary variable that holds one task, and the other two variables are the positions of the tasks
  let task1;
  let task1Position;
  let task2Position;
  // set the values of the previous three variables that have been declared but not initialized
  for (let i = 0; i < todoList.length; i = i + 1) {
    if (todoList[i].id == id1) {
      task1 = todoList[i];
      task1Position = i;
    }
    if (todoList[i].id == id2) {
      task2Position = i;
    }
  }

  // carry out the swap
  todoList[task1Position] = todoList[task2Position];
  todoList[task2Position] = task1;
}

// shift a task up or down a certain number of times (that is the magnitude, a magnitude of 2 means to move the task up or down 2 times)
function shift(id1, magnitude, direction) {
  // search for position of id1 in todoList by first declaring and/or initializing holder variables
  let taskPosition = -1;
  let taskToBeShifted;
  // find the proper task and the position
  for (let i = 0; i < todoList.length; i = i + 1) {
    if (todoList[i].id === id1) {
      taskPosition = i;
      taskToBeShifted = todoList[i];
    }
  }

  // if task does not exist based on id, then break out of the function
  if (taskPosition === -1) {
    console.log('No task with that id does not exist');
    return;
  }

  // determine if the magnitude of movement based on direction is within the bounds of the array and if its not then log why and set values to max
  if (direction === 'up') {
    console.log('Cannot move task that far up (falls out of bounds), the task will be moved to the first position');
    if (taskPosition - magnitude < 0) {
      magnitude = taskPosition;
    }
  }
  else if (direction === 'down') {
    console.log('Cannot move task that far down (falls out of bounds), the task will be moved to the last position');
    if (taskPosition + magnitude >= todoList.length) {
      magnitude = todoList.length - taskPosition;
    }
  }
  // argument is not correct, then print it out and break out
  else {
    console.log('\'direction\' value can only be \'up\' or \'down\' (case-sensitive)');
    return;
  }

  // shift the entire list the proper way the proper amount
  if (direction === 'up') {
    for (let i = 0; i < magnitude; i = i + 1) {
      todoList[taskPosition] = todoList[taskPosition-1];
      taskPosition = taskPosition - 1;
    }
  }
  else {
    for (let i = 0; i < magnitude; i = i + 1) {
      todoList[taskPosition] = todoList[taskPosition+1];
      taskPosition = taskPosition + 1;
    }
  }
  // set task the new position it should be in
  todoList[taskPosition] = taskToBeShifted;

  // shifting array creates undefined values, so a new list is created that only has values that are not undefined
  let newList = [];
  for (let i = 0; i < todoList.length; i = i + 1) {
    if (todoList[i] !== void 0) {
      newList.push(todoList[i]);
    }
  }
  // set the todoList to the newList
  todoList = newList;
}

// to move task to the end
function toEnd(id1) {
  shift(id1, todoList.length, 'down');
}

// to move the task to the top
function toBeginning(id1) {
  shift(id1, todoList.length, 'up');
}

// to edit function
function editTask(id, prop, edit) {
  // find the task
  let taskPosition;
  for (let i = 0; i < todoList.length; i = i + 1) {
    if (todoList[i].id === id) {
      taskPosition = i;
    }
  }

  // set the to-be edited task
  let task = todoList[taskPosition];

  // edit the task property
  switch (prop) {
    case 'title':
      task.title = edit;
      break;
    case 'description':
      task.description = edit;
      break;
    case 'dateCreated':
      task.dateCreated = edit;
      break;
    case 'dateDue':
      task.dateDue = edit;
      break;
    case 'status':
      task.status = edit;
      break;
    default:
      break;
  }
}

// function determine the id of a task
function find(prop, query) {
  // declare id variable abnd set it to the default value (return value if the id does not exist)
  let id = -1;
  // set the correct id value through for-loops checking the property on each task
  switch (prop) {
    case 'title':
      for (let i = 0; i < todoList.length; i = i + 1) {
        if (todoList[i].title == query) {
          id = todoList[i].id;
        }
      }
      break;
    case 'description':
      for (let i = 0; i < todoList.length; i = i + 1) {
        if (todoList[i].description == query) {
          id = todoList[i].id;
        }
      }
      break;
    case 'description':
      for (let i = 0; i < todoList.length; i = i + 1) {
        if (todoList[i].dateCreated == query) {
          id = todoList[i].id;
        }
      }
      break;
    case 'description':
      for (let i = 0; i < todoList.length; i = i + 1) {
        if (todoList[i].dateDue == query) {
          id = todoList[i].id;
        }
      }
      break;
    default:
      break;
  }
  // return the id value
  return id;
}
