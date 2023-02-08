import { createController } from "./createController.js";
import { sortController } from "./sortController.js";
import { showColumnController } from "./showColomn.js";

const init = async () => {
  const tbody = document.querySelector('.table-body')
  const thead = document.querySelector('.table-thead')

  const {table, editTable} = await createController(tbody, thead);
  sortController(thead, table, editTable);
  showColumnController(tbody, thead)
}

init();