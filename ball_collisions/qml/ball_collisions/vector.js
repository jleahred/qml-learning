.pragma library

function Cart(x, y)
{
    this.x=x;
    this.y=y;
}

function Polar(angle, radius)
{
    this.angle=angle;
    this.radius=radius;
    this.x=Math.cos(angle)*radius
    this.y=Math.sin(angle)*radius
}

function Polar_degrees(angle_degrees, radius)
{
    return new Polar(angle_degrees*Math.PI/180, radius)
}
