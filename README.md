# slush-meanjs [![Build Status](https://secure.travis-ci.org/arvindr21/slush-meanjs.png?branch=master)](https://travis-ci.org/arvindr21/slush-meanjs) [![NPM version](https://badge-me.herokuapp.com/api/npm/slush-meanjs.png)](http://badges.enytc.com/for/npm/slush-meanjs) [![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/arvindr21/slush-meanjs/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

[![NPM](https://nodei.co/npm/slush-meanjs.png?downloads=true&stars=true)](https://nodei.co/npm/slush-meanjs/)

> A slush generator to scaffold MEAN Apps

### Developement in progress

Inspired by [MEAN](http://meanjs.org/)

## TODOS
- [x] add MEAN Application generator
- [x] add CRUD Module sub-generator
- [x] add Module sub-generator
- [x] add Route sub-generator
- [x] add Controller sub-generator
- [x] add View sub-generator
- [x] add Service sub-generator
- [x] add Directive sub-generator
- [x] add Filter sub-generator
- [ ] add Config sub-generator
- [ ] add Test sub-generator
- [ ] add Express Model sub-generator
- [ ] add Express Controller sub-generator
- [ ] add Express Routes sub-generator
- [ ] add Express Test sub-generator

## Getting Started

### Installation

Install `slush-meanjs` globally:

```bash
$ npm install -g slush-meanjs
```

Remember to install `slush` globally as well, if you haven't already:

```bash
$ npm install -g slush
```

### Usage

Create a new folder for your project:

```bash
$ mkdir my-slush-meanjs
```

Run the generator from within the new folder:

```bash
$ cd my-slush-meanjs && slush meanjs
```
## Run the app 

To run the app , first make sure mongoDB is running (```$ mongod```) then

```bash
$ gulp 
```
and navigate to ```http://localhost:3000```

To build & generate minified js & css files inside the public/dist folder, run

```bash
$ gulp build
```

To lint files

```bash
$ gulp lint
```

To run tests

```bash
$ gulp test
```

## Getting To Know Slush

Slush is a tool that uses Gulp for project scaffolding.

Slush does not contain anything "out of the box", except the ability to locate installed slush generators and to run them with liftoff.

To find out more about Slush, check out the [documentation](https://github.com/klei/slush).

## Contributing

See the [CONTRIBUTING Guidelines](https://github.com/arvindr21/slush-meanjs/blob/master/CONTRIBUTING.md)

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/arvindr21/slush-meanjs/issues).

## License 

The MIT License

Copyright (c) 2014, Arvind Ravulavaru

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

