export default class Row {
  constructor(id) {
    const row = document.createElement("div");
    const rowStyle = {
      display: "flex",
      justifyContent: "space-around",
      
      width: "100%",
    };
    Object.assign(row.style, rowStyle);
    row.id = id;
    return row;
  }
}
