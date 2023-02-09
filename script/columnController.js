import { createShowTab } from "./create.js";

export const columnController = (tbody , thead) => {
  const cells = document.querySelector(".table-hid");
  const headRows = Array.from(thead.children);
  const tabWapper = document.querySelector('.show-tabs');

  const addHid = (row, column) => {
    const cell = [...row.children].find(
      (cell) =>
        cell.classList.contains(`${column}`) || cell.dataset.column === column
    );
    cell.classList.add("hid");
  };
  const removeHid = (row, column) => {
    const cell = [...row.children].find(
      (cell) =>
        cell.classList.contains(`${column}`) || cell.dataset.column === column
    );
    cell.classList.remove("hid");
  };
  

  cells.addEventListener("click", (e) => {
    if (e.target.closest(".cell-hidden")) {
      const column = e.target.dataset.column;
      const rows = Array.from(tbody.children);
      rows.forEach((row) => {
        addHid(row, column);
      });
      headRows.forEach((row) => {
        addHid(row, column);
      });

      const tab = createShowTab(column, tbody, headRows)

      tab.addEventListener('click', e => {
        const rows = Array.from(tbody.children);
        rows.forEach(row => {
          removeHid(row, tab.dataset.column);
        })
        headRows.forEach((row) => {
          removeHid(row, tab.dataset.column);
        });
        e.target.remove();
      })
      tabWapper.append(tab);
    }
  });




};

// showColumnController отвечает за скрытие и показ колонок таблицы
// также создает таб, по которому осуществляется открытие колонки