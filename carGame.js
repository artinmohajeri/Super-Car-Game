const submitBtn = document.querySelector("#submit");
const roadLineUp = document.querySelector(".road-line-up")
const roadLineDown = document.querySelector(".road-line-down")
const carNoise = document.querySelector(".car-noise")
const carEngine = document.querySelector(".engine-noise")
const carCrash = document.querySelector(".crash")
const stone1 = document.querySelector(".rock1")
const heathText = document.querySelector(".car-health")
const stone2 = document.querySelector(".rock2")
const car = document.querySelector(".car")
const parentDiv = document.querySelector(".parent")
const carImg = document.querySelector("img[alt='car']")

let currentLeft = 0
let counter = 0
let carMove = 60
let stoneMove1 = 0
let stoneMove2 = 0
const min = 400
const max = 1000
const range = max - min
let stoneSpeed = 4.2
let carHealth = 500
let gameOver = false
let seconds = 0
let minutes = 0
let isStarted = false


setInterval(function () {
    if (isStarted) {
        if (!gameOver) {
            console.log(minutes, seconds)
            seconds++
            if (seconds === 60) {
                minutes++
                seconds = 0
            }
        }
    }
}, 1000)

submitBtn.addEventListener("click", function () {
    const selectedOption = document.querySelector('input[name="car"]:checked')
    if (selectedOption.id === "lamborghini" || selectedOption.id === "ferrari" || selectedOption.id === "bugatti" || selectedOption.id === "corvette") {
        carImg.setAttribute("width","110px")
    }
    carImg.setAttribute("src",`./img/${selectedOption.id}.png`)
    isStarted = true
    parentDiv.classList.remove("d-flex")
    parentDiv.classList.add("d-none")
    document.querySelector(".game").classList.remove("d-none")
});


document.addEventListener("keyup", function (key) {
    if (isStarted) {
        if (key.key === "t") {
            carEngine.play()
        }

        if (key.key === " ") {
            if (counter % 2 === 0) {
                stoneSpeed = 8
                counter++
                roadLineUp.style.animationDuration = "1s"
                roadLineDown.style.animationDuration = "1s"
                carMove = 180
                carNoise.play()

                setTimeout(function () {
                    counter++
                    roadLineUp.style.animationDuration = "3s"
                    roadLineDown.style.animationDuration = "3s"
                    carNoise.pause()
                    carNoise.currentTime = 0
                    stoneSpeed = 4.2
                }, 28000)
            } else {
                counter++
                roadLineUp.style.animationDuration = "3s"
                roadLineDown.style.animationDuration = "3s"
                carNoise.pause()
                carNoise.currentTime = 0
                stoneSpeed = 4.2
            }
        }

        if (car.getBoundingClientRect().x > 350) {
            if (key.key === "ArrowLeft") {
                currentLeft -= carMove
            }
        }
        if (car.getBoundingClientRect().x < 1000) {
            if (key.key === "ArrowRight") {
                currentLeft += carMove
            }
        }
        car.style.transform = `translateX(${currentLeft}px)`
    }

})


setInterval(function () {
    if (isStarted) {
        stoneMove1 += stoneSpeed + 0.5
        stone1.style.transform = `translateY(${stoneMove1}px)`
        if (stone1.getBoundingClientRect().y > 800) {
            stoneMove1 = 0
            stone1.style.transform = `translateY(${stoneMove1}px)`
            const randomNumber1 = Math.round(Math.random() * range + min)
            stone1.style.left = `${randomNumber1}px`
        }
    }
}, 10)

setInterval(function () {
    if (isStarted) {
        stoneMove2 += stoneSpeed
        stone2.style.transform = `translateY(${stoneMove2}px)`
        if (stone2.getBoundingClientRect().y > 800) {
            stoneMove2 = 0
            stone2.style.transform = `translateY(${stoneMove2}px)`
            const randomNumber2 = Math.round(Math.random() * range + min)
            stone2.style.left = `${randomNumber2}px`
        }
        calculateDistance1(stone1.getBoundingClientRect().x, stone1.getBoundingClientRect().y, car.getBoundingClientRect().x, car.getBoundingClientRect().y)
        calculateDistance2(stone2.getBoundingClientRect().x, stone2.getBoundingClientRect().y, car.getBoundingClientRect().x, car.getBoundingClientRect().y)
        if (carHealth <= 0) {
            carCrash.currentTime = 0
            carNoise.currentTime = 0
            carEngine.currentTime = 0
            carCrash.pause()
            carNoise.pause()
            carEngine.pause()
            gameOver = true
            document.querySelector(".game").classList.add("d-none")
            document.querySelector(".time").classList.remove("d-none")
            document.querySelector(".time-txt").innerHTML = `You played for ${minutes} minutes and ${seconds} seconds`
        }
    }
}, 10)


function calculateDistance1(x1, y1, x2, y2) {
    const dx = (x2 + 90) - (x1 + 25);
    const dy = (y2 + 120) - (y1 + 25);
    const distance = Math.sqrt((dx * dx) + (dy * dy));
    if (distance < 90) {
        carCrash.play()
        carHealth--
        heathText.innerHTML = `Car Health : ${carHealth}`
    }
}
function calculateDistance2(x1, y1, x2, y2) {
    const dx = (x2 + 90) - (x1 + 25);
    const dy = (y2 + 120) - (y1 + 25);
    const distance = Math.sqrt((dx * dx) + (dy * dy));
    if (distance < 90) {
        carCrash.play()
        carHealth--
        heathText.innerHTML = `Car Health : ${carHealth}`

    }
}

document.querySelector("#again").addEventListener("click", function () {
    location.reload()
})