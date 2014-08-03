enchant();

window.onload = function() {
    var game = new Game(700, 700);
    var level = 1;
    game.fps = 24;
    game.easySpeed = 1;
    game.medSpeed  = 2;
    game.hardSpeed = 4;
    game.touched = true;
    game.preload('./images/bug1.svg');


    var Bug = enchant.Class.create(enchant.Sprite, {
        initialize: function(x, y) {
            enchant.Sprite.call(this, 85, 85);
            this.x = x;
            this.y = y;
            this.image = game.assets['./images/bug1.svg'];
            this.frame = 5;
            game.rootScene.addChild(this);
        }
    });

    var EasyBug = enchant.Class.create(Bug, {
        initialize: function(x, y) {
            Bug.call(this, x, y);
            this.addEventListener('enterframe', function() {
                this.x += game.easySpeed;
                // this.y += game.easySpeed;
                this.frame = [0, 1, 0, 2][Math.floor(this.age/5) % 4] + 5;

                if (this.x === 700){
                    game.replaceScene(new SceneGameOver());
                    game.end();
                }
            });
        },
        ontouchend: function() {
            game.score += 100;
            game.rootScene.removeChild(this);
            game.rootScene.addChild(scoreLabel);
        }
    });

    var MedBug = enchant.Class.create(Bug, {
        initialize: function(x, y) {
            Bug.call(this, x, y);
            this.addEventListener('enterframe', function() {
                this.x += game.medSpeed;
                // this.y += game.medSpeed;
                this.frame = [0, 1, 0, 2][Math.floor(this.age/5) % 4] + 5;
                if (this.x === 700){
                    game.replaceScene(new SceneGameOver());
                    game.end();
                }
            });
        },
        ontouchend: function() {
            game.score += 100;
            game.rootScene.removeChild(this);
            game.rootScene.addChild(scoreLabel);
        }
    });

    var HardBug = enchant.Class.create(Bug, {
        initialize: function(x, y) {
            Bug.call(this, x, y);
            this.addEventListener('enterframe', function() {
                this.x += game.hardSpeed;
                // this.y += game.hardSpeed;
                this.frame = [0, 1, 0, 2][Math.floor(this.age/5) % 4] + 5;
                if (this.x === 700){
                    game.replaceScene(new SceneGameOver());
                    game.end();
                }
            });
        },
        ontouchend: function() {
            game.score += 100;
            game.rootScene.removeChild(this);
            game.rootScene.addChild(scoreLabel);
        }
    });

    var SceneGameOver = Class.create(Scene, {
        initialize: function() {
            Scene.apply(this);
            // this.backgroundColor = 'black';

            var gameOverLabel = new Label("GAME OVER<br/><br/>Tap to Restart<br/><br/>Your Score:" + game.score );
            gameOverLabel.x = 250;
            gameOverLabel.y = 150;
            gameOverLabel.color = 'black';
            gameOverLabel.font = '32px strong';
            gameOverLabel.textAlign = 'center';
            game.rootScene.addChild(gameOverLabel);
        },
        ontouchend: function() {
            location.reload();
        }
    });

    // This object starts counting down once the game is started.
    var timerDown = {
        frameCount: 30 * game.fps,     // total needed frames.
        tick: function () {
                this.frameCount -= 1;  // count down instead of up.
        }
    };

    game.onload = function() {

        var timeLabel = new Label("Collect droplets as fast as you can.");
        game.rootScene.addChild(timeLabel);
        scoreLabel = new Label("Score: ");
        game.rootScene.addChild(scoreLabel);

        game.score = 0;
        game.rootScene.addEventListener('enterframe', function() {
            scoreLabel.addEventListener('enterframe', function(){
                this.text = "Score:"+game.score;
            });
            scoreLabel.x = 600;
            scoreLabel.color = "black";
            scoreLabel.font = "18px 'Helvetica'";

            // Tick the timer.
            timerDown.tick();

            // Update label.
            timeLabel.text = 'Time remaining: ' +
            Math.ceil(timerDown.frameCount / game.fps);

            if(this.age % 20 === 0 && level < 3 ){
                var easyBug = new HardBug(0, rand(320));
            // } else if (this.age % 20 === 0 && level > 2 && level < 7 ) {
            //     var easyBug = new EasyBug(0, rand(320));
            //     var medBug  = new MedBug(0, rand(320));
            //     var hardBug = new HardBug(0, rand(320));
            // } else {
            //     var easyBug = new EasyBug(0, rand(320));
            //     var medBug  = new MedBug(0, rand(320));
            //     var hardBug = new HardBug(0, rand(320));
            }

        });
    };
    game.start();
};
function rand(num){
    return Math.floor( Math.random() * num);
}
