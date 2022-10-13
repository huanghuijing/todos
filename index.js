// const todosArray = ['html', 'CSS', 'Javascript', 'React'];
const todos = [
    { name: 'html', isdone: true },
    { name: 'css', isdone: false },
    { name: 'Javescript', isdone: false },
    { name: 'React', isdone: false },
]

const newTodo = document.querySelector('#new-todo');
const todo = document.querySelector('.todo');
const todoStats = document.querySelector('.todo-stats');

newTodo.addEventListener('keydown', changeHanle);

/* 回车输入待办事项 */
function changeHanle(e) {
    if (e.key === "Enter" && this.value !== '') {
        // todosArray.push(e.target.value);
        todos.push({ name: e.target.value, isdone: false })
        console.log(todos);
        render();  //调用更新清单
        this.value = '';
    }
}

function render() {
    console.log(todos)
    todo.innerHTML = '';

    //渲染清单
    const ul = document.createElement('ul');
    ul.setAttribute('id', 'todo-list');
    for (i = 0; i < todos.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = `
                <div class="display">
                <input type="checkbox" class="checkbox" id=${i} ${todos[i].isdone ? 'checked' : ''} />
                <div class="todo-content${todos[i].isdone ? ' checked' : ''}" id=${i}>${todos[i].name}</div>
                <span class="todo-destroy" id=${i}></span>
                </div>`
        ul.appendChild(li)
    }
    todo.appendChild(ul);

    const leftTodos = todos.filter(value => {
        return value.isdone === false;
    });

    //渲染统计栏
    todoStats.innerHTML = `
        <span class="todo-count">
            <span class="number">${leftTodos.length}&nbsp</span>
            <span class="word">${leftTodos.length > 1 ? 'items' : 'item'}</span>&nbspleft.
        </span>`

    const isdoneTodos = todos.filter(value => {
        return value.isdone === true;
    });
    const a = document.createElement('a');
    a.setAttribute('href', '#');
    a.classList.add('active')
    a.innerHTML = `
        Clear&nbsp
        <span class="number-done">${isdoneTodos.length}&nbsp</span>
        <span class="word-done">${isdoneTodos.length > 1 ? 'items' : 'item'}&nbsp</span>
        Completed.`
    todoStats.appendChild(a);
    a.addEventListener('click', clearTodoInSta);

    if (leftTodos.length === 0 && todos.length === 0) {
        todoStats.setAttribute('class', 'todo-stats')
    } else {
        todoStats.setAttribute('class', 'todo-stats active')
    }

    if (isdoneTodos.length === 0) {
        a.classList.remove('active');
    } else {
        a.classList.add('active');
    }

}

todo.addEventListener('click', todoClickHandle);
todo.addEventListener('dblclick', editTodos);

function todoClickHandle(e) {

    switch (e.target.className) {
        case 'todo-content':
            e.target.classList.add('checked');
            e.target.previousElementSibling.checked = true;
            todos[+e.target.id].isdone = true;
            render();
            // console.log(todos)
            break;
        case 'todo-content checked':
            e.target.classList.remove('checked')
            e.target.previousElementSibling.checked = false;
            todos[+e.target.id].isdone = false;
            render();
            break;
        case 'checkbox':
            e.target.nextElementSibling.className = e.target.checked
                ? 'todo-content checked'
                : 'todo-content';
            todos[+e.target.id].isdone = e.target.checked;
            render();
            break;
        case 'todo-destroy':
            // const preUl = document.querySelector('.todo ul');
            // preUl.removeChild(e.target.parentElement.parentElement);
            // const value = e.target.previousElementSibling.outerText;
            // todosArray.forEach((item, index, arr) => item === value ? arr.splice(index) : item)
            todos.splice(+e.target.id, 1)
            render();
            break;
        case 'display':
            break;
    }
}

function editTodos(e) {

}


function clearTodoInSta(e) {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].isdone) {
            todos.splice(i, 1);
            i--;
        }
    }
    render();
}

render();
