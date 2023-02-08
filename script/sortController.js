import Data from "../model/model.js";
import { ASCEND, DESCEND } from "./const.js";

export const sortController = (thead, table, editTable) => {
  thead.addEventListener("click", async (e) => {
    const target = e.target;
    if (!target.closest(".table-hid")) {
      if (
        !thead.classList.contains("sorted-Ascend") ||
        thead.classList.contains("sorted-Descend")
      ) {
        table.sort(target.id, await Data.getData(), ASCEND);
        editTable.sort(target.id, await Data.getData(), ASCEND);
        thead.classList.add("sorted-Ascend");
        thead.classList.contains("sorted-Descend") &&
          thead.classList.remove("sorted-Descend");
      } else {
        table.sort(target.id, await Data.getData(), DESCEND);
        editTable.sort(target.id, await Data.getData(), DESCEND);
        thead.classList.add("sorted-Descend");
        thead.classList.remove("sorted-Ascend");
      }
    }
  });
};
