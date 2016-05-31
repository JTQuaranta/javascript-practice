/*
Requires: ScreenWidget.js
 */
function EnemyShip(context, image, imageOffset, width, height, x)
{
    ScreenWidget.call(this, context);
    var self = this;
    self.image = image;
	self.imageIndex = (Math.floor(Math.random() * 10));
    self.imageOffset = imageOffset;
    self.width = width;
    self.height = height;
	self.x = x;
	self.y = -50;
	self.speed = 1.5;
	self.rof = 20;								//rate of fire
	self.fire = false;							//time to shoot?

    self.render = function()
    {
        self.context.drawImage(self.image,       //source image
            self.imageIndex * self.imageOffset,  //sprite x offset
            0,                                   //sprite y offset
            self.width,                          //sprite width
            self.height,                         //sprite height
            self.x,                              //destination x
            self.y,                              //destination y
            self.width,                          //destination width (for scaling)
            self.height);                        //destination height (for scaling)
    };
	
	self.update = function ()
    {
		//update shootinng
		self.rof += 1;
		if (self.rof > 100)
		{
			self.fire = true;
			self.rof = 0;
		}
		
		//update movement
        self.y += self.speed;
        self.checkBoundary();
		
		//update hitbox
		self.hitbox = {
		left:   (self.x+5),
		top:    (self.y+5),
		right:  (self.x+61),
		bottom: (self.y+61) };
    };
	
	self.checkBoundary = function()
    {
        if(self.y > maxY)
        {
            //reset location
            self.y = -50;
        }
    };
	
	self.getX = function()
    {
        return self.x;
    };
	
	self.getY = function()
    {
        return self.y;
    };
	
	self.getFire = function()
    {
        return self.fire;
    };
	
	self.setFire = function(set)
    {
        self.fire = set;
    };
	
	self.getHitbox = function()
    {
        return self.hitbox;
    };
}