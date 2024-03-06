console.log('todo.js');

readTodo();

async function readTodo() {
  // 토큰이 없으면,
  const token = localStorage.getItem("x-access-token");
  if (!token) {
    return;
  }

  // 일정 조회 API
  const config = {
    method: "get",
    url: url + "/todos",
    headers: { "x-access-token": token },
  }

  try {
    const resp = await axios(config);
    if (resp.data.code !== 200) {
      alert(resp.data.message);
      return false;
    }

    const todoDataSet = resp.data.result;
    for (let section in todoDataSet) {
      console.log(`section=`, section);

      const sectionUL = document.querySelector(`#${section} ul`);
      const arrayForEachSection = todoDataSet[section];
      console.log(`arrayForEachSection=`, arrayForEachSection);

      let result = "";
      for (let todoa of arrayForEachSection) {
        console.log(`todoa=>`, todoa);

        for (let todo of todoa) {
          console.log(`todo=>`, todo);
          // let todo = todoa[0];
          // console.log(`typeof todo`, typeof todo);
          // console.log(`todo:`, todo);
          let element = `
          <li class="list-item" id=${todo.todoIdx}>
            <div class="done-text-container">
              <input type="checkbox" name="" id="" class="todo-done" ${
                todo.status === "C" ? "checked" : ""
              }>
              <p class="todo-text">
              ${todo.contents}
              </p>
            </div>
            <!-- list item -->
            <div class="update-delete-container">
              <i class="todo-update fas fa-pencil-ruler"></i>
              <i class="todo-delete fas fa-trash"></i>
            </div>
          </li>`;

          // console.log(`element={`, element, `}`);
          result += element;
        }
      }
      sectionUL.innerHTML = result;
    }
  }
  catch (err) {
    console.error(err);
  }
}

// 
const matrixContainer = document.querySelector(".matrix-container");
matrixContainer.addEventListener("keypress", cudControlller);
matrixContainer.addEventListener("click", cudControlller);

// Create, Update, Delete
function cudControlller(event) {
  const token = localStorage.getItem("x-access-token");
  if (!token) {
    return;
  }

  console.log(event);
  const target = event.target;
  const targetTagName = target.tagName;
  const eventType = event.type;
  const key = event.key;

  console.log(`target====>`, target, targetTagName, eventType, key);

  // create
  if (targetTagName === "INPUT" && key === "Enter") {
    createTodo(event, token);
    return;
  }

  // update status
  if (target.className == "todo-done" && eventType === "click") {
    updateTodoDone(event, token);
    return;
  }

  // contents
  const firstClassName = target.className.split(" ")[0];
  console.log(`firstClassName=>`, firstClassName);
  if (firstClassName === "todo-update" && eventType === "click") {
    updateTodoContents(event, token);
    return;
  }

  // delete
  if (firstClassName === "todo-delete" && eventType === "click") {
    deleteTodo(event, token);
    return;
  }
}

async function createTodo(event, token) {
  const contents = event.target.value;
  // 가장 가까운놈
  const type = event.target.closest(".matrix-item").id;

  // 
  if (!contents) {
    return;
  }

  const config = {
    method: "post",
    url: url + "/todo",
    headers: { "x-access-token": token },
    data: {
      contents: contents,
      type: type
    }
  }

  try {
    console.log(`post /todo`);
    const resp = await axios(config);
    if (resp !== 200) {
      alert(resp.data.message);
      return false;
    }

    // console.log(`readTodo`);
    readTodo();
    event.target.value = "";
    return true;
  }
  catch (err) {
    console.error(err);
  }
}

// 일정수정
async function updateTodoDone(event, token) {
  const status = event.target.checked === true ? 'C' : 'A';
  const todoIdx = event.target.closest(".list-item").id;
  const contents = "";

  const config = {
    method: "patch",
    url: url + "/todo",
    headers: { "x-access-token": token },
    data: {
      todoIdx: todoIdx,
      status: status
    },
  };

  try {
    console.log(`patch /todo`);
    const resp = await axios(config);
    if (resp !== 200) {
      alert(resp.data.message);
      return false;
    }

    readTodo();
    location.reload();
    return true;
  }
  catch (err) {
    console.error(err);
  }

}

async function updateTodoContents(event, token) {
  const todoIdx = event.target.closest(".list-item").id;
  const contents = prompt("내용을 입력해주세요");

  const config = {
    method: "patch",
    url: url + "/todo",
    headers: { "x-access-token": token },
    data: {
      todoIdx: todoIdx,
      contents: contents
    },
  };

  try {
    console.log(`patch /todo`);
    const resp = await axios(config);
    if (resp !== 200) {
      alert(resp.data.message);
      return false;
    }

    readTodo();
    return true;
  }
  catch (err) {
    console.error(err);
  }

}

// 일정삭제
async function deleteTodo(event, token) {
  const isValidReq = confirm(
    "삭제하시겠습니까?"
  )

  if (isValidReq !== true) {
    return;
  }

  const todoIdx = event.target.closest(".list-item").id;

  const config = {
    method: "delete",
    url: url + `/todo/${todoIdx}`,
    headers: { "x-access-token": token },
    data: {
      todoIdx: todoIdx,
    },
  };

  try {
    console.log(`delete /todo`);
    const resp = await axios(config);
    if (resp !== 200) {
      alert(resp.data.message);
      return false;
    }

    readTodo();
    location.reload();
    return true;
  }
  catch (err) {
    console.error(err);
  }

}