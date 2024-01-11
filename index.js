const dude = document.getElementById('character') //this is the player

const ball1 = document.getElementById('ball1')
const ball2 = document.getElementById('ball2')
const ball3 = document.getElementById('ball3')
const ball4 = document.getElementById('ball4')
const ball5 = document.getElementById('ball5')

const gameOver = document.getElementById('gameOver')

const balls = [ball1, ball2, ball3, ball4, ball5]

function displayItems(item) {
    item.style.display = 'block';           
}

function hideItems(item) {
    item.style.display = 'none'

}

function startGame() {

let x = 0; // players position
const maxX = 800 //largest position the player can move to
moveDude(dude).to(400) //moves dude to starting positon


//function to move dude 
// it uses the 'left' in the css positon to to move the dude left or right on board
function moveDude(dude) {
    dude.style.position = 'relative';

    function moveToSpot(left) {
        if (x >= 0 && x <= maxX) {
            dude.style.left = left + 'px';
            x = left;
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

//event listener that moves dude with arrow keys
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        x-=100;
        moveDude(dude).to(x)

    }
    else if (event.key === 'ArrowRight') {
        x+=100;
        moveDude(dude).to(x)
    }
})


//iteration of ball animation. uses Math.random to change ball positions after ever iteration 
function throwBall(ball) {
    ball.addEventListener('animationiteration', () => {
        let random = Math.floor(Math.random() * 9);
        let thrownBall = random * 100;
        ball.style.left = thrownBall + 'px';
        // console.log(`${ball.id}: ${ball.style.left}`);
    });
}

//calls function to throw balls 
balls.forEach(throwBall);

//.getBoundingClient finds the object positon relative to the viewport. this function checks when a ball and dude are overlapping 
function checkCollision() {
    let dudePos = dude.getBoundingClientRect();

    for (const ball of balls) {
        const ballPos = ball.getBoundingClientRect();
        let collision = false


        if (
            dudePos.x < ballPos.x + ballPos.width &&
            dudePos.x + dudePos.width > ballPos.x &&
            dudePos.y < ballPos.y + ballPos.height &&
            dudePos.y + dudePos.height > ballPos.y
        ) {
            console.log(`Collision detected between dude and ${ball.id}!`);
            collision = true;
            balls.forEach((ball) => {
                hideItems(ball);
            });

            gameOver.style.display = 'block'


            
        }
    }
}



const collisionInterval = setInterval(checkCollision, 100);

}



function clickStart() {
    let button = document.getElementById('startButton')
    
    button.addEventListener('click', () => {
        startGame()
        button.style.display = 'none';
        dude.style.display = 'block';
        
        balls.forEach((ball) => {
            displayItems(ball);
        })
        

    });
}

clickStart()


