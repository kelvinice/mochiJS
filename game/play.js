

(function () {
    //Code Here
    function init() {
        let canv = document.getElementById("game-canvas");
        let mochi = new Mochi(canv);
        ctx = mochi.getContext2d();
        mochi.setMaximize();
        mochi.setReactiveListener(handleWindowListener);

        width = mochi.getWidthCanvas();
        height = mochi.getHeightCanvas();

        mochi.makeWindowReactive();

        let am = new AssetManager();
        
        let img = am.loadImage("guy.png");
        img.onload = () =>{
            guy = new PersonAnimation(img,0,0,100,200);
            setInterval(update, 1000/60);
            requestAnimationFrame(render);
        }
        
        balls = [];
        balls.push(new Ball(0,0,100,100));
        balls.push(new Ball(300,200,100,100));
        balls.push(new Ball(400,600,100,100));
        balls.push(new Ball(600,200,100,100));
        balls.push(new Ball(700,300,100,100));
    }
    
    function render() {
        ctx.clearRect(0,0,width,height);
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,width,height);

        balls.forEach(b => {
            b.draw(ctx);
        });
        guy.draw(ctx);

        requestAnimationFrame(render);
    }

    function update() {
        balls.forEach(b => {
            b.update();
        });

        for (let i = 0; i < balls.length; i++) {
            for (let j = i+1; j < balls.length; j++) {
                if(balls[i].isIntersect(balls[j])){
                    balls[i].isCollide = true;
                    balls[j].isCollide = true;

                    let difX = Math.abs(balls[i].x - balls[j].x);
                    let difY = Math.abs(balls[i].y - balls[j].y);

                    let xPercentage = difX/(difX+difY);
                    let yPercentage = difY/(difX+difY);

                    if(balls[i].x < balls[j].x){
                        balls[i].velX = -2 * xPercentage;
                        balls[j].velX = 2 * xPercentage;
                    }else{
                        balls[i].velX = 2 * xPercentage;
                        balls[j].velX = -2 * xPercentage;
                    }

                    if(balls[i].y < balls[j].y){
                        balls[i].velY = -2 * yPercentage;
                        balls[j].velY = 2 * yPercentage;
                    }else{
                        balls[i].velY = 2 * yPercentage;
                        balls[j].velY = -2 * yPercentage;
                    }
                }
            }
        }

    }

    function handleWindowListener(w, h){
        width = w;
        height = h;
    }

    init();
})();