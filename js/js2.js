var h2rgb = function(h) {
    var result = null;
    h = h.replace('#', '');

    if (h.length == 6) {
        result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
        result = {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        };
    } else if (h.length == 3) {
        result = /^([a-f\d])([a-f\d])([a-f\d])$/i.exec(h);
        result = {
            r: parseInt(result[1]+result[1], 16),
            g: parseInt(result[2]+result[2], 16),
            b: parseInt(result[3]+result[3], 16)
        };
    }

    return result;
};

var brightness = function(hex) {
    var c = h2rgb(hex);
    return 0.2126*c.r + 0.7152*c.g + 0.0722*c.b;
};

var setColors = function(a, b, c) {
    var rgb = h2rgb(a);
    document.getElementById("autogen").innerHTML = "a { color: "+c+"; }\nhtml { background-image: linear-gradient(135deg, "+a+", "+b+"); }\n";
    document.getElementById("autogen").innerHTML += "::selection { background-color: rgba("+rgb.r+", "+rgb.g+", "+rgb.b+", 0.2); }";
    document.getElementById("autogen").innerHTML += "::-moz-selection { background-color: rgba("+rgb.r+", "+rgb.g+", "+rgb.b+", 0.2); }";
    
    if (brightness(b) > 200) {
        document.body.classList.add("inverted");
    } else {
        document.body.classList.remove("inverted");
    }
};

(function() {
    setColors("#5f1ef7", "#9b3afc", "#9b3afc");
})();
