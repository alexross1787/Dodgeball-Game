const dude = document.getElementById('character')
let direction = null;
let x = 0;
let y = 0;
const maxX = 800
moveDude(dude).to(0)

function moveDude(dude) {
    dude.style.position = 'relative';

    function moveToSpot(left) {
        if (x >= 0 && x <= maxX) {
            dude.style.left = left + 'px';
        } 
        if (x < 0 ) {
            x = 0
        }
        if (x > maxX) {
            x = maxX
        }
    }

    return {
        to: moveToSpot
    };
}


document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        direction = 'left';
        x-=100;
        moveDude(dude).to(x)

    }
    else if (event.key === 'ArrowRight') {
        direction = 'right';
        x+=100;
        moveDude(dude).to(x)
    }
    console.log(`You are here ${x}`)
})

