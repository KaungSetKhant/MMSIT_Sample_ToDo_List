import { addList, listGroupHandler } from "./handlers.js";

const listener = () => {
  //listeners
  addBtn.addEventListener("click", addList);

  textInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      addList();
    }
  });

  listGroup.addEventListener("click", listGroupHandler);
};

export default listener;
