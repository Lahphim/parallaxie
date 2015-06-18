parallaxie
=========

Parallaxie is library to build simple parallax background with multi-depth layer while scrolling. 

Freaking easy !!! just 3 steps. 

![1]

Usage
-----

1) Include library.
```html
    ...
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    <script type="text/javascript" src="js/parallaxie.js"></script>
    ...
```

2) Create container DOM, preparing for append parallax background.
```html
    ...
    <div id="prx-container"></div>
    ...
```

3) Call library with options like this.
```javascript
    ...
    $("#prx-container").parallaxie({
		backgrounds: [
			{
				path: "./images/prx-bg.png"
			},
			{
				path: "./images/prx-bg-2.png"
			},
			{
				path: "./images/prx-bg-3.png"
			}
		]
	});
    ...
```

Hope You Enjoy :) !!!


Author
-----

[Lahphim S. Arnon][linkedin]


License
-----

Licensed under MIT.

[1]: http://share.gifyoutube.com/vW2X9b.gif
[linkedin]: https://th.linkedin.com/in/lahphim
