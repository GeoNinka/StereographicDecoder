const input = document.getElementById('imageInput')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const slider = document.getElementById('slider')
const button = document.getElementById('button')
const textInput = document.getElementById('urlInput')

let img = null
let offsetX = 0

function draw() {
    if (!img) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        return
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.globalCompositeOperation = 'source-over'
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    ctx.globalCompositeOperation = 'difference'
    ctx.drawImage(img, offsetX, 0, canvas.width, canvas.height)

    ctx.globalCompositeOperation = 'source-over'
}

input.addEventListener('change', () => {
    slider.value = 0
    offsetX = 0

    const file = input.files[0]
    if (!file) {
        img = null
        draw()
        return
    }

    const reader = new FileReader()
    reader.onload = function(e) {
        img = new Image()
        img.onload = () => {
            canvas.height = 300
            canvas.width = img.width * (300 / img.height)
            draw()
        }
        img.src = e.target.result
    }
    reader.readAsDataURL(file)
})

button.addEventListener('click', () => {
    slider.value = 0
    offsetX = 0

    const image = new Image()
    image.src = textInput.value
    image.onload = () => {
        img = image
        canvas.height = 300
        canvas.width = img.width * (300 / img.height)
        draw()
    }

    image.onerror = () => {
        alert('Failed to load image')
    }
})

slider.addEventListener('input', () => {
    offsetX = parseInt(slider.value, 10)
    draw()
})

textInput.value = 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Stereogram_Tut_Random_Dot_Shark.png'
button.click()