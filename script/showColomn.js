export const showColumnController = (tbody , thead) => {
  const cells = document.querySelector(".table-hid");
  const rows = Array.from(tbody.children);
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
      tabWapper.append(createShowTab(column));
    }
  });


  const createShowTab = (text) => {
    const tab = document.createElement('button');
    tab.textContent = `Показать ${text}`;
    tab.classList.add('show-tab');
    tab.dataset.column = text;
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
    return tab;
  }


};
