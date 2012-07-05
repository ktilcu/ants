function AntFarm() {
    // Settings
    var width = 200;
    var height = 150;
    var zoom = 2;
    var surfaceBase = 10;
    var antCount = 10;

    var can;
    var ctx;
    var dirt = [];
    var ants = [];
    var fpsBox;
    var frames = 0;

    var realWidth = width * zoom;
    var realHeight = height * zoom;

    window.onload = init;

    function init() {
        var x;
        var y;

        for (x = 0; x < width; x ++) {
            dirt[x] = [];
            for (y = 0; y < height; y ++) {
                dirt[x][y] = 1;
            }
        }

        can = document.createElement('canvas');
        can.width = realWidth;
        can.height = realHeight;

        document.body.appendChild(can);

        fpsBox = document.createElement('div');

        document.body.appendChild(fpsBox);

        ctx = can.getContext('2d');


        ctx.fillRect(0,0,realWidth, realHeight);
        
        initAnts();
        loop();

        showFps();
    }

    function showFps() {
        fpsBox.innerHTML = frames;
        frames = 0;
        setTimeout(showFps, 1000);
    }

    function Ant(){
        this.x = Math.floor(Math.random()*width);
        this.y = 0;
        var thisAnt = this;
        
        this.actions = [
            function left() {
                thisAnt.x --;
            },
            function right() {
                thisAnt.x ++;
            },
            function up() {
                thisAnt.y --;
            },
            function down() {
                thisAnt.y ++;
            }
        ];

    }

    function initAnts() {
        var i;

        for (i = 0; i < antCount; i++) {
            ants[i] = new Ant();
        }
    }

    function antLoop() {
        var i;
        var l = ants.length;
        var x;
        var y;
        var al;
        var r;
        var a;

        for (i = 0; i < l; i++) {
            a = ants[i];

            x = a.x;
            y = a.y;
            

            // Check if dirt is not under ant
            if (!dirt[a.x] || !dirt[a.x][a.y+1]) {
                a.y ++;
            }
            else {
                al = a.actions.length;
                // Cause more left to right
                r = Math.floor(Math.random()*al*0.85);
                a.actions[r]();

            }
            // Creates white trail
            if (a.x > 0 && a.x < width) {
                dirt[a.x][a.y] = 0;
            }

            drawPixel(x,y, 'white');
            drawPixel(a.x, a.y, 'red');
        }
    }

    function loop() {
        antLoop();
        frames ++;
        setTimeout(loop, 0);
    }

    function drawPixel(x, y, color) {
        var realX = x * zoom;
        var realY = y * zoom;

        ctx.fillStyle = color;
        ctx.fillRect(realX, realY, zoom, zoom);
    }
}
