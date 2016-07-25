"use strict";
var page = require('webpage').create();
page.viewportSize = { width: 5000, height : 1000 };
page.open('index.html', function(){
  for (var i = 0;i < 120;i++) {
    page.clipRect = {top:i*50 + 4*i, left:0, width: 5000, height:50};
    page.render('sprite' + i + '.png');
    console.log('sprite' + i + ' rendered');
  }
  phantom.exit();
});

// phantom.exit();
// page.open('index.html', function(){
//   page.render('sprite.png');
//   phantom.exit();
// })
// page.content = '<html><body><canvas id="surface"></canvas></body></html>';
// page.evaluate(function() {
//     var el = document.getElementById('surface'),
//         context = el.getContext('2d'),
//         width = window.innerWidth,
//         height = window.innerHeight,
//         cx = width / 2,
//         cy = height / 2,
//         radius = width  / 2.3,
//         imageData,
//         pixels,
//         hue, sat, value,
//         i = 0, x, y, rx, ry, d,
//         f, g, p, u, v, w, rgb;

//     el.width = width;
//     el.height = height;
//     imageData = context.createImageData(width, height);
//     pixels = imageData.data;

//     for (y = 0; y < height; y = y + 1) {
//         for (x = 0; x < width; x = x + 1, i = i + 4) {
//             rx = x - cx;
//             ry = y - cy;
//             d = rx * rx + ry * ry;
//             if (d < radius * radius) {
//                 hue = 6 * (Math.atan2(ry, rx) + Math.PI) / (2 * Math.PI);
//                 sat = Math.sqrt(d) / radius;
//                 g = Math.floor(hue);
//                 f = hue - g;
//                 u = 255 * (1 - sat);
//                 v = 255 * (1 - sat * f);
//                 w = 255 * (1 - sat * (1 - f));
//                 pixels[i] = [255, v, u, u, w, 255, 255][g];
//                 pixels[i + 1] = [w, 255, 255, v, u, u, w][g];
//                 pixels[i + 2] = [u, u, w, 255, 255, v, u][g];
//                 pixels[i + 3] = 255;
//             }
//         }
//     }

//     var img = new Image();
//     img.src = 'http://192.168.196.200:8000/cargo0_0.svg';
//     // context.putImageData(imageData, 0, 0);
//     context.drawImage(img, 0, 0);
//     document.body.style.backgroundColor = 'white';
//     document.body.style.margin = '0px';
// });

// page.render('sprite.png');

// phantom.exit();
