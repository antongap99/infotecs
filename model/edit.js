import { Table } from "./table.js";

export class Edit extends Table {
  constructor(tbody, data) {
    super();
    this.tbody = tbody;
    this.data = data;
  }

  render(items) {
    if (!items) {
      this.data.forEach((item) => {
        const tr = this.createRow(item);
        this.tbody.append(tr);
      });
    } else {
      items.forEach((item) => {
        const tr = this.createRow(item);
        this.tbody.append(tr);
      });
    }
  }

  createRow({ id }) {
    const tr = document.createElement("tr");
    tr.classList.add("table-row");
    tr.dataset.id = id;
    const td = document.createElement("td");
    tr.append(td);

    return tr;
  }

  createForm = (data) => {
    const { firstName, lastName, about, eyeColor } = data;
    return `
        <label for="firstName" class="form-label">firstName</label>
        <input type="text" name="firstName" class="form-input" value="${firstName}">
        <label for="lastName" class="form-label">lastName</label>
        <input type="text" name="lastName" class="form-input" value="${lastName}">
        <label for="about" class="form-label">about</label>
        <input type="text" name="about" class="form-input" value="${about}">
        <label for="eyeColor" class="form-label">eyeColor</label>
        <input type="text" name="eyeColor" class="form-input" value="${eyeColor}">
        <button type="sumbit" class="btn btn-save">Сохранить</button>
        <button type="reset" class="btn btn-exit">Отмена</button>
      `;
  };
}

// Данный интерфейс предназначен для редактирования Table
