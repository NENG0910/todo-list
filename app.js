let section = document.querySelector("section");
let add = document.querySelector("form button");

add.addEventListener("click", (e) => {
  e.preventDefault();

  //get input value
  let form = e.target.parentElement;
  let todoText = form.children[0].value;
  let todoMonth = form.children[1].value;
  let todoDate = form.children[2].value;

  if (todoText === "") {
    alert("Please Enter some Text");
    return;
  }

  let todo = document.createElement("div");
  todo.classList.add("todo");
  let text = document.createElement("p");
  text.classList.add("todo-text");
  text.innerText = todoText;
  let time = document.createElement("p");
  time.classList.add("todo-time");
  time.innerText = todoMonth + "/" + todoDate;

  //CDN font awesome
  let completeButoon = document.createElement("button");
  completeButoon.classList.add("complete");
  completeButoon.innerHTML = '<i class="fa-solid fa-check"></i>';
  completeButoon.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement;
    todoItem.classList.toggle("done");
  });

  let trashButton = document.createElement("button");
  trashButton.classList.add("trash");
  trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  trashButton.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement;
    todoItem.addEventListener("animationend", () => {
      //remove from loaclstorage
      let text = todoItem.children[0].innerText;
      let myListArray = JSON.parse(localStorage.getItem("list"));

      myListArray.forEach((item, index) => {
        if (item.todoText == text) {
          myListArray.splice(index, 1);
          localStorage.setItem("list", JSON.stringify(myListArray));
        }
      });
      todoItem.remove();
    });
    todoItem.style.animation = "scaleDown 0.3s forwards";
  });

  todo.appendChild(text);
  todo.appendChild(time);
  todo.appendChild(completeButoon);
  todo.appendChild(trashButton);
  todo.style.animation = "scaleUp 0.3s forwards";

  let myTodo = {
    todoText: todoText,
    todoMonth: todoMonth,
    todoDate: todoDate,
  };

  let myList = localStorage.getItem("list");
  if (myList == null) {
    localStorage.setItem("list", JSON.stringify([myTodo]));
  } else {
    let myListArray = JSON.parse(myList);
    myListArray.push(myTodo);
    localStorage.setItem("list", JSON.stringify(myListArray));
  }

  console.log(JSON.parse(localStorage.getItem("list")));

  section.appendChild(todo);
  form.children[0].value = "";
});

//Load data from localstorage
let myList = localStorage.getItem("list");
{
  if (myList !== null) {
    let myListArray = JSON.parse(myList);
    myListArray.forEach((item) => {
      let todo = document.createElement("div");
      todo.classList.add("todo");
      let text = document.createElement("p");
      text.classList.add("todo-text");
      text.innerText = item.todoText;
      let time = document.createElement("p");
      time.classList.add("todo-time");
      time.innerText = item.todoMonth + "/" + item.todoDate;
      todo.appendChild(text);
      todo.appendChild(time);

      //completeButton
      let completeButoon = document.createElement("button");
      completeButoon.classList.add("complete");
      completeButoon.innerHTML = '<i class="fa-solid fa-check"></i>';
      completeButoon.addEventListener("click", (e) => {
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle("done");
      });

      //trashButton
      let trashButton = document.createElement("button");
      trashButton.classList.add("trash");
      trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
      trashButton.addEventListener("click", (e) => {
        let todoItem = e.target.parentElement;
        todoItem.addEventListener("animationend", () => {
          //remove from loaclstorage
          let text = todoItem.children[0].innerText;
          let myListArray = JSON.parse(localStorage.getItem("list"));

          myListArray.forEach((item, index) => {
            if (item.todoText == text) {
              myListArray.splice(index, 1);
              localStorage.setItem("list", JSON.stringify(myListArray));
            }
          });

          todoItem.remove();
        });
        todoItem.style.animation = "scaleDown 0.3s forwards";
      });

      todo.appendChild(completeButoon);
      todo.appendChild(trashButton);
      section.append(todo);
    });
  }
}
