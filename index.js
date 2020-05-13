function getX(y, r) { return Math.sqrt(r ** 2 - y ** 2) }

class App {
    squares = []
    RADIUS = 150
    EDGE = 21
    INIT_Y = 0 + this.EDGE * 0.5
    INIT_X = 0 + this.EDGE * 0.5

    constructor(ctx) {
        this.ctx = ctx

    }

    drawRect = (x, y, w, h) => {
        const { ctx } = this
        ctx.beginPath()
        ctx.rect(x, y, w, h)
        ctx.strokeStyle = "#000000FF"
        ctx.fillStyle = "#00000044"
        ctx.fill()
        ctx.stroke()
    }

    calculate = (radius, edge, offset) => {
        this.squares.length = 0
        this.RADIUS = radius
        this.EDGE = edge
        this.INIT_Y = 0 + this.EDGE * offset
        this.INIT_X = 0 + this.EDGE * offset

        const { squares, INIT_Y, INIT_X, EDGE, RADIUS } = this
        let y

        y = INIT_Y
        do {
            y -= EDGE
            let x1 = INIT_X
            let x2 = INIT_X - EDGE
            let limit = getX(y, RADIUS)
            while (x1 + EDGE < limit) {
                squares.push({ y, x: x1 })
                x1 += EDGE
            }

            while (x2 > -limit) {
                squares.push({ y, x: x2 })
                x2 -= EDGE
            }
        } while (y > -RADIUS)


        y = INIT_Y - EDGE
        do {
            y += EDGE
            let x1 = INIT_X
            let x2 = INIT_X - EDGE
            let limit = getX(y + EDGE, RADIUS)
            while (x1 + EDGE < limit) {
                squares.push({ y, x: x1 })
                x1 += EDGE
            }
            while (x2 > -limit) {
                squares.push({ y, x: x2 })
                x2 -= EDGE
            }
        } while (y + EDGE < RADIUS)


    }

    calculate2 = (radius, edge, offset) => {
        this.squares.length = 0
        this.RADIUS = radius
        this.EDGE = edge
        const { RADIUS, EDGE, squares } = this
        const INIT_Y = 0 + EDGE * offset

        let x, y

        y = INIT_Y
        do {
            y -= EDGE
            const limit = getX(y, RADIUS)
            x = Math.floor(2 * limit / EDGE) / 2 * EDGE * -1
            while (x + EDGE < limit) {
                squares.push({ x, y })
                x += EDGE
            }
        } while (y > -RADIUS)

        y = INIT_Y - EDGE
        do {
            y += EDGE
            const limit = getX(y + EDGE, RADIUS)
            x = Math.floor(2 * limit / EDGE) / 2 * EDGE * -1
            while (x + EDGE < limit) {
                squares.push({ x, y })
                x += EDGE
            }
        } while (y + EDGE < RADIUS)
    }

    draw = () => {
        const { ctx, squares, EDGE } = this
        const width = ctx.canvas.width
        const height = ctx.canvas.height
        ctx.save()
        ctx.lineWidth = 1;
        ctx.clearRect(0, 0, width, height)
        ctx.translate(width / 2, height / 2)
        ctx.beginPath()
        ctx.strokeStyle = "#000000FF"
        ctx.arc(0, 0, this.RADIUS, 0, 2 * Math.PI)
        ctx.stroke()
        ctx.beginPath()
        ctx.strokeStyle = "#00000055"
        ctx.setLineDash([2, 3, 40, 3,])
        ctx.moveTo(-width / 2, 0)
        ctx.lineTo(width / 2, 0)
        ctx.moveTo(0, - height / 2)
        ctx.lineTo(0, height / 2)
        ctx.stroke()

        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        squares.forEach((square) => {
            this.drawRect(square.x, square.y, EDGE, EDGE)
        })

        ctx.translate(-width / 2, -height / 2)
        ctx.restore()
    }

}


const $ = (query) => document.querySelector(query)

const app = $("#app")
const canvas = document.createElement("canvas")
app.appendChild(canvas)
canvas.width = 500
canvas.height = 500
const ctx = canvas.getContext('2d')

const graphic = new App(ctx)

const radiusInput = $("input[name='radius']")
const squareInput = $("input[name='edge']")
const offsetInput = $("input[name='offset']")
const resultDisplay = $("span#result")
const methodSelect = $("select[name='method']")
radiusInput.addEventListener('change', drawPicture)
squareInput.addEventListener('change', drawPicture)
offsetInput.addEventListener('change', drawPicture)
methodSelect.addEventListener('change', drawPicture)

function drawPicture() {
    const radius = Number(radiusInput.value || 150)
    const edge = Number(squareInput.value || 21)
    const offset = Number(offsetInput.value || 0)
    if (methodSelect.value === "0") graphic.calculate(radius, edge, offset)
    if (methodSelect.value === "1") graphic.calculate2(radius, edge, offset)
    graphic.draw()
    resultDisplay.innerText = graphic.squares.length
}

drawPicture()
