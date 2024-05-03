//selectors
const app = document.querySelector("#app");
const textInput = document.querySelector("#textInput");
const addBtn = document.querySelector("#addBtn");
const listGroup = document.querySelector("#listGroup");
const doneCount = document.querySelector("#doneCount");
const totalCount = document.querySelector("#totalCount");
const listTemplate = document.querySelector("#listTemplate");

//function

const updateCounter = () => {
  totalCount.innerText = countListTotal();
  doneCount.innerText = countDoneListTotal();
};
const countListTotal = () => {
  return document.querySelectorAll(".list").length;
};
const countDoneListTotal = () => {
  return document.querySelectorAll(".list .list-checkbox:checked").length;
};
const createList = (text) => {
  const list = listTemplate.content.cloneNode(true);
  const listText = list.querySelector(".list-text");
  const listDelBtn = list.querySelector(".list-del-btn");
  const listCheckBox = list.querySelector(".list-checkbox");
  const listEditBtn = list.querySelector(".list-edit-btn");

  listText.innerText = text;

  // listDelBtn.addEventListener("click", deleteList);
  // listCheckBox.addEventListener("change", checkList);
  // listEditBtn.addEventListener("click", editList);

  // listEditBtn.addEventListener("click", () => {
  //   const input = document.createElement("input");
  //   input.className = "px-2 border border-zinc-700 focus-visible:outline-none";
  //   input.value = listText.innerText;
  //   listText.after(input);
  //   input.focus();
  //   listText.classList.add("hidden");
  //   input.addEventListener("blur", () => {
  //     listText.innerText = input.value;
  //     input.remove();
  //     listText.classList.toggle("hidden");
  //   });
  // });

  // listDelBtn.addEventListener("click", () => {
  //   // if (confirm("Are you sure to delete?")) {
  //   //   list.remove();
  //   //   //   totalCount.innerText = parseInt(totalCount.innerText) - 1;
  //   // }
  //   confirm("Are you sure to delete?") && list.remove();
  //   updateCounter();
  // });

  // listCheckBox.addEventListener("click", () => {
  //   console.log("you checked");
  //   listText.classList.toggle("line-through");
  //   updateCounter();
  // });

  return list;
};

//handlers
const addList = () => {
  //add to ui
  listGroup.append(createList(textInput.value));
  //   totalCount.innerText = parseInt(totalCount.innerText) + 1;
  updateCounter();
  //clear
  textInput.value = null;
};

const deleteList = (event) => {
  const list = event.target.closest(".list");
  if (confirm("Are you sure to delete?")) {
    list.classList.remove("animate__shakeX");
    list.classList.add("animate__flipOutY");

    const removeList = () => {
      list.removeEventListener("animationend", removeList);
      list.remove();
      updateCounter();
    };

    list.addEventListener("animationend", removeList);
  }
  // console.log(event.target);
  // console.log("U delete");
};

const checkList = (event) => {
  const listText = event.target.nextElementSibling;
  listText.classList.toggle("line-through");
  updateCounter();
  // console.dir(event.target);
};

const editList = (event) => {
  const list = event.target.closest(".list");
  const listText = list.querySelector(".list-text");

  const input = document.createElement("input");
  input.className = "px-2 border border-zinc-700 focus-visible:outline-none";
  input.value = listText.innerText;
  listText.after(input);
  input.focus();

  listText.classList.toggle("hidden");
  input.addEventListener("blur", updateList);
};

const updateList = (event) => {
  const currentValue = event.target.value;
  const list = event.target.closest(".list");
  const listText = list.querySelector(".list-text");

  listText.innerText = currentValue;
  event.target.remove();
  listText.classList.toggle("hidden");

  // () => {
  //   listText.innerText = input.value;
  //   input.remove();
  //   listText.classList.toggle("hidden");
  // };
};

const listGroupHandler = (event) => {
  console.log(event.target);
  if (event.target.classList.contains("list-del-btn")) {
    deleteList(event);
  } else if (event.target.classList.contains("list-edit-btn")) {
    editList(event);
  }
};
//listeners
addBtn.addEventListener("click", addList);

textInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addList();
  }
});

listGroup.addEventListener("click", listGroupHandler);
