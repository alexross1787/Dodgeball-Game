const dude = document.getElementById('character'); 
const ball1 = document.getElementById('ball1');
const ball2 = document.getElementById('ball2');
const ball3 = document.getElementById('ball3');
const ball4 = document.getElementById('ball4');
const ball5 = document.getElementById('ball5');
const directions = document.getElementById('directions')
const scoreBoard = document.getElementById('points');
const hScoreBoard = document.getElementById('highScore');
const countdown = document.getElementById('countdown');
const gameOver = document.getElementById('gameOver');
const playAgain = document.getElementById('playAgain');

let score = 0;
let highScore = 0;



const balls = [ball1, ball2, ball3, ball4, ball5];

function displayItems(item) {
    item.style.display = 'block';           
}

function hideItems(item) {
    item.style.display = 'none'

}

function startGame() {

let x = 0; // players position
const maxX = 400 //largest position the player can move to
moveDude(dude).to(200) //moves dude to starting positon


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
        x-=50;
        moveDude(dude).to(x);

    }
    else if (event.key === 'ArrowRight') {
        x+=50;
        moveDude(dude).to(x)
    }
})


//iteration of ball animation. uses Math.random to change ball positions after ever iteration 
function throwBall(ball) {
    ball.addEventListener('animationiteration', () => {
        let random = Math.floor(Math.random() * 4.5);
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


        if (
            dudePos.x < ballPos.x + ballPos.width &&
            dudePos.x + dudePos.width > ballPos.x &&
            dudePos.y < ballPos.y + ballPos.height &&
            dudePos.y + dudePos.height > ballPos.y
        ) {
            if (ball.id === 'ball1' ||
                ball.id === 'ball2' ||
                ball.id === 'ball3' ||
                ball.id === 'ball4'
                ){
            clearInterval(collisionInterval)
            console.log(`Collision detected between dude and ${ball.id}!`);
            endGame();
          

            countdown.innerText = "3";
            displayItems(gameOver)
            displayItems(playAgain); 
            
        } else {
            score += 100;
            scoreBoard.textContent = `Score: ${score}`;
            console.log(`Collision detected between catcher and ${ball.id}!`);


            if (score > highScore) {
                highScore = score
                hScoreBoard.textContent = `High Score: ${score}`

            }
            
            
        }


            
        }

    }
}

let collisionInterval = setInterval(checkCollision, 100);


function endGame() {
    balls.forEach((ball) => {
        hideItems(ball);
    });
    hideItems(dude);
    displayItems(directions);
    displayItems(gameOver);
    displayItems(playAgain);
    clearInterval(collisionInterval);
}
}



function clickStart() {
    let startButton = document.getElementById('startButton')
    
    startButton.addEventListener('click', () => {
        counter()
        startButton.style.display = 'none';
        hideItems(directions)
        
       

    });
}



function counter() {
    const countdown = document.getElementById('countdown'); 
    displayItems(countdown);
    hideItems(dude)
  
    function updateCountdown(count) {
      countdown.innerText = count;
    }
  
    function countDownFrom(number) {
      let count = number;
      let interval = setInterval(function() {
        updateCountdown(count);
        count--;
  
        if (count < 0) {
          clearInterval(interval);
          countdown.style.display = 'none';
          startGame()
          balls.forEach((ball) => {
            displayItems(ball);
            displayItems(dude);
        });
        
        }
      }, 300);
    }
  
    countDownFrom(3);
  }
  
  

function restartGame() {
    score = 0;
    scoreBoard.textContent = `Score: ${score}`;
    hideItems(gameOver);
    hideItems(playAgain);
    hideItems(directions)
    counter();

}

document.getElementById('playAgain').addEventListener('click', () => {
    restartGame();
})


 
clickStart()
 