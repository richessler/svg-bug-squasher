enchant();

window.onload = function() {
    var game = new Game(700, 700);
    var level = 1;
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
                    game.end();
                }
            });
        },
        ontouchend: function() {
            game.score += 100;
            game.rootScene.removeChild(this);
            // game.rootScene.addChild(scoreLabel);
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
                    game.end();
                }
            });
        },
        ontouchend: function() {
            game.score += 100;
            game.rootScene.removeChild(this);
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
                    game.end();
                }
            });
        },
        ontouchend: function() {
            game.score += 100;
            game.rootScene.removeChild(this);
        }
    });

    game.onload = function() {
        game.rootScene.addEventListener('enterframe', function() {
            game.score = 0;
            scoreLabel = new Label("Score: ");
            scoreLabel.addEventListener('enterframe', function(){
                this.text = "Score:"+game.score;
            });
            scoreLabel.x = 600;
            scoreLabel.color = "black";
            scoreLabel.font = "18px 'Helvetica'";
            game.rootScene.addChild(scoreLabel);

            if(this.age % 20 === 0 && level < 3 ){
                var easyBug = new EasyBug(0, rand(320));
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
