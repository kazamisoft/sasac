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

      let result = "";
      for (let todoa of arrayForEachSection) {
        let todo = todoa[0];
        // console.log(`typeof todo`, typeof todo);
        // console.log(`todo:`, todo);
        let element = `
          <li class="list-item" id=${todo.todoIdx}>
            <div class="done-text-container">
              <input type="checkbox" name="" id="" class="todo-done" ${todo.status==='C' ? "checked" : ""}>
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

          console.log(`element={`, element, `}`);
          result += element;
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

  console.log(target, targetTagName, eventType, key);

  if (targetTagName === "INPUT" && key === "Enter") {
    createTodo(event.token);
  }
}

async function createTodo(event, token) {
  const contents = event.target.value;
  // 가장 가까운놈
  const type = event.target.closet(".matrix-item").id;

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
    const resp = await axios(config);
    if (resp !== 200) {
      alert(resp.data.message);
      return false;
    }

    readTodo();
    event.target.value = "";
    return true;
  }
  catch (err) {
    console.error(err);
  }

}