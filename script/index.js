import { renderController } from "./renderController.js";
import { sortController } from "./sortController.js";
import { columnController } from "./columnController.js";
import { tabsController } from "./partialsController.js";

const init = async () => {
  const tbody = document.querySelector('.table-body')
  const thead = document.querySelector('.table-thead');
  const tbodyEdit = document.querySelector(".edit-body");
  const {table, editTable, data} = await renderController(tbody, tbodyEdit);
  sortController(thead, table, editTable);
  columnController(tbody, thead);
  tabsController(tbody, thead, data, table, editTable);
}

init();