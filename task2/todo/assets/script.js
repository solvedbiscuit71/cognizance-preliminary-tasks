/* global variables */
const ul = document.getElementById('list')
const form = document.getElementById('form')
const submitBtn = document.getElementById('btn__add')

let nextId = 0
let todoList = []

/* reactivity */
const setTodoList = newList => {
    // when the list is modified it should reflect in the UI

    todoList = newList
}

/* handlers */
const handleSubmit = _ => {

    const head = form.children['head'].value
    if (head === '')
        return

    const body = form.children['body'].value
    const time = form.children[2].children['time'].value

    setTodoList([...todoList, {
        id: nextId++,
        isDone: false,

        head,
        body: body || 'No description provided',
        time: time === '' ? '-' : format(time),

        hasBody: body !== '',
        hasTime: time !== ''
    }])
    form.reset()
}

/* attach event listeners */
submitBtn.addEventListener('click', handleSubmit)
form.addEventListener('submit', e => e.preventDefault())

/* utility functions */
function format(T) {
    const [date,time] = T.split('T')
    const [year, month, day] = date.split('-')
    const [hour24, min] = time.split(':')
    const duration = +hour24 < 12 ? 'AM' : 'PM';
    const hour12 = +hour24 < 12 ? +hour24 : +hour24 % 12

    return `${day}/${month}/${year}, ${hour12 === 0 ? 12 : hour12}:${min} ${duration}`
}