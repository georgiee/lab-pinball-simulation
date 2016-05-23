#Pinball (Phase & P2JS)

Looks weird?? Yeah sorry.🤕
This was client work from some years ago. To make it public I had to clean it up and obfuscated the involved assets.

This is a fully fledged pinball engine with state machines, entity factories, actions triggers and an expectation system (for fulfulling missions and other objectives)

+ P2JS physics engine. Today I would use Box2D as it supports CCD which was a HUGE problem, there was a lot of tunneling on weak system.
+ Created a custom state machine to manage the state of all entities
+ Created a custom action system to trigger different predefiend actions like light on, ball reset, start mission, trigger sound and so on.
+ A zone system so that only 1/4 of the involved table physics is active at one moment. only zones near the ball are activated.
+ The ramp on the right is actually an elevated area which is kind of a problem with a 2D physics engine. I placed some sensors on the entries so I can toggle between the base level and the ramp level. I use the physic bits of the engine (like in Box2D) to toggle the collisions pairs. This allows the ball to roll beneath the ramp when the ramp is not activated. Works like a charme. 
+ webgl & canvas support
+ entities, actions, missions and assets are created from json files. So you could make your own pinball with the existing code- well in theory. I wouldn't hold my breath 🙃
+ Too bad but I wrote this back then in coffee script (oh WHY???💩) and I used middleman as my building pipeline. I'm not able to get the original files to run so I spare you the time. 

The single compiled JS files are still readable.

Based on <a href='https://github.com/photonstorm/phaser'>Phaser (v2.04, pretty old now)</a><br>
and <a href='https://schteppe.github.io/p2.js/'>P2JS</a><br>

## Interesting Files

### The two most important files:

+ [Pinball.Playfield](https://github.com/georgiee/pinball-js/blob/e9936da528e11cf8636e5b1417011424bdf9e3de/pinball-build/javascripts/pinball/core/playfield.js) - builds the whole table with all entities (uses data from data/objects.js and data/actions)
+ [Pinball.Gameplay](https://github.com/georgiee/pinball-js/blob/e9936da528e11cf8636e5b1417011424bdf9e3de/pinball-build/javascripts/pinball/core/gameplay.js) - Manages the gameplay (actions, missions)

### The bread and butter

+ [data/objects.js](https://github.com/georgiee/pinball-js/blob/e9936da528e11cf8636e5b1417011424bdf9e3de/pinball-build/javascripts/pinball/data/objects.js): data to build the table. This is embedded as a JS object but could be JSON aswell.
+ [data/actions.js](https://github.com/georgiee/pinball-js/blob/e9936da528e11cf8636e5b1417011424bdf9e3de/pinball-build/javascripts/pinball/data/actions.js): This brings the game to life. For every created entity (see objects.js) you will find defined actions.

Those actions are triggered by the current state of the entity.

```An easy example: The slingshot can be powered or off. When entering the state powered we need the typical slingshot sound. Which is played by the action sound and the requried parameter soundID.```

### Other stuff

+ Scaffolding happens [here](https://github.com/georgiee/pinball-js/blob/b70fb492b91fcef2d43ef6c9562b80b1a0beda1d/pinball-build/javascripts/pinball/pinball_machine.js)
+ All available entities are [here](https://github.com/georgiee/pinball-js/tree/b70fb492b91fcef2d43ef6c9562b80b1a0beda1d/pinball-build/javascripts/pinball/core/entities)
+ There is a theme loader. This simply replaces the sprite atlas with another and keeps the physics untouched (level is therefore unchanged)
+ I use some version of the [machina fsm](http://machina-js.org/) to define my state machines.