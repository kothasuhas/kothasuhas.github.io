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

var setColors = function(a, link_color) {
    b = a;
    var rgb = h2rgb(a);
    var rgb_link = h2rgb(link_color);
    document.getElementById("autogen").innerHTML = "a { color: "+link_color+"; }\nhtml { background-image: linear-gradient(135deg, "+a+", "+b+"); }\n";
    // document.getElementById("autogen").innerHTML += "::selection { background-color: rgba("+link_color.r+", "+link_color.g+", "+link_color.b+", 1.0); }";
    // document.getElementById("autogen").innerHTML += "::-moz-selection { background-color: rgba("+link_color.r+", "+link_color.g+", "+link_color.b+", 1.0); }";
    
    if (brightness(b) > 200) {
        document.body.classList.add("inverted");
    } else {
        document.body.classList.remove("inverted");
    }
};

(function() {
    setColors("#451e96", "#03B1F1");
})();

// old purple link color: 9b3afc
// blue color: 03B1F1
