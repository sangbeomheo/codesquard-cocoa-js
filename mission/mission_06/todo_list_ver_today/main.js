'use-strict';

class TodoManager {
  constructor(userName) {
    this.userName = userName;
    this.todoList = {};
    this.itemKeyNumber = 1; // start from 1
    this.currentInput = null;
  }

  printName = () => ($userName.textContent = this.userName);

  printToday = () => {
    const today = new Date();
    const weekWords = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const dayOfWeek = weekWords[new Date().getDay()];
    const result = `${month}/${day} - ${dayOfWeek}`;

    $today.textContent = result;
  };

  onInput = (event) => {
    this.currentInput = event.target.value;
    return this.currentInput;
  };

  addListItem = (event) => {
    event.preventDefault();

    if (this.isInputEmpty()) {
      this.alertMessage('내용을 입력해 주세요');
      return;
    }

    if (this.isFull()) {
      this.alertMessage('할 일이 너무 많아요. 10개만 하자...');
      return;
    }

    const itemContent = this.currentInput;
    const itemKey = this.itemKeyNumber;

    this.addTodoList(itemContent, itemKey);
    $list.appendChild(this.makeListItem(itemContent, itemKey));
    this.clearInput();
  };

  isInputEmpty = () => (this.currentInput ? false : true);

  isFull = () => Object.keys(this.todoList).length > 9;

  alertMessage = (message) => {
    alert(message);
    this.clearInput();
  };

  addTodoList = (itemContent, itemKey) => {
    this.todoList[`item${itemKey}`] = {
      status: 'notYet',
      content: itemContent,
      timeStamp: new Date(),
    };
    this.itemKeyNumber++;
  };

  clearInput = () => {
    this.currentInput = null;
    $todoInput.value = null;
    $todoInput.focus();
  };

  deleteItem = (event) => {
    const $listItem = event.target.parentNode;
    const itemClassName = $listItem.className.substring(9);
    delete this.todoList[itemClassName];
    $listItem.remove();
    $todoInput.focus();
  };

  makeListItem(currentInput, itemKey) {
    const $listItem = document.createElement('li');
    const $checkBox = document.createElement('input');
    const $content = document.createElement('span');
    const $deleteBtn = document.createElement('button');

    $listItem.className = `listItem item${itemKey}`;
    $checkBox.className = 'checkBox';
    $content.className = 'content';
    $deleteBtn.className = 'deleteBtn';

    this.makeChild($listItem, $checkBox, $content, $deleteBtn);

    $checkBox.type = 'checkbox';
    $deleteBtn.textContent = '지우기';
    $content.textContent = currentInput;

    $checkBox.addEventListener('click', this.toggleChecked);
    $deleteBtn.addEventListener('click', this.deleteItem);

    return $listItem;
  }

  makeChild = (parent, ...child) => {
    child.forEach((element) => {
      parent.appendChild(element);
    });
    return parent;
  };

  toggleStatus = (itemKey) => {
    if (this.todoList[itemKey].status === 'notYet') {
      this.todoList[itemKey].status = 'done';
    } else if (this.todoList[itemKey].status === 'done') {
      this.todoList[itemKey].status = 'notYet';
    }
  };

  toggleChecked = (event) => {
    const $listItem = event.target.parentNode;
    const contentIndex = 1;
    const $content = $listItem.children[contentIndex];
    const itemClassName = $listItem.className.substring(9);

    this.toggleStatus(itemClassName);
    $content.classList.toggle('checked');
  };

  init = () => {
    $todoInput.addEventListener('input', this.onInput);
    $addBtn.addEventListener('click', this.addListItem);
    this.printName();
    this.printToday();
    this.clearInput();
  };
}

const $userName = document.querySelector('.userName');
const $today = document.querySelector('.today');
const $todoInput = document.querySelector('.todoInput');
const $addBtn = document.querySelector('.addBtn');
const $list = document.querySelector('.list');

const yellowTodo = new TodoManager('Yellow');
yellowTodo.init();
