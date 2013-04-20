.pragma library






function Vector()
{
    var x;      var y;

    var a;      var r;


    this.getXY = function()
    {
        if(x === undefined)
        {
            x = Math.cos(a)*r
            y = Math.sin(a)*r
        }
        return  {x:x, y:y}
    }


    this.getX = function()
    {
        return this.getXY().x
    }

    this.getY = function()
    {
        return this.getXY().y
    }

    this.setXY = function(_x, _y)
    {
        x=_x
        y=_y

        a = undefined
        r = undefined
    }

    this.getPolar = function()
    {
        if(a === undefined)
        {
            if(y>-1E-10  &&  y<1E-10)
                if(x>=0)
                    a=0
                else
                    a=Math.PI
            else
                if(x>=0)
                    a=Math.atan(y/x);
                else
                    a= Math.PI + Math.atan(y/x);
            r = Math.sqrt(x*x + y*y)
        }

        return {a: a, r: r}
    }

    this.setPolar = function(_a, _r)
    {
        if(_r>=0)
            a = _a % (Math.PI*2)
        else
            a = (_a+Math.PI) % (Math.PI*2)

        r = _r

        x = undefined
        y = undefined
    }

    this.setPolarDegrees = function(_a, _r)
    {
        a = _a*Math.PI/180
        r = _r
    }
}



function  vectorXY(x,y)
{
    var v= new Vector()
    v.setXY(x,y)
    return v
}

function  vectorPolar(a,r)
{
    var v= new Vector()
    v.setPolar(a,r)
    return v
}

function  vectorPolarDegrees(a,r)
{
    var v= new Vector()
    v.setPolarDegrees(a,r)
    return v
}

Vector.prototype = {
    get XY(){
        return this.getXY();
    },
    get Polar(){
        return this.getPolar();
    }
};







function vnegative(vector)
{
    return  vectorXY(-vector.XY.x, vector.XY.y)
}

function vaddition(vector1, vector2)
{
    return  vectorXY(vector1.XY.x + vector2.XY.x,  vector1.XY.y + vector2.XY.y)
}

function vdifference(vector1, vector2)
{
    return  vectorXY(vector1.XY.x - vector2.XY.x,  vector1.XY.y - vector2.XY.y)
}


function vscalar_product(vector1, vector2)
{
    return  Math.cos(vector2.Polar.a - vector1.Polar.a)*vector1.Polar.r*vector2.Polar.r
}
