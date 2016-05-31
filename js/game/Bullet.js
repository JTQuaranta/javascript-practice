/* Requires:
ScreenWidget.js
 */
function Bullet(context)
{
    ScreenWidget.call(this, context);
    var self = this;

    self.render = function ()
    {
        self.context.fillStyle = self.color;
		self.context.fillRect(self.x, self.y, 20, 20);
    };

    self.update = function ()
    {
		if (self.direction === 'd')
		{
			self.y += self.speed;
		}
		else
		{
			self.y -= self.speed;
		}
        self.checkBoundary();
		
		self.hitbox = {
		left:   (self.x),
		top:    (self.y),
		right:  (self.x+20),
		bottom: (self.y+20) };
    };

    self.checkBoundary = function()
    {
        if(self.y > maxY + 5)
        {
           self.deleteme = true;
        }
    };
	
	self.getDeleteMe = function()
    {
        return self.deleteme;
    };
	
	self.getPC = function()
    {
        return self.playercontrolled;
    };
	
	self.getHitbox = function()
    {
        return self.hitbox;
    };
}

Bullet.makeBullet = function(context, playercontrolled, direction, speed, x, y)
{
    var someBullet = new Bullet(context);
	if(playercontrolled === true)
	{
		someBullet.color = "rgb(80, 182, 255)";
	}
    else
	{
		someBullet.color = "rgb(255, 0, 0)";
	}
    someBullet.speed = speed;
	someBullet.playercontrolled = playercontrolled;
	someBullet.direction = direction;
	someBullet.deleteme = false;
    someBullet.x = x;
    someBullet.y = y;
    return someBullet;
};