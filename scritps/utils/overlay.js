export function Overlay () {
    const gameContainer = document.getElementById('gameContainer');
    const overlay = document.createElement('div');
    overlay.id = 'overlayId'
    const overlayStyle = {
        position: 'absolute',
        width:'100%',
        height:'100%',
        top:0,
        left:0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: 99999,            
    }
    Object.assign(overlay.style,overlayStyle);                
    gameContainer.appendChild(overlay);
    return overlay;

}