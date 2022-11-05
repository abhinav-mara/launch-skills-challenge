// Create empty array that will contain all tasks
let todoList = []
let possibleStatus = ['New', 'Working on', 'Finished']
let taskID = 0 // created in order to easily manage deleting, reorganizing, editings tasks

// Create a factory function for created tasks (objects for the todoList)
let taskCreator = (title, description, dateCreated, dateDue, status) => {
    if (possibleStatus.includes(status)) {
        taskID++
        // FIX: Consider checking for the typeof arguments before setting them as well?
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
                if (typeof newStatus === 'string') {
                    this._status = newStatus 
                }
            },
            get id() {
                if (typeof this._id === 'number') {
                    console.log('passed conditional')
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
    let newTask = taskCreator(title, description, dateCreated, dateDue, status)
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
            for (let j = i; j < todoList.length-1; j++) {
                todoList[j] = todoList[j+1];
            }
        }
    }
    todoList.pop()
}


// display the entire todoList in order
function displayTodoList() {
    for (let i = 0; i < todoList.length; i++) {
        console.log(`Task ID: ${todoList[i].id}\n Task Title: ${todoList[i].title}\n Description: ${todoList[i].description}\n Date Created: ${todoList[i].dateCreated}\n Date Due: ${todoList[i].dateDue}\n Status: ${todoList[i].status}`)
    }
}


// reorganize the list based on ids
function reorganize(type, id1, id2=null, position=null) {
    if (type === 'swap') {
        if (id2 !== null) {
            swap(id1, id2)
        }
        else {
            console.log('\'id2\' argument does not exist, must pass in arguments \'id1\' and \'id2\'')
        }
    }
    else if (type === 'shift') {
        if (position !== null) {
            shift(id1, position)
        }
        else {
            console.log('\'position\' argument not defined, must define what position task is to be shited to')
        }
    }
    else if (type === 'toEnd') {
        toEnd(id1)
    }
    else if (type === 'toBeginning') {
        toBeginning(id1)
    }
    else {
        console.log('Invalid \'type\'\n\'type\' value must be \'swap\', \'shift\', \'toEnd\', \'toBeginning\'')
    }
}

function swap(id1, id2) {
    // Check to see if the tasks are present through checking all ids in todoList and return function if both of them are not present
    let id1Present = false
    let id2Present = false
    for (let i = 0; i < todoList.length; i++) {
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
    for (let i = 0; i < todoList.length; i++) {
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

// FIX: Edit function so that you can move the task up or down a certain number of positions instead of moving it to a certain position
function shift(id1, position) {
    // check to make sure the position value is within the bounds of the todoList array (this check is done in position values not index values)
    if (position > todoList.length) {
        console.log(`Position does not exist within ToDo-List, please choose a value in the range 1-${todoList.length} (inclusive)`)
        return
    }
    else if (position < 1) {
        console.log(`Position does not exist within ToDo-List, please choose a value in the range 1-${todoList.length} (inclusive)`)
        return
    }
    // check to make sure id exists in todoList
    let id1Present = false
    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].id == id1) {
            id1Present = true
        }
    }
    if (id1Present == false) {
        console.log('Id does not exist within todoList')
        return
    }
    // passed checks
    else {
        for (let i = 0; i < todoList.length; i++) {
            if (todoList[i].id == id1) {
                // convert position to index
                let index = position - 1
                if (index >= todoList.length) {
                    console.log(`The position you want to shift the task to is invalid, choose a position value between 1-${todoList.length}`)
                }
                else if (index <= -1) {
                    console.log(`The position you want to shift the task to is invalid, choose a position value between 1-${todoList.length}`)
                }
                else {
                    let taskToBeShifted = todoList[i]
                    if (index < i) {
                        for (let j = i; j > pos; j--) {
                            todoList[j] = todoList[j-1]
                        }
                    }
                    else if (index > i) {
                        for (let j = i; j < pos; j++) {
                            todoList[j] = todoList[j+1]
                        }
                    }
                    else {
                        console.log('The task is already in the position you want it to be in')
                    }
                    todoList[index] = taskToBeShifted
                    break
                }
            }
        }
    }
}

// FIX: change argument in 'shift' so that it is update to with the how the shift function should be
function toEnd(id1) {
    shift(id1, todoList.length)
}

// FIX: change argument in 'shift' so that it is update to with the how the shift function should be
function toBeginning(id1) {
    shift(id1, 1)
}
