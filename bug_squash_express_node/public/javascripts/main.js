enchant();

window.onload = function() {
    var game       = new Game(700, 700);
    var level      = 5;
    var maxTime    = 60;
    game.score     = 0;
    game.fps       = 24;
    game.easySpeed = 1;
    game.medSpeed  = 2;
    game.hardSpeed = 4;
    game.preload(['./images/bug1.svg', './images/bug2.svg']);

    //Bug Constructor - extending from enchant.Sprite
    var LadyBug = enchant.Class.create(enchant.Sprite, {
        initialize: function(x, y) {
            enchant.Sprite.call(this, 85, 85);
            this.x = x;
            this.y = y;
            this.image = game.assets['./images/bug1.svg'];
            this.frame = 5;
            game.rootScene.addChild(this);
        }
    });

    //Bug Constructor - extending from enchant.Sprite
    var DragonFly = enchant.Class.create(enchant.Sprite, {
        initialize: function(x, y) {
            enchant.Sprite.call(this, 85, 85);
            this.x = x;
            this.y = y;
            this.image = game.assets['./images/bug2.svg'];
            this.frame = 5;
            game.rootScene.addChild(this);
        }
    });

    // Defines Easy-Level bug (slow/large)
    var EasyBug = enchant.Class.create(LadyBug, {
        initialize: function(x, y) {
            LadyBug.call(this, x, y);
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
        //adds points, removes(kills) bug from screen, updates score
        ontouchend: function() {
            game.score += 25;
            game.rootScene.removeChild(this);
            game.rootScene.addChild(scoreLabel);
        }
    });

    //Defines Medium-Level bug (slowish/largish)
    var MedBug = enchant.Class.create(DragonFly, {
        initialize: function(x, y) {
            DragonFly.call(this, x, y);
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
        //adds points, removes(kills) bug from screen, updates score
        ontouchend: function() {
            game.score += 50;
            game.rootScene.removeChild(this);
            game.rootScene.addChild(scoreLabel);
        }
    });

    //Defines Hard-Level bug (small/fast)
    var HardBug = enchant.Class.create(LadyBug, {
        initialize: function(x, y) {
            LadyBug.call(this, x, y);
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
        //adds points, removes(kills) bug from screen, updates score
        ontouchend: function() {
            game.score += 100;
            game.rootScene.removeChild(this);
            game.rootScene.addChild(scoreLabel);
        }
    });

    //Creates Game scene for home page
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

    //Creates Game scene for in between levels
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

    //Creates Game scene for Gameover
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

    // This object starts counting down once the game is started.
        var timerDown = {
            frameCount: maxTime * game.fps, // total needed frames.
            tick: function () {
                this.frameCount -= 1;  // count down
            }
        };

    //game functionality when game is started
    game.onload = function() {
        splash = new SceneSplash();
        game.pushScene(splash);
        var scoreLabel = new Label();
        var timeLabel = new Label();
        game.rootScene.addChild(timeLabel);
        game.rootScene.addChild(scoreLabel);
        var maxTime = 10;

        game.rootScene.addEventListener('enterframe', function() {

            //creates event listen for when points are gained -
            //triggered when bugs are 'killed'
            scoreLabel.addEventListener('enterframe', function(){
                this.text = "Score:"+game.score;
            });
            scoreLabel.x = 600;
            scoreLabel.color = "black";
            scoreLabel.font = "18px 'Helvetica'";

            //call tick function for timerDown function
            //to count down game clock
            timerDown.tick();

            //logic to uppdate time label
            var seconds = Math.ceil(timerDown.frameCount / game.fps);
            timeLabel.text = 'Time remaining: ' + seconds + ' seconds';

            //logic to reset game clock for each level
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
            //logic to release bugs based on the level
            //more bugs released the further you get
            if ((this.age) % 40 === 0){
                for (var j = 0; j < level; j++){
                    new EasyBug(0, rand(320));
                    if (j > 3 && j <= 7){
                        new MedBug(0, rand(320));
                    } else if ( j > 7) {
                        new MedBug(0, rand(320));
                        new HardBug(0, rand(320));
                    }
                }
            }

        });
    };
    //tell game to start
    game.start();
};



