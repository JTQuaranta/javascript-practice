/*
Requires: ScreenWidget.js
 */
function SpaceShip(context, image, imageIndex, imageOffset, width, height)
{
    ScreenWidget.call(this, context);
    var self = this;
    self.image = image;
    self.imageIndex = imageIndex;
    self.imageOffset = imageOffset;
    self.width = width;
    self.height = height;
	self.rof = 90;								//rate of fire
	
	

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
	
	self.update = function()
    {
		if (self.rof < 100)
		{
			self.rof += 1;
		}
		self.hitbox = {
		left:   (self.x+15),
		top:    (self.y+15),
		right:  (self.x+51),
		bottom: (self.y+61) };
    };

    self.mouseMoved = function(evt)
    {
        self.x = evt.clientX - self.width / 2;
        self.y = evt.clientY - self.height / 2;
    }
	
	self.mouseClicked = function(evt)
    {
        if (self.rof > 99)
		{
			self.rof = 0;
		}
    }
	
	self.getX = function()
    {
        return self.x;
    };
	
	self.getY = function()
    {
        return self.y;
    };
	
	self.getHitbox = function()
    {
        return self.hitbox;
    };
}