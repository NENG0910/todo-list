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
    alert("Please Type Input");
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
      todoItem.remove();
    });
    todoItem.style.animation = "scaleDown 0.3s forwards";
  });

  todo.appendChild(text);
  todo.appendChild(time);
  todo.appendChild(completeButoon);
  todo.appendChild(trashButton);
  todo.style.animation = "scaleUp 0.3s forwards";
  section.appendChild(todo);
  form.children[0].value = "";
});
