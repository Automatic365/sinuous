# Sinuous - An attempt to recreate Sinuous


This project was done by [Jason Hanna](https://github.com/Automatic365) and [Lane Winham](https://github.com/Laner12) as our final paired project at Turing School. When the project was assigned, we had a few months of Ruby, Ruby on Rails, and one week of JavaScript experience. The goal of the project was to either create an original or recreate a 2d style game in HTML5 canvas.

![](http://i.imgur.com/sFpGkyx.gif)

## Time to play:

- [Original Sinuous](http://www.sinuousgame.com/)

- [Our Sinuous](https://automatic365.github.io/sinuous/)

## Directions:

* Avoid red enemy dots and the grey boarder
* Collide with green dots for +1 life
* Place your cursor so that it is hidden inside the boarder
* Use your trackpad or mouse to move the blue player ball
* Click within the browser window so that it is your active page
* Slap the SPACEBAR to begin.

## Technical Challenges:

* Drawing and updating the player and enemies at the same time
* Creating a function to create a given number of enemies with different attributes
* Collision detection of the enemy, powerup, and canvas boarder
* Start and end screens
* replay functionality

##### To run this game locally, follow these steps:
<br>
To clone the repo:

```
git clone git@github.com:Automatic365/gametime.git
cd gametime
```

To install the dependencies:

```
npm install
```

To fire up a development server:

```
npm start
```

Once the server is running, you can visit:

* `http://localhost:8080/webpack-dev-server/` to run your version of the game.
* `http://localhost:8080/webpack-dev-server/test.html` to run the test suite in the browser.

To build the static files:

```js
npm run build
```


To run tests in Node:

```js
npm test
```
