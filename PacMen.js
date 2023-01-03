    // audio files
    const pacmanStartSound = new Audio();
    const pacmanChomp = new Audio();
    const pacmanDeath = new Audio();
    pacmanStartSound.src = "../sounds/pacman_beginning.wav";
    pacmanChomp.src = "../sounds/pacman_chomp.wav";
    pacmanDeath.src = "../sounds/pacman_death.wav";

    function playSound(sound) { 
      sound.play() 
    } 

    var pos = 0; 
    var totpacmans = 0;
    var focus = 0;
    var firsttime = true;
    var direction = 0;
    const pacArray = [
        ['../images/PacMan1.png', '../images/PacMan2.png'],
        ['../images/PacMan3.png', '../images/PacMan4.png']
    ];

    var direction = 0;
    const pacMen = []; // This array holds all the pacmen

    function setToRandom(scale) {
        return {
            x: Math.random() * scale,
            y: Math.random() * scale
        }
    }

    // Factory to make a PacMan at a random position with random velocity
    function makePac() {
        // returns an object with random values scaled {x: 33, y: 21}
        let velocity = setToRandom(10); // {x:?, y:?}
        let position = setToRandom(200);
        if (position.y < 50) position.y = 50;
        // Add image to div id = game
        let game = document.getElementById('game');
        let newimg = document.createElement('img');
        newimg.src = pacArray[0][0];
        newimg.width = 100;
        newimg.style.position = 'absolute';
        newimg.style.left = position.x + 'px';
        newimg.style.top = position.y + 'px';
        // add new Child image to game
        game.appendChild(newimg);
        // return details in an object
        
        return { position, velocity, newimg };
    }

    function update() {
        //loop over pacmen array and move each one and move image in DOM
        if (firsttime) {
            firsttime = false; 
            playSound(pacmanStartSound);
        }

        pacMen.forEach((item) => {
            direction = checkCollisions(item);
            focus = (focus + 1) % 2;
            item.position.x += item.velocity.x;
            item.position.y += item.velocity.y;

            item.newimg.style.left = item.position.x + 'px';
            item.newimg.style.top = item.position.y + 'px';
            item.newimg.src = pacArray[direction][focus];
            playSound(pacmanChomp);
        })
        let speed = document.getElementById("Speed").value;
        setTimeout(update, speed);
        

        
    }

    function checkCollisions(item) {
        // detect collision with all walls and make pacman bounce
        if (item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
            item.position.x + item.velocity.x < 0) item.velocity.x = -item.velocity.x;

        if (item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
            item.position.y + item.velocity.y < 0) item.velocity.y = -item.velocity.y;

        if (item.velocity.x > 0) direction = 0;
        else direction = 1;

        return direction;    
    }

    function makeOne() {
        pacMen.push(makePac()); // add a new PacMan
        playSound(pacmanChomp);
        totpacmans += 1;
        document.getElementById("totpacmans").innerText = "  Total PacMan: " + totpacmans;
        console.log(pacMen);
    }