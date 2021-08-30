# Puzzle To Play

Generate and play puzzle in simulation of real puzzle game! You can move, rotate puzzles and zoom to certain point of puzzle board.
We provides responsiveness which enables using several types of devices during play.
In addition you can use hints to build puzzle faster. Application provides basic puzzle algorithm, but another puzzle generation strategies can be also implemented and tested using this environment.
Angular puzzle game which provides environment for playing puzzles, testing and improving puzzle generator algorithms.


## Environment provide:

### Puzzle management: 
- basic algorithm for puzzle generation
- creation of puzzle / puzzles
- rotation of puzzle / puzzles - user can rotate puzzles
- shuffle of puzzles
- initial rotation of puzzles - user will get rotated puzzles and rotation to previous state is neccessary
- ngrx reactive manipulation - not used puzzles are in separated drawer
- puzzles can be returned to drawer
- hint for position of given puzzle can be provided
- puzzles can be send to back or bring to front


### Puzzle board management:
- responsiveness during playing
- possibility of zooming in and out from given area
- highlighted area fits to given image - which we are building from puzzles
- enough space to put puzzles on board - zoom can help, but canvas is as large as possible


### Puzzle game management:
- prepared gallery for playing
- preview of image is included
- advanced zooming settings are prepared
- responsiveness - suitability for smaller devices


### Other features
- special puzzle design
- clean code compatible with ng lint - using ng lint as often as possible
- configurable styles because of using scss
- code separated in services, divided into directories for components and pages
- loading of pictures - tested picture size were up to 3MB (maybe larger are possible too) - depends on used technology


## Improvements
- better puzzle generator algorithms
- UI for each puzzle generator algorithm with configurable parameters
- saving of puzzle / game state
- posibility to download all puzzles as images


## Development server

Use npm start in root directory and navigate to http://localhost:4200/ or http://localhost:4200/puzzle/

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Keywords

puzzle, puzzles, puzzle generator, algorithm, game, responsive game, interactive game, fabric, canvas game
