/*
Main file for Star Game
Requires: ScreenWidget.js
          Star.js
          SpaceShip.js
		  EnemyShip.js
 */
function StarGame(canvas, shipImageSrc, enemyImageSrc)
{
    var self = this;
    self.canvas = canvas;
    self.context = canvas.getContext("2d");
    self.shipImage = new Image();
    self.shipImage.src = shipImageSrc;
	self.enemyImage = new Image();
	self.enemyImage.src = enemyImageSrc;
	self.newshiptimer = 0;
    self.widgets = Array();
	self.enemies = Array();
	self.bullets = Array();
	self.lives = 3;
	self.wins = 0;

    //hide mouse
    self.canvas.style.cursor = "none";

    //set up player piece
    self.playerShip = new SpaceShip(self.context, self.shipImage, 3, 66, 64, 64);

    //set up globals
    maxX = canvas.clientWidth;
    maxY = canvas.clientHeight;



    self.begin = function()
    {
        self.init();
        self.renderLoop();
    };

    //resets game state
    self.init = function()
    {
        //set up starfield
        //generate 100 small stars
        for (var i = 0; i < 100; i++)
        {
            //make it so most stars are in the far background
            var howFast = Math.random() * 100;
            var speed = 5;
            if (howFast > 60)
            {
                speed = 2;
            }
            else if (howFast > 20)
            {
                speed = 1;
            }
            //var speed = (Math.floor(Math.random() * 3) + 1) * 1;
            var someStar = Star.makeStar(self.context, 2, speed);
            self.widgets.push(someStar);
        }

        //generate 10 large stars
        for (var i = 0; i < 10; i++) {
            var speed = (Math.floor(Math.random() * 3) + 1) * 1;
            var someStar = Star.makeStar(self.context, 5, speed);
            self.widgets.push(someStar);
        }

        //generate 20 medium stars
        for (var i = 0; i < 10; i++) {
            var speed = (Math.floor(Math.random() * 3) + 1) * 1;
            var someStar = Star.makeStar(self.context, 3, speed);
            self.widgets.push(someStar);
        }

        //and 200 tiny stars
        for (var i = 0; i < 200; i++) {
            var speed = (Math.floor(Math.random() * 3) + 1) * 1;
            var someStar = Star.makeStar(self.context, 1, speed);
            self.widgets.push(someStar);
        }

        //placing ship last puts it on top of the stars
        self.widgets.push(self.playerShip);

        //begin game
        window.requestAnimationFrame(self.renderLoop);
    };

    self.renderLoop = function()
    {
        //clear canvas
        self.context.clearRect(0, 0, maxX, maxY);

        //paint black
        self.context.fillStyle = "rgb(0, 0, 0)";
        self.context.fillRect(0, 0, maxX, maxY);
		
		//uptick new enemy timer
		self.newshiptimer = self.newshiptimer + 1;
		if (self.newshiptimer > 250)
        {
			self.newshiptimer = 0;
			var someEnemy = new EnemyShip(self.context, self.enemyImage, 66, 64, 64, (Math.floor(Math.random() * 400) + 20));
			self.enemies.push(someEnemy);
        }
		

        //render widgets
        for(var i = 0; i < self.widgets.length; i++)
        {
            self.widgets[i].render();
            self.widgets[i].update();
        }
		
		//render enemies, grab all bullets
        for(var i = 0; i < self.enemies.length; i++)
        {
            self.enemies[i].render();
            self.enemies[i].update();
			if(self.enemies[i].getFire() === true)
			{
				self.enemies[i].setFire(false);
				var someBullet = Bullet.makeBullet(self.context, false, 'd', 3, (self.enemies[i].getX() + 24), (self.enemies[i].getY() + 51));
				self.bullets.push(someBullet);
			}
        }
		
		//render bullets
        for(var i = 0; i < self.bullets.length; i++)
        {
            self.bullets[i].render();
            self.bullets[i].update();
			if (self.bullets[i].getDeleteMe() === true)
			{
				self.bullets.splice(i, 1);
				i -= 1;
			}
        }
		
		//check ship collision
		for(var i = 0; i < self.enemies.length; i++)
        {
			if(intersectRect(self.playerShip.getHitbox(), self.enemies[i].getHitbox()))
			{
				//ouch
				self.lives = 0;
			}
        }
		
		//check bullet collision
		for(var i = 0; i < self.bullets.length; i++)
        {
			if(self.bullets[i].getPC() === false)
			{
				if(intersectRect(self.playerShip.getHitbox(), self.bullets[i].getHitbox()))
				{
					//ouch
					self.bullets.splice(i, 1);
					i -= 1;
					self.lives -= 1;
				}
			}
			else
			{
				
			
				for(var j = 0; j < self.enemies.length; j++)
				{
					if(intersectRect(self.enemies[j].getHitbox(), self.bullets[i].getHitbox()))
					{
						//ouch
						self.bullets.splice(i, 1);
						self.enemies.splice(j, 1);
						i -= 1;
						j -= 1;
						self.wins += 1;
					}
			
				}
			}
        }
		
		if (self.wins < 10 && self.lives > 0)
		{
			window.requestAnimationFrame(self.renderLoop);
		}
		else if (self.lives < 1)
		{
			self.context.fillStyle = "rgb(255, 255, 255)";
			self.context.font = "Bold Italic 72px OCR A Std";
			self.context.textAlign = "center";
			self.context.fillText("REKT",250,250);
		}
		else
		{
			self.context.fillStyle = "rgb(255, 255, 255)";
			self.context.font = "Bold Italic 72px OCR A Std";
			self.context.textAlign = "center";
			self.context.fillText("YOU",250,200);
			self.context.fillText("RULE",250,300);
		}
		
    };
	
	function intersectRect(r1, r2) 
	{
		return !(r2.left > r1.right || 
					r2.right < r1.left || 
					r2.top > r1.bottom ||
					r2.bottom < r1.top);
	}
	
	
	
	/********************* mouse events *************************/

    self.canvasMouseMoved = function(evt)
    {
        //update interested parties
        self.playerShip.mouseMoved(evt);
    };
	
	self.canvasMouseClicked = function(evt)
    {
		if (self.playerShip.rof === 100)
		{
			var someBullet = Bullet.makeBullet(self.context, true, 'u', 5, (self.playerShip.getX() + 22), (self.playerShip.getY() + 10));
            self.bullets.push(someBullet);
		}
        self.playerShip.mouseClicked(evt);
		
    };

    //set up event listeners
    canvas.addEventListener("mousemove", self.canvasMouseMoved, false);
	
	canvas.addEventListener("click", self.canvasMouseClicked, false);
}
