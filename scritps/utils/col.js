export default class Col{
    constructor(id){
     const col = document.createElement("div");
     const colStyle = {
       display: "flex",
       flexDirection:"column", 
       justifyContent: 'center',      
       alignItems: 'center',      
       width: "100%",
     };
     Object.assign(col.style, colStyle);
     col.id = id;
     return col;
    }

}