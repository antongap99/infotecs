
export const createTab = () => {
  const tab = document.createElement("button");
  tab.classList.add(`tab`);
  tab.textContent = `Показать следующие`;
  tab.dataset.count = 2;

  return tab;
};



export const createShowTab = (text) => {
  const tab = document.createElement('button');
  tab.textContent = `Показать ${text}`;
  tab.classList.add('show-tab');
  tab.dataset.column = text;
  
  return tab;
}

export const createForm = (sel, data) => {
  const form = document.createElement("form");
  form.className = sel;

  form.insertAdjacentHTML("afterbegin", data);

  return form;
}

export const createClose = (sel) => {
  const closeBtn = document.createElement("img");
  closeBtn.classList.add(sel);
  return closeBtn;
}

export const createFormWrapper = (sel) => {
  const formWapper = document.createElement("div");
  formWapper.className = sel;

  return formWapper
}

export const createOverlay = (sel) => {
  const overlay = document.createElement("div");
  overlay.classList.add(sel);

  return overlay;
}
