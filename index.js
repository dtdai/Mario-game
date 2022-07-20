// Mario Game by dtdai
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")

canvas.width = 1280
canvas.height = 600

const gravity = 0.5
let scrollOffset = 0, score = 0
var player, platforms, Gline

var img = new Image()
img.src = "image/character.png"
var brick = new Image()
brick.src = "image/brick.png"
var brick2 = new Image()
brick2.src = "image/brick2.png"
var box = new Image()
box.src = "image/box.png"
var pipe = new Image()
pipe.src = "image/pipe.png"
var pipe2 = new Image()
pipe2.src = "image/pipe2.png"
var plat = new Image()
plat.src = "image/platbrick.png"
var plat2 = new Image()
plat2.src = "image/platbrick2.png"
var plat5 = new Image()
plat5.src = "image/platbrick5.png"
var block = new Image()
block.src = "image/block.png"
var block2 = new Image()
block2.src = "image/block2.png"
var block4 = new Image()
block4.src = "image/block4.png"
var castle = new Image()
castle.src = "image/castle.png" 

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
        //ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        ctx.drawImage(img, this.position.x, this.position.y, this.width - 10, this.height)
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
        if (this.color == 'blue') ctx.drawImage(box, this.position.x, this.position.y, this.width, this.height)
        else if (this.color == 'gold') ctx.drawImage(castle, this.position.x, this.position.y, this.width, this.height)
        else if (this.color == 'orange' && this.width == 100) ctx.drawImage(brick2, this.position.x, this.position.y, this.width, this.height)
        else if (this.color == 'orange') ctx.drawImage(brick, this.position.x, this.position.y, this.width, this.height)
        else if (this.color == 'lime' && this.height == 100) ctx.drawImage(pipe, this.position.x, this.position.y, this.width, this.height)
        else if (this.color == 'lime') ctx.drawImage(pipe2, this.position.x, this.position.y, this.width, this.height)
        else if (this.color == 'pink' && this.width == 250) ctx.drawImage(plat5, this.position.x, this.position.y, this.width, this.height)
        else if (this.color == 'pink' && this.width == 100) ctx.drawImage(plat2, this.position.x, this.position.y, this.width, this.height)
        else if (this.color == 'pink') ctx.drawImage(plat, this.position.x, this.position.y, this.width, this.height)
        else if (this.color == 'gray' && this.width == 200) ctx.drawImage(block4, this.position.x, this.position.y, this.width, this.height)
        else if (this.color == 'gray' && this.width == 100) ctx.drawImage(block2, this.position.x, this.position.y, this.width, this.height)
        else if (this.color == 'gray') ctx.drawImage(block, this.position.x, this.position.y, this.width, this.height)
        else ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
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
        new Platform(0, 500, 250, 100, "pink"),
        new Platform(250, 500, 250, 100, "pink"),
        new Platform(500, 500, 250, 100, "pink"),
        new Platform(750, 500, 250, 100, "pink"),
        new Platform(1000, 500, 250, 100, "pink"),
        new Platform(1250, 500, 250, 100, "pink"),
        new Platform(1500, 500, 250, 100, "pink"),
        new Platform(1750, 500, 250, 100, "pink"),
        new Platform(2000, 500, 250, 100, "pink"),
        new Platform(2250, 500, 250, 100, "pink"),
        new Platform(2500, 500, 50, 100, "pink"),
        new Platform(2750, 500, 250, 100, "pink"),
        new Platform(3000, 500, 250, 100, "pink"),
        new Platform(3250, 500, 100, 100, "pink"),
        new Platform(3350, 500, 100, 100, "pink"),
        new Platform(3650, 500, 250, 100, "pink"),
        new Platform(3900, 500, 250, 100, "pink"),
        new Platform(4150, 500, 250, 100, "pink"),
        new Platform(4400, 500, 250, 100, "pink"),
        new Platform(4650, 500, 250, 100, "pink"),
        new Platform(4900, 500, 250, 100, "pink"),
        new Platform(5150, 500, 250, 100, "pink"),
        new Platform(5400, 500, 250, 100, "pink"),
        new Platform(5650, 500, 250, 100, "pink"),
        new Platform(5900, 500, 250, 100, "pink"),
        new Platform(6150, 500, 250, 100, "pink"),
        new Platform(6500, 500, 250, 150, "pink"),
        new Platform(6750, 500, 250, 100, "pink"),
        new Platform(7000, 500, 250, 100, "pink"),
        new Platform(7250, 500, 250, 100, "pink"),
        new Platform(7500, 500, 250, 100, "pink"),
        new Platform(7750, 500, 250, 100, "pink"),
        new Platform(8000, 500, 250, 100, "pink"),
        new Platform(8250, 500, 250, 100, "pink"),
        new Platform(8500, 500, 250, 100, "pink"),
        new Platform(8750, 500, 250, 100, "pink"),
        new Platform(9000, 500, 250, 100, "pink"),
        new Platform(9250, 500, 250, 100, "pink"),
        new Platform(9500, 500, 250, 100, "pink"),
        new Platform(9750, 500, 250, 100, "pink"),
        new Platform(1050, 400, 100, 100, "lime"),
        new Platform(1550, 350, 100, 150, "lime"),
        new Platform(2050, 350, 100, 150, "lime"),
        new Platform(6900, 400, 100, 100, "lime"),
        new Platform(7600, 400, 100, 100, "lime"),
        new Platform(450, 300, 50, 50, "blue"),
        new Platform(650, 300, 50, 50, "orange"), 
        new Platform(700, 300, 50, 50, "blue"),
        new Platform(750, 300, 50, 50, "orange"),
        new Platform(800, 300, 50, 50, "blue"),
        new Platform(850, 300, 50, 50, "orange"),
        new Platform(750, 100, 50, 50, "blue"),
        new Platform(3000, 300, 50, 50, "orange"),
        new Platform(3050, 300, 50, 50, "blue"),
        new Platform(3100, 300, 50, 50, "orange"),
        new Platform(3150, 100, 100, 50, "orange"),
        new Platform(3250, 100, 100, 50, "orange"),
        new Platform(3350, 100, 100, 50, "orange"),
        new Platform(3450, 100, 100, 50, "orange"),
        new Platform(3700, 100, 100, 50, "orange"),
        new Platform(3800, 100, 50, 50, "orange"),
        new Platform(3850, 100, 50, 50, "blue"),
        new Platform(3850, 300, 50, 50, "orange"),
        new Platform(4150, 300, 100, 50, "orange"),
        new Platform(4450, 300, 50, 50, "blue"),
        new Platform(4600, 300, 50, 50, "blue"),
        new Platform(4600, 100, 50, 50, "blue"),
        new Platform(4750, 300, 50, 50, "blue"),
        new Platform(5100, 100, 50, 50, "orange"),
        new Platform(5150, 100, 50, 50, "blue"),
        new Platform(5200, 100, 50, 50, "blue"),
        new Platform(5250, 100, 50, 50, "orange"),
        new Platform(5150, 300, 50, 50, "orange"),
        new Platform(5200, 300, 50, 50, "orange"),
        new Platform(5450, 450, 200, 50, "gray"),
        new Platform(5500, 400, 50, 50, "gray"),
        new Platform(5550, 400, 100, 50, "gray"),
        new Platform(5550, 350, 100, 50, "gray"),
        new Platform(5600, 300, 50, 50, "gray"),
        new Platform(5750, 300, 50, 50, "gray"),
        new Platform(5750, 350, 100, 50, "gray"),
        new Platform(5750, 400, 100, 50, "gray"),
        new Platform(5850, 400, 50, 50, "gray"),
        new Platform(5750, 450, 200, 50, "gray"),
        new Platform(6150, 450, 200, 50, "gray"),
        new Platform(6350, 450, 50, 50, "gray"),
        new Platform(6200, 400, 200, 50, "gray"),
        new Platform(6250, 350, 100, 50, "gray"),
        new Platform(6350, 350, 50, 50, "gray"),
        new Platform(6300, 300, 100, 50, "gray"),
        new Platform(6500, 300, 50, 50, "gray"),
        new Platform(6500, 350, 100, 50, "gray"),
        new Platform(6500, 400, 100, 50, "gray"),
        new Platform(6600, 400, 50, 50, "gray"),
        new Platform(6500, 450, 200, 50, "gray"),
        new Platform(7150, 300, 100, 50, "orange"),
        new Platform(7250, 300, 50, 50, "blue"),
        new Platform(7300, 300, 50, 50, "orange"),
        new Platform(7700, 450, 200, 50, "gray"),
        new Platform(7900, 450, 200, 50, "gray"),
        new Platform(7750, 400, 200, 50, "gray"),
        new Platform(7950, 400, 100, 50, "gray"),
        new Platform(8050, 400, 50, 50, "gray"),
        new Platform(7800, 350, 200, 50, "gray"),
        new Platform(8000, 350, 100, 50, "gray"),
        new Platform(7850, 300, 200, 50, "gray"),
        new Platform(8050, 300, 50, 50, "gray"),
        new Platform(7900, 250, 200, 50, "gray"),
        new Platform(7950, 200, 100, 50, "gray"),
        new Platform(8050, 200, 50, 50, "gray"),
        new Platform(8000, 150, 100, 50, "gray"),
        new Platform(8400, 450, 50, 50, "gray"),
        new Platform(8700, 200, 250, 300, "gold"),
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
