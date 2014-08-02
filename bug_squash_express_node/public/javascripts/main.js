enchant();

// function getRandomInt(min, max) {
//                       return Math.floor(Math.random() * 100)
//                     };

var random = Math.floor(Math.random() * 320);


window.onload = function(){
    var game = new Core(700, 700);
    game.fps = random;
    game.preload("./images/bug1.svg");

    game.onload = function(){
        var count = 0;
        var bug1 = new Sprite(85, 85);
        var bug2 = new Sprite(85, 85);

        var startBug = function(){
            bug1.image = game.assets["./images/bug1.svg"];
            bug1.x = Math.floor(Math.random() * 250);
            bug1.y = Math.floor(Math.random() * 250);
            game.rootScene.addChild(bug1);
        };

        bug1.image = game.assets["./images/bug1.svg"];
        bug2.image = game.assets["./images/bug1.svg"];
        bug1.x = Math.floor(Math.random() * 250);
        bug1.y = Math.floor(Math.random() * 250);
        bug2.x = Math.floor(Math.random() * 250);
        bug2.y = Math.floor(Math.random() * 250);
        bug1.frame = 5;
        bug2.frame = 5;
        game.rootScene.addChild(bug1);
        game.rootScene.addChild(bug2);

        bug1.addEventListener("enterframe", function(){
            this.x += 1;
            this.frame = this.age % 2 + 6;
            if (this.x === 700){
                game.stop();
            }
        });

        bug2.addEventListener("enterframe", function(){
            this.x += 1;
            this.frame = this.age % 2 + 6;
            if (this.x === 700){
                game.stop();
            }
        });

        bug1.addEventListener("touchstart", function(){
            game.rootScene.removeChild(bug1);
            startBug();
            count++;
        });

        bug2.addEventListener("touchstart", function(){
            game.rootScene.removeChild(bug2);
            count++;
             if (count===2){
                location.reload();
            }
        });
        var loseGame = function(){
            if (bug1.x === 320 || bug2.x === 320){
            }
        };
    };
    game.start();
};
