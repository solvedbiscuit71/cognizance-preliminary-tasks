/* Utils Functions */

function format(T) {
    const [date,time] = T.split('T')
    const [year, month, day] = date.split('-')
    const [hour24, min] = time.split(':')
    const duration = +hour24 < 12 ? 'AM' : 'PM';
    const hour12 = +hour24 < 12 ? +hour24 : +hour24 % 12

    return `${day}/${month}/${year}, ${hour12 === 0 ? 12 : hour12}:${min} ${duration}`
}

function generate(L) {
    const handleDelete = e => {
        const id = e.composedPath()[0].dataset['id']
        setTodoList(todoList.filter(todo => todo.id !== +id))
    }

    const handleDone = e => {
        const id = e.composedPath()[0].dataset['id']
        setTodoList(todoList.map(todo => {
            if (todo.id == id)
                todo.isDone = !todo.isDone
            return todo
        }))
    }

    return L.map(todo => {
        const li = document.createElement('li')
        todo.isDone && li.classList.add('done')

        li.innerHTML = `<button class="checkbox" data-id="${todo.id}"></button><div class="content"><div class="title"><h2>${todo.head}</h2><img class="trash" data-id="${todo.id}" src="./assets/icon-trash.svg" alt="delete"></div><div class="desc"><p>${todo.body}</p><p><span>Deadline: </span> <span>${todo.time}</span></p></div></div>`
        li.getElementsByClassName('trash')[0].addEventListener('click', handleDelete)
        li.getElementsByClassName('checkbox')[0].addEventListener('click', handleDone)

        return li
    })
}

function loadFromStorage(key, value) {
    if (localStorage.getItem(key) == null)
        localStorage.setItem(key, value)
    
    return JSON.parse(localStorage.getItem(key))
}

/* State Variables */

let todoList = []
const setTodoList = newList => {
    const ul = document.getElementById('todos')
    const listMessage = document.getElementById('list__message')
    const tracker = document.getElementById('tracker')

    ul.innerHTML = ''
    generate(newList).forEach(li => {
        ul.appendChild(li)
    });

    if (todoList.length != newList.length && (todoList.length == 0 || newList.length == 0))  {
        listMessage.classList.toggle('hide')
        ul.classList.toggle('hide')
    }
    tracker.innerText = newList.reduce((count, todo) => todo.isDone ? count - 1 : count, newList.length)

    todoList = newList
    localStorage.setItem('todoList', JSON.stringify(todoList))
}

let nextId = 0
const setNextId = newId => {
    nextId = newId
    localStorage.setItem('nextId', JSON.stringify(nextId))
}

setTodoList(loadFromStorage('todoList', '[]'))
setNextId(loadFromStorage('nextId', '0'))


/* Event Listener */

document.getElementById('btn__add').addEventListener('click', _ => {
    const form = document.getElementById('form')

    const head = form.children['head'].value
    if (head === '')
        return

    const body = form.children['body'].value
    const time = form.children[2].children['time'].value

    setTodoList([...todoList, {
        id: nextId,
        isDone: false,

        head: head.length < 42 ? head : head.slice(0,42) + ' ...',
        body: body || 'No Description',
        time: time === '' ? '-' : format(time),
    }])
    setNextId(nextId + 1)

    form.reset()
})

document.getElementById('btn__clear').addEventListener('click', _ => {
    setTodoList(todoList.filter(todo => !todo.isDone))
})

document.getElementById('form').addEventListener('submit', e => e.preventDefault())
