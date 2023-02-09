import { PART } from "./const.js";
import { createTab } from "./create.js";

export const tabsController = (tbody, thead, data, table, editTable) => {
  const tab = createTab(data.length, PART);
  const headRows = Array.from(thead.children[1].children);
  
  tab.addEventListener("click", (e) => {
    if (+e.target.dataset.count > data.length) {
      e.target.dataset.count = 1;
      e.target.dataset.prev = 0;
    }
    if (!e.target.dataset.prev) e.target.dataset.prev = 1;
    const rowsData = data.slice(
      +e.target.dataset.prev,
      +e.target.dataset.count
    );

    table.deleteRows();
    editTable.deleteRows();
    editTable.render(rowsData.flat(1));
    table.render(rowsData.flat(1));

    const headCells = headRows.filter((cell) =>
      cell.classList.contains("hid")
    );

    if (headCells || headCells.length) {
      const rows = Array.from(tbody.children);
      const columns = [];
      for (const headCell of headCells) {
        columns.push(headCell.dataset.column);
      }
      columns.forEach((column) => {
        rows.forEach((row) => {
          const cell = [...row.children].find((cell) =>
            cell.classList.contains(`${column}`)
          );
          cell.classList.add("hid");
        });
      });
    }

    e.target.dataset.prev = Number(e.target.dataset.prev) + 1;
    e.target.dataset.count = +e.target.dataset.count + 1;
  });

  tbody.before(tab);
};


