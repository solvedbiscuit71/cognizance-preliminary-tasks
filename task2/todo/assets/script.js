/* utils */
const format = _ => {
    const [date,time] = _.split('T')
    const [year, month, day] = date.split('-')
    const [hour24, min] = time.split(':')
    const duration = +hour24 < 12 ? 'AM' : 'PM';
    const hour12 = +hour24 < 12 ? +hour24 : +hour24 % 12

    return `${day}/${month}/${year}, ${hour12 === 0 ? 12 : hour12}:${min} ${duration}`
}

/* handlers */
const handleSubmit = _ => {

    const head = form.children['head'].value
    if (head === '')
        return

    const body = form.children['body'].value
    const time = form.children[2].children['time'].value

    list = [...list, {
        id: nextId++,
        completed: false,

        head,
        body: body || 'No description provided',
        time: time === '' ? '-' : format(time),

        hasBody: body !== '',
        hasTime: time !== ''
    }]
    form.reset()
}

const form = document.getElementById('form')
const submitBtn = document.getElementById('btn__add')

let nextId = 0
let list = []

submitBtn.addEventListener('click', handleSubmit)
form.addEventListener('submit', e => e.preventDefault())