window.onload = function(){
    var canvas,
        canvasLeft,
        canvasTop,
        ctx;
        
    var pj;
    var caramelos = [];

    function create(){
        canvas = document.getElementById('gameCanvas');
        canvasLeft = canvas.offsetLeft;
        canvasTop = canvas.offsetTop;
        ctx = canvas.getContext('2d');

        pj = new Jugador(canvas);

        canvas.addEventListener('click', function(event) {
            var x = event.pageX - canvasLeft,
                y = event.pageY - canvasTop;
            var dir = [0,0];
            dir.x = x-pj.x - pj.sprite.width/2;
            dir.y = y-pj.y - pj.sprite.height/2;
            var mod = Math.sqrt((x*x) + (y*y));
            dir.x = dir.x/mod;
            dir.y = dir.y/mod;
            //console.log(dir.x + " " + dir.y);
            caramelos.push(new Caramelo(canvas, dir, pj.x, pj.y));
        }, false);
        

    }

    function update(progress) {
        caramelos.forEach( function(valor, i, array){
            caramelos[i].update(progress);
        });
    }
      
    function draw() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pj.draw();

        caramelos.forEach( function(valor, i, array){
            caramelos[i].draw();
        });
    }
      
    function loop(timestamp) {
        var progress = timestamp - lastRender
      
        update(progress)
        draw()
      
        lastRender = timestamp
        window.requestAnimationFrame(loop)
    }
    create();
    var lastRender = 0;
    window.requestAnimationFrame(loop);
    
}