
export default class ErrorModal {

    constructor(message){
      this.modalContainer = document.querySelector('#errorModalContainer');
      this.addMessage(message);
    }
    addMessage(messageParam) {  
      const modal = document.createElement("div");  
         
      const ModalStyle = {
        position:"relative",        
        backgroundColor: "rgba(255,0,0,0.3)",
        borderRadius:'10px',
        padding:'20px',
        margin:'10px',      
        
      };
      Object.assign(modal.style, ModalStyle);
      const message = document.createElement('p');
      const messageStyles = {
        color: 'white',
        fontSize:'2em',
        fontWeight:'700' ,
        fontFamily:"arcade",
      }

      Object.assign(message.style, messageStyles);
      message.textContent = messageParam;
      
      modal.appendChild(message);
      modal.animate(
        [
          {
            transform:'scale(0)',
          },
          {
            transform:'scale(1)',
          },
        ],
        {
          duration: 100,
          fill: "forwards",
          easing: "ease-in-out",
        }
      );
      this.modalContainer.append(modal);

      const errorSound = new Audio();
      errorSound.src = "../../assets/sounds/error.wav";
      errorSound.play();
          
      this.hide(modal);  
    }
    hide(modal) {
      setTimeout(()=> {
        modal.remove();
      }, 3000)
    }
  }
  