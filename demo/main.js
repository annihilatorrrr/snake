const canvas = document.getElementById("jsdos");
const speed = document.getElementById("speed");

Dos(canvas, { cycles: 1, onprogress: ()=>{} }).ready((fs, main) =>
    fs.extract("snake.zip").then(() =>
        main(["snake.com"]).then(ci => {
            runLag();
            swipedetect(swipedir => swipedir && ci.simulateKeyPress(36 + swipedir));
        })
    )
);

function swipedetect(callback) {
    var startX, startY;

    canvas.addEventListener("touchstart", function(e) {
        startX = e.changedTouches[0].pageX;
        startY = e.changedTouches[0].pageY;
    }, false);

    canvas.addEventListener("touchend", function(e) {
        distX = e.changedTouches[0].pageX - startX;
        distY = e.changedTouches[0].pageY - startY;
        if (Math.abs(distX) >= 50 && Math.abs(distY) <= 50) swipedir = (distX < 0) ? 1 : 3;
        else if (Math.abs(distY) >= 50 && Math.abs(distX) <= 50) swipedir = (distY < 0) ? 2 : 4;
        callback(swipedir);
    }, false);
}

function runLag() {
    var start = Date.now();
    while (Date.now() < start + 100 - speed.value);
    setTimeout(runLag, .1);
}