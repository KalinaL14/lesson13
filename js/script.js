'use strict'

console.log('rnj pltcm&')

const todoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const todoList = document.querySelector('.todo-list')
const todoCompleted = document.querySelector('.todo-completed')

let toDoData = []

const setMassiveStorage = function () {
  localStorage.setItem('newData', JSON.stringify(toDoData))
}
const getMassiveStorage = function () {
  localStorage.getItem('newData')
  toDoData =  JSON.parse(localStorage.getItem('newData'))
  render()
}

const render = function () {
  todoList.innerHTML = ''
  todoCompleted.innerHTML = ''
  toDoData.forEach(function (item) {
    const li = document.createElement('li')
    li.classList.add('todo-item')
    li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
    '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
	    '<button class="todo-complete"></button>' +
	  '</div>'

    if (li.innerText !== '') {
      if (item.completed) {
        todoCompleted.append(li)
      } else {
        todoList.append(li)
      }
    }


    li.querySelector('.todo-complete').addEventListener('click', function () {
      item.completed = !item.completed
      render()
    })
    li.querySelector('.todo-remove').addEventListener('click', function () {
      let itemIndex = toDoData.indexOf(item)
      toDoData.splice(itemIndex, 1)
      render()
    })
    setMassiveStorage()
  })
}

todoControl.addEventListener('submit', function (event) {
  event.preventDefault()

  const newToDo = {
    text: headerInput.value,
    completed: false,
  }
  toDoData.push(newToDo)
  headerInput.value = ''

  render()
})
getMassiveStorage()
