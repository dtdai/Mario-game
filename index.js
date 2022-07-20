const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")

canvas.width = 1280
canvas.height = 600

const gravity = 0.5
let scrollOffset = 0, score = 0
var player, platforms, Gline

class Player {
    constructor(x, y) {
        this.position = { x: x, y: y}
        this.velocity = { x: 0, y: 0 }
        this.width = 40
        this.height = 40
        this.jump = true
    }

    draw() {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y <= canvas.height) this.velocity.y += gravity
        else this.velocity.y = 0
    }
}

class Platform {
    constructor(x, y, w, h, c) {
        this.position = { x: x, y: y }
        this.width = w
        this.height = h
        this.color = c
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const keys = {
    right: {
        pressed: false
    },
    left : {
        pressed: false
    },
    up : {
        pressed: false
    },
    down : {
        pressed: false
    }
}

function Start() {
    player = new Player(200, 400)
    platforms = [
        new Platform(0, 500, 2550, 120, "pink"),
        new Platform(2750, 500, 700, 120, "pink"),
        new Platform(3650, 500, 2750, 120, "pink"),
        new Platform(6500, 500, 3500, 120, "pink"),
        new Platform(1050, 400, 100, 100, "lime"),
        new Platform(1550, 350, 100, 150, "lime"),
        new Platform(2050, 350, 100, 150, "lime"),
        new Platform(6900, 400, 100, 100, "lime"),
        new Platform(7600, 400, 100, 100, "lime"),
        new Platform(450, 300, 50, 50, "blue"),
        new Platform(650, 300, 250, 50, "blue"), 
        new Platform(750, 100, 50, 50, "blue"),
        new Platform(3000, 300, 150, 50, "blue"),
        new Platform(3150, 100, 400, 50, "blue"),
        new Platform(3700, 100, 200, 50, "blue"),
        new Platform(3850, 300, 50, 50, "blue"),
        new Platform(4150, 300, 100, 50, "blue"),
        new Platform(4450, 300, 50, 50, "blue"),
        new Platform(4600, 300, 50, 50, "blue"),
        new Platform(4600, 100, 50, 50, "blue"),
        new Platform(4750, 300, 50, 50, "blue"),
        new Platform(5100, 100, 200, 50, "blue"),
        new Platform(5150, 300, 100, 50, "blue"),
        new Platform(5450, 450, 200, 50, "blue"),
        new Platform(5500, 400, 150, 50, "blue"),
        new Platform(5550, 350, 100, 50, "blue"),
        new Platform(5600, 300, 50, 50, "blue"),
        new Platform(5750, 300, 50, 50, "blue"),
        new Platform(5750, 350, 100, 50, "blue"),
        new Platform(5750, 400, 150, 50, "blue"),
        new Platform(5750, 450, 200, 50, "blue"),
        new Platform(6150, 450, 250, 50, "blue"),
        new Platform(6200, 400, 200, 50, "blue"),
        new Platform(6250, 350, 150, 50, "blue"),
        new Platform(6300, 300, 100, 50, "blue"),
        new Platform(6500, 300, 50, 50, "blue"),
        new Platform(6500, 350, 100, 50, "blue"),
        new Platform(6500, 400, 150, 50, "blue"),
        new Platform(6500, 450, 200, 50, "blue"),
        new Platform(7150, 300, 200, 50, "blue"),
        new Platform(7700, 450, 400, 50, "blue"),
        new Platform(7750, 400, 350, 50, "blue"),
        new Platform(7800, 350, 300, 50, "blue"),
        new Platform(7850, 300, 250, 50, "blue"),
        new Platform(7900, 250, 200, 50, "blue"),
        new Platform(7950, 200, 150, 50, "blue"),
        new Platform(8000, 150, 100, 50, "blue"),
        new Platform(8400, 450, 50, 50, "blue"),
    ]
    Gline = new Platform(8415, 100, 20, 350, "cyan")
}

function Draw() {
    ctx.font = '25px Comic Sans MS'
    if (scrollOffset == 0) ctx.fillText('Use A, S, W, D or Arrow key to move.' , 10, 150)
    ctx.fillText('Score: ' + score, 100 , 50)
    platforms.forEach(platform => {
        platform.draw()
        Gline.draw()
    })

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5
    } 
    else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5
    } 
    else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            scrollOffset += 5
            if (scrollOffset > score) score = scrollOffset
            platforms.forEach(platform => {
                platform.position.x -= 5
            })
            Gline.position.x -= 5
        }
        else if (keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= 5
            platforms.forEach(platform => {
                platform.position.x += 5
            })
            Gline.position.x += 5
        }
    }

    platforms.forEach(platform => {
        // top
        if (player.position.y + player.height <= platform.position.y 
            && player.position.y + player.height + player.velocity.y >= platform.position.y 
            && player.position.x + player.width >= platform.position.x 
            && player.position.x <= platform.width + platform.position.x) {
                player.velocity.y = 0
                player.jump = true
            }

        // left
        if (player.position.x + player.width <= platform.position.x
            && player.position.x + player.width + player.velocity.x >= platform.position.x
            && player.position.y + player.height >= platform.position.y
            && player.position.y <= platform.height + platform.position.y) {
                player.velocity.x = 0
                player.position.x -= 5
                player.draw()
        }

        // bottom
        if (player.position.y >= platform.position.y + platform.height
            && player.position.y + player.velocity.y <= platform.position.y +platform.height
            && player.position.x + player.width >= platform.position.x 
            && player.position.x <= platform.width + platform.position.x) {
                player.velocity.y = 0
            }

        // right
        if (player.position.x >= platform.position.x + platform.width
            && player.position.x + player.velocity.x <= platform.position.x + platform.width
            && player.position.y + player.height >= platform.position.y
            && player.position.y <= platform.height + platform.position.y) {
                player.velocity.x = 0
                player.position.x += 5
                player.draw()
        }
    })
}

function CheckOver() {
    if (player.position.y >= canvas.height - 50) {
        alert("You lost. Press OK to try again")
        DefaultMode()
        Start()
    }

    if (scrollOffset >= 8000) {
        keys.left.pressed = false;
        keys.right.pressed = false;
        if (player.position.y >= 400)  {
            alert("You won. Press OK to try again")
            DefaultMode()
            Start()
        }
    }
}

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    CheckOver()
    Draw()
    player.update();
}

function GameStart() {
    Start()
    Credit()
    animate()
}

function DefaultMode() {
    scrollOffset = 0
    score = 0
    keys.left.pressed = false
    keys.right.pressed = false
}

function Credit() {
    console.log('%c' + 'This game was made by dtdai.', 'font-family:Comic Sans MS; font-size: 25px; color:red; font-weight:bold; padding: 10px')
    console.log('%c' + 'Use A, W, S, D or Arrow key to play this game.', 'font-family:Comic Sans MS; font-size: 25px; color:#C1C700; font-weight:bold; padding: 10px')
    console.log('%c' + 'Have fun.', 'font-family:Comic Sans MS; font-size: 25px; color:green; font-weight:bold; padding: 10px')
}

addEventListener('keydown', ({ keyCode }) => {
    switch(keyCode) {
        case 37:
        case 65:
            keys.left.pressed = true
            break
        case 38:
        case 87:
            if (player.jump && !keys.up.pressed) {
                player.velocity.y -= 15
                player.jump = false
                keys.up.pressed = true
            }
            break
        case 39:
        case 68:
            keys.right.pressed = true
            break
        case 40:
        case 83:
            player.height = 30
            break
    }
})

addEventListener('keyup', ({ keyCode }) => {
    switch(keyCode) {
        case 37:
        case 65:
            keys.left.pressed = false
            break
        case 38:
        case 87:
            keys.up.pressed = false
            player.velocity.y += 1
            break
        case 39:
        case 68:
            keys.right.pressed = false
            break
        case 40:
        case 83:
            player.position.y -= 10
            player.height = 40
            break
    }
})
