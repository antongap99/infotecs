import { Edit } from "../model/edit.js";
import Data from "../model/model.js";
import { Table } from "../model/table.js";
import { PART } from "./const.js";

export const createController = async (tbody, thead) => {
  const data = await Data.getPart(PART);
  const table = new Table(tbody, data[0]);
  const headRows = Array.from(thead.children[1].children);
  const tbodyEdit = document.querySelector(".edit-body");
  const editTable = new Edit(tbodyEdit, data[0]);
  const editWrapper = document.querySelector(".edit-wrapper");
  const overlay = document.createElement("div");
  const rows = Array.from(tbody.children);

  table.render();
  editTable.render();

  const createTab = () => {
    const tab = document.createElement("button");
    tab.classList.add(`tab`);
    tab.textContent = `Показать следующие`;
    tab.dataset.count = 2;

    return tab;
  };

  const tabsController = (data) => {
    const tab = createTab(data.length, PART);

    tbody.before(tab);
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
  };

  tabsController(data);

  const removeOverlay = () => {
    overlay.remove();
    rows.forEach((row) => {
      row.classList.remove("active");
    });
  };

  const formOpen = async (id, overlay) => {
    const data = await Data.getFormatItem(id);
    const form = document.createElement("form");
    form.className = "edit-form";
    const formWapper = document.createElement("div");
    formWapper.className = "form-wrapper";
    const closeBtn = document.createElement("img");
    closeBtn.classList.add("close");
    rows.forEach((row) => {
      if (row.dataset.id === id) row.classList.add("active");
    });
    overlay.classList.add("overlay");
    const prevData = {
      firstName: null,
      lastName: null,
      about: null,
      eyeColor: null,
      bgColor: null,
      edited: false,
    };

    form.insertAdjacentHTML("afterbegin", editTable.createForm(data));

    form.addEventListener("reset", (e) => {
      e.preventDefault();
      const rows = Array.from(tbody.children);
      const row = rows.filter((row) => row.dataset.id === id)[0];
      if (prevData.edited) {
        row.children[0].firstChild.textContent = prevData.firstName;
        row.children[1].firstChild.textContent = prevData.lastName;
        row.children[2].firstChild.textContent = prevData.about;
        row.children[3].dataset.color = prevData.eyeColor;
        row.children[3].style.backgroundColor = prevData.bgColor;
        prevData.edited = false;
      }
      removeOverlay();
    });

    document.addEventListener("click", (e) => {
      if (
        (e.target.classList.contains("overlay") ||
          e.target.classList.contains("close")) &&
        !e.target.closest(".form-edit")
      ) {
        removeOverlay();
      }
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const rows = Array.from(tbody.children);

      const row = rows.filter((row) => row.dataset.id === id)[0];
      prevData.firstName = row.children[0].firstChild.textContent;
      prevData.lastName = row.children[1].firstChild.textContent;
      prevData.about = row.children[2].firstChild.textContent;
      prevData.eyeColor = row.children[3].dataset.color;
      prevData.bgColor = row.children[3].dataset.color;
      prevData.edited = true;

      row.children[0].firstChild.textContent = form.firstName.value;
      row.children[1].firstChild.textContent = form.lastName.value;
      row.children[2].firstChild.textContent = form.about.value;
      row.children[3].dataset.color = eyeColor;
      row.children[3].style.backgroundColor = form.eyeColor.value;

      Data.update(
        {
          firstName: form.firstName.value,
          lastName: form.lastName.value,
          about: form.about.value,
          eyeColor: form.eyeColor.value,
        },
        row.dataset.id
      );
    });

    form.addEventListener("keydown", function (event) {
      if (event.keyCode == 13) {
        event.preventDefault();
      }
    });

    formWapper.append(form, closeBtn);
    overlay.append(formWapper);
    editWrapper.append(overlay);
  };

  tbody.addEventListener("click", (e) => {
    if (e.target.closest(".table-row")) {
      rows.forEach((row) => {
        if (row.classList.contains("active")) row.classList.remove("active");
      });
      e.target.closest(".table-row").classList.add("active");
      removeOverlay();
    }
  });

  tbodyEdit.addEventListener("click", (e) => {
    if (e.target.closest(".table-row")) {
      const targ = e.target.closest(".table-row");
      formOpen(targ.dataset.id, overlay);
    }
  });

  return {
    table,
    editTable,
  };
};
