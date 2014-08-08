enchant();

window.onload = function() {
    var game       = new Game(700, 700);
    var level      = 8;
    var maxTime    = 10;
    game.score     = 0;
    game.fps       = 24;
    game.easySpeed = 1;
    game.medSpeed  = 2;
    game.hardSpeed = 4;
    game.preload(['./images/bug1.svg', './images/bug2.svg', './images/bug3.svg', './images/picnic.png']);

    //Easy Bug constructor
    var Scorpion = enchant.Class.create(enchant.Sprite, {
        initialize: function(x, y) {
            enchant.Sprite.call(this, 80, 40);
            this.x = x;
            this.y = y;
            this.image = game.assets['./images/bug3.svg'];
            this.frame = 5;
            game.rootScene.addChild(this);
        }
    });

    //Medium bug constructor
    var LadyBug = enchant.Class.create(enchant.Sprite, {
        initialize: function(x, y) {
            enchant.Sprite.call(this, 59, 50);
            this.x = x;
            this.y = y;
            this.image = game.assets['./images/bug1.svg'];
            this.frame = 5;
            game.rootScene.addChild(this);
        }
    });

    //Hard bug constructor
    var Ant = enchant.Class.create(enchant.Sprite, {
        initialize: function(x, y) {
            enchant.Sprite.call(this, 40, 45);
            this.x = x;
            this.y = y;
            this.image = game.assets['./images/bug2.svg'];
            this.frame = 5;
            debugger
            game.rootScene.addChild(this);
        }
    });

    // Defines Easy-Level bug (slow/large)
    var EasyBug = enchant.Class.create(Scorpion, {
        initialize: function(x, y) {
            Scorpion.call(this, x, y);
            this.addEventListener('enterframe', function() {
                this.x += game.easySpeed;
                // this.y += game.easySpeed;
                this.frame = [0, 1, 0, 2][Math.floor(this.age/5) % 4] + 5;

                if (this.x === 650){
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
    var MedBug = enchant.Class.create(LadyBug, {
        initialize: function(x, y) {
            LadyBug.call(this, x, y);
            this.addEventListener('enterframe', function() {
                this.x += game.medSpeed;
                // this.y += game.medSpeed;
                this.frame = [0, 1, 0, 2][Math.floor(this.age/5) % 4] + 5;
                if (this.x === 650){
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
    var HardBug = enchant.Class.create(Ant, {
        initialize: function(x, y) {
            Ant.call(this, x, y);
            this.addEventListener('enterframe', function() {
                this.x += game.hardSpeed;
                // this.y += game.hardSpeed;
                this.frame = [0, 1, 0, 2][Math.floor(this.age/5) % 4] + 5;
                if (this.x === 650){
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

            var splashLabel = new Label("WELCOME! <br/><br/>Let's Smash Some Bugs<br/><br/>Tap To Start!");
            splashLabel.x = 185;
            splashLabel.y = 150;
            splashLabel.image = 'black';
            this.backgroundColor = 'rgba(255,255,255,.5)';
            splashLabel.font = "24px bold 'Helvetica'";
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
            this.backgroundColor = 'rgba(255,255,255,.5)';

            var changeLabel = new Label("Great Job!<br/><br/>You Passed Level " + level + "<br/><br/>With a Score of:" + game.score + "<br/><br/>Tap for Level: " + (level + 1) );
            changeLabel.x = 185;
            changeLabel.y = 150;
            changeLabel.color = 'black';
            changeLabel.font = "24px bold 'Helvetica'";
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
            this.backgroundColor = 'rgba(255,255,255,.5)';

            var gameOverLabel = new Label("GAME OVER<br/><br/>Tap to Restart<br/><br/>Your Score:" + game.score );
            gameOverLabel.x = 185;
            gameOverLabel.y = 150;
            gameOverLabel.color = 'black';
            gameOverLabel.font = "24px strong 'Helvetica'";
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
        timeLabel.x = 40;
        timeLabel.y = 5;
        timeLabel.font ="24px 'Helvetica'";

        game.rootScene.addChild(timeLabel);
        game.rootScene.addChild(scoreLabel);
        var maxTime = 10;

        game.rootScene.addEventListener('enterframe', function() {

            //creates event listen for when points are gained -
            //triggered when bugs are 'killed'
            scoreLabel.addEventListener('enterframe', function(){
                this.text = "Score:"+game.score;
            });
            scoreLabel.x = 500;
            scoreLabel.y = 5;
            scoreLabel.color = "black";
            scoreLabel.font = "24px 'Helvetica'";

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
                        timerDown.frameCount = 1440;
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
                for (var j = 0; j <= level; j++){
                    new EasyBug(0, (rand(620) + 30));
                    if (j > 3 && j <= 7){
                        new MedBug(0, (rand(620) + 30));
                    } else if ( j > 7) {
                        new MedBug(0, (rand(620) + 30));
                        new HardBug(0, (rand(620) + 30));
                    }
                }
            }
        });
    };//game.onload();

    //tell game to start
    game.start();
};



