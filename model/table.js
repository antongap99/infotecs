
export class Table {
  constructor(tbody, data) {
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

  createSpan(text){
    const span = document.createElement('span');
    text ? span.textContent = text :
    span.textContent = ''


    return span;
  }

  createRow({ id, firstName, lastName, about, eyeColor}) {
    const tr = document.createElement("tr");
    tr.classList.add("table-row");
    tr.dataset.id = id;

    const color = document.createElement('td');
    color.className = 'cell cell-eyeColor eyeColor-column';
    color.dataset.color = eyeColor;
    color.style.backgroundColor = eyeColor;
    color.append(this.createSpan());

    const name = document.createElement('td');
    name.className = 'cell cell-firstName firstName-column';
    name.append(this.createSpan(firstName));

    const surmane = document.createElement('td');
    surmane.className = 'cell cell-lastName  lastName-column';
    surmane.append(this.createSpan(lastName));

    const text = document.createElement('td');
    text.className = 'cell cell-about about-column';
    text.append(this.createSpan(about));

   

    tr.append(name, surmane, text, color);

    return tr;
  }

  deleteRows() {
    const rows = Array.from(this.tbody.children);
    rows.forEach((row) => {
      this.tbody.removeChild(row);
    });
  }

  sort(column, data, method) {
    const sorted = Array.from(data);

    if(method === 'ASCEND')
    sorted.sort((a, b) => {
      const targetA = a[column];
      const targetB = b[column];
      if (targetA > targetB) return 1;
      if (targetA == targetB) return 0;
      if (targetA < targetB) return -1;
    })

    if(method === 'DESCEND'){
      sorted.sort((a, b) => {
        const targetA = a[column];
        const targetB = b[column];
        if (targetA < targetB) return 1;
        if (targetA == targetB) return 0;
        if (targetA > targetB) return -1;
      })
    }
   
    this.deleteRows();
    this.render(sorted);
  }
}

// класс Table имеет интефейс создания строк таблицы и также их рендер 