enchant();

window.onload = function() {
    var game = new Game(700, 700);
    var level = 8;
    var maxTime = 10;
    game.fps = 24;
    game.easySpeed = 1;
    game.medSpeed  = 2;
    game.hardSpeed = 4;
    // game.touched = true;
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

    // Defines Easy-Level bug (slow/large)
    var EasyBug = enchant.Class.create(Bug, {
        initialize: function(x, y) {
            Bug.call(this, x, y);
            this.addEventListener('enterframe', function() {
                this.x += game.easySpeed;
                // this.y += game.easySpeed;
                this.frame = [0, 1, 0, 2][Math.floor(this.age/5) % 4] + 5;

                if (this.x === 700){
                    game.replaceScene(new SceneGameOver());
                    game.stop();
                }
            });
        },
        ontouchend: function() {
            game.score += 25;
            game.rootScene.removeChild(this);
            game.rootScene.addChild(scoreLabel);
        }
    });

    //Defines Medium-Level bug (slowish/largish)
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
            game.score += 50;
            game.rootScene.removeChild(this);
            game.rootScene.addChild(scoreLabel);
        }
    });

    //Defines Hard-Level bug (small/fast)
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
            this.addChild(gameOverLabel);
        },
        ontouchend: function() {
            location.reload();
        }
    });

    var SceneChange = Class.create(Scene, {
        initialize: function() {
            Scene.apply(this);
            // this.backgroundColor = 'black';

            var changeLabel = new Label("Great Job!<br/><br/>You Passed Level " + level + "<br/><br/>With a Score of:" + game.score + "<br/><br/>Tap for Level: " + (level + 1) );
            changeLabel.x = 250;
            changeLabel.y = 150;
            changeLabel.color = 'black';
            changeLabel.font = '32px strong';
            changeLabel.textAlign = 'center';
            this.addChild(changeLabel);
        },
        ontouchend: function() {
            game.replaceScene(game.rootScene);
        }
    });

    var SceneSplash = Class.create(Scene, {
        initialize: function() {
            Scene.apply(this);
            // this.backgroundColor = 'black';

            var splashLabel = new Label("WELCOME!<br/><br/>Let's Smash Some Bugs<br/><br/>Tap To Start!");
            splashLabel.x = 250;
            splashLabel.y = 150;
            splashLabel.color = 'black';
            splashLabel.font = '32px strong';
            splashLabel.textAlign = 'center';
            this.addChild(splashLabel);
        },
        ontouchend: function() {
            game.replaceScene(game.rootScene);

        }
    });

    // This object starts counting down once the game is started.
        var timerDown = {
            frameCount: maxTime * game.fps, // total needed frames.
            tick: function () {
                this.frameCount -= 1;  // count down
            }
        };

    game.onload = function() {
        splash = new SceneSplash();
        game.pushScene(splash);
        var scoreLabel = new Label();
        var timeLabel = new Label();
        game.rootScene.addChild(timeLabel);
        game.rootScene.addChild(scoreLabel);
        var maxTime = 10;


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
            var seconds = Math.ceil(timerDown.frameCount / game.fps);
            timeLabel.text = 'Time remaining: ' + seconds;

            if (seconds === 0){

                var children = game.rootScene.childNodes;
                for ( var i = 2; i <= children.length; i++){
                    if (children.length === 2) {
                        timerDown.frameCount = 240;
                        level++;
                        var sceneChange = new SceneChange();
                        game.replaceScene(sceneChange);
                    } else {
                        game.rootScene.removeChild(children[children.length - 1]);
                    }
                }


            }
            if((this.age)% 20 === 0 && level < 3 && game.rootScene.childNodes.length > 1){
                new EasyBug(0, rand(320));
            } else if ((this.age - 10) % 20 === 0 && level > 2 && level < 7 && game.rootScene.childNodes.length > 1) {
                new EasyBug(0, rand(320));
                new MedBug(0, rand(320));
                new HardBug(0, rand(320));
            } else if ((this.age - 10) % 19 === 0 && level > 7 && game.rootScene.childNodes.length > 1) {
                debugger

                new EasyBug(0, rand(320));
                new MedBug(0, rand(320));
                new HardBug(0, rand(320));
            }

        });
    };
    game.start();
};
function rand(num){
    return Math.floor( Math.random() * num);
}
