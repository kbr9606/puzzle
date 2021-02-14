//html elements
var word1 = document.getElementById("word1"); //answer
var word2 = document.getElementById("word2"); //buttons
var check = document.getElementById("check"); //word1 === word2
var progress = document.getElementById("progress"); //progress check
var time = document.getElementById("time");

//game objects
var game = {
    "btns": [],
    "maxPlay": 3,
    "current": 0
};

game.startTime = Date.now();

game.words = "apple,linux,javascript,tutorial,baby,doll,nanhop,googjoog".split(",");

//choose 1 word from words
game.choose = function () {
    var idx = Math.floor(Math.random() * this.words.length);
    this.answer = this.words[idx];
    this.letters = this.answer.split("");
    word1.innerHTML = this.answer;
};

game.addButtons = function () {
    this.btns = [];
    for (var i = 0; i < this.letters.length; i++) {
        var btn = document.createElement("button");
        btn.innerHTML = this.letters[i];
        word2.appendChild(btn);
        this.btns.push(btn);
    }
};

game.removeButtons = function() {
    for (var i = 0; i < this.btns.length; i++) {
        word2.removeChild(this.btns[i]);
    }
    this.btns = [];
};

game.isCorrect = function() {
    return this.answer === this.letters.join("");
};

game.updateDisplay = function () {
    var gameStr = this.letters.join("");
    if (this.isCorrect()) {
        check.innerHTML = "일치합니다.";
    }
    else {
        check.innerHTML = "불일치합니다.";
    }
};

game.init = function () {
    this.choose();
    this.addButtons();
    this.updateDisplay();
};
game.init();


game.copyBtnText = function () {
    for (var i = 0; i < this.letters.length; i++) {
        this.btns[i].innerHTML = this.letters[i];
    }
};

game.flip = function () {
    var temp = [];
    while (game.letters.length != 0) {
        var s = game.letters.pop();
        temp.push(s);
    }

    this.letters = temp;
    this.copyBtnText();
    this.updateDisplay();
};

game.rshift = function () {
    var s = game.letters.pop();
    this.letters.unshift(s);
    this.copyBtnText();
    this.updateDisplay();
};

game.lshift = function () {
    var s = game.letters.shift();
    this.letters.push(s);
    this.copyBtnText();
    this.updateDisplay();
};

game.progress = function() {
    if (this.isCorrect()) {
        this.current++;
        this.removeButtons();
        this.init();
        this.shuffle();
        var str = "";
        for (var i = 0; i < this.current; i++) {
            str += "O";
        }
        progress.innerHTML = str;
    }
    if (this.current === this.maxPlay) {
        var now = (Date.now() - this.startTime) / 1000;
        alert("Good! Yout record " + now + " s");
        clearInterval(x);
    }
};

//event handler for flip button
var flip = function () {
    game.flip();
    game.progress();
};

var rshift = function () {
    game.rshift();
    game.progress();
};

var lshift = function () {
    game.lshift();
    game.progress();
};

//shuffle
game.shuffle = function () {
    var toggle = Math.floor(Math.random() * 2) === 0;

    if (toggle) {
        this.flip();
    }

    var rmax = Math.max(game.answer.length -2, 1);
    var n = Math.floor(Math.random() * (this.answer.length - 1));

    for (var i = 0; i < n; i++) {
        this.rshift();
    }
};
game.shuffle();

var updateTime = function() {
    now = Date.now() - game.startTime;
    time.innerHTML = (now / 1000) + "s";
}

var x = setInterval(updateTime, 50);