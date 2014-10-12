<!-- # slush-y [![Build Status](https://secure.travis-ci.org/joelcoxio/slush-y.png?branch=master)](https://travis-ci.org/arvindr21/slush-y) [![NPM version](https://badge-me.herokuapp.com/api/npm/slush-y.png)](http://badges.enytc.com/for/npm/slush-y) [![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/arvindr21/slush-y/trend.png)](https://bitdeli.com/free "Bitdeli Badge") -->

<!-- [![NPM](https://nodei.co/npm/slush-y.png?downloads=true&stars=true)](https://nodei.co/npm/slush-y/) -->
# slush-y
#### Why 'Y' ? Because it is easy to type!

> A slush generator to scaffold MEAN Apps

Inspired by [MEAN](http://meanjs.org/)
Inspired by [slush-meanjs](http://npmjs.org/package/slush-meanjs)
Inspired by John Papa's [angularjs-styleguide](https://github.com/johnpapa/angularjs-styleguide#factories)

## Getting Started

### Installation

Install `slush-y` globally:

```bash
$ npm install -g slush-y
```

Remember to install `gulp` and `slush` globally as well, if you haven't already:

```bash
$ npm install -g gulp slush
```

### Usage

Create a new folder for your project:

```bash
$ mkdir my-slush-y
```

Run the generator from within the new folder:

```bash
$ cd my-slush-y && slush y
```
## Run the app

To run the app , first make sure mongoDB is running (```$ mongod```) then

```bash
$ gulp
```
or
```bash
$ gulp dev
```
and navigate to ```http://localhost:9000```

To generate minified js & css files inside the `public/dist` folder, run

```bash
$ gulp build
```

To lint files

```bash
$ gulp jshint
```

To run tests

```bash
$ gulp test
```

## FEATURES
<table>
<tr>
<td>Feature</td>
<td>Command</td>
</tr>
<tr>
<td><a href="#application-generator">Application Generator</a></td>
<td>slush y</td>
</tr>
<tr>
<td><a href="#crud-module-sub-generato">CRUD Module sub-generator</a></td>
<td>slush y:crud {{module-name}}</td>
</tr>
<tr>
<td><a href="#angularjs-module-sub-generator">AngularJs Module sub-generator</a></td>
<td>slush y:module {{module-name}}</td>
</tr>
<tr>
<td><a href="#angularjs-route-sub-generator">AngularJs Route sub-generator</a></td>
<td>slush y:route {{route-name}}</td>
</tr>
<tr>
<td><a href="#angularjs-controller-sub-generator">AngularJs Controller sub-generator</a></td>
<td>slush y:controller {{controller-name}}</td>
</tr>
<tr>
<td><a href="#angularjs-view-sub-generator">AngularJs View sub-generator</a></td>
<td>slush y:view {{view-name}}</td>
</tr>
<tr>
<td><a href="#angularjs-service-sub-generator">AngularJs Service sub-generator</a></td>
<td>slush y:service {{service-name}}</td>
</tr>
<tr>
<td><a href="#angularjs-factory-sub-generator">AngularJs Factory sub-generator</a></td>
<td>slush y:factory {{service-name}}</td>
</tr>
<tr>
<td><a href="#angularjs-directive-sub-generator">AngularJs Directive sub-generator</a></td>
<td>slush y:directive {{directive-name}}</td>
</tr>
<tr>
<td><a href="#angularjs-filter-sub-generator">AngularJs Filter sub-generator</a></td>
<td>slush y:filter {{filter-name}}</td>
</tr>
<tr>
<td><a href="#angularjs-config-sub-generator">AngularJs Config sub-generator</a></td>
<td>slush y:config {{config-name}}</td>
</tr>
<tr>
<td><a href="#angularjs-test-sub-generator">AngularJs Test sub-generator</a></td>
<td>slush y:test {{controller-name}}</td>
</tr>
<tr>
<td><a href="#express-model-sub-generator">Express Model sub-generator</a></td>
<td>slush y:express-model {{model-name}}</td>
</tr>
<tr>
<td><a href="#express-controller-sub-generator">Express Controller sub-generator</a></td>
<td>slush y:express-controller {{controller-name}}</td>
</tr>
<tr>
<td><a href="#express-routes-sub-generator">Express Routes sub-generator</a></td>
<td>slush y:express-route {{route-name}}</td>
</tr>
<tr>
<td><a href="#express-test-sub-generator">Express Test sub-generator</a></td>
<td>slush y:express-test {{model-name}}</td>
</tr>
</table>

**Note: Generators are to be run from the root directory of your app.**

## Application Generator

The application generator will provide you with a rich and well structure starting template to build your next team project. The application is a Full Stack application with node & express server, and a modularly architected client.

In order To create your MEAN application, navigate to a new project folder, and then use *slush y* to generate your application:

```
$ slush y
```

The generator will ask you a few questions about your new application and will generate it for you. When the installation process is over, you will be able to use gulp to run your new MEAN application:


```
$ gulp
```

Now, the application generator does a great job scaffolding a whole application, but daily work requires us to repeat a lot of structured code. For this purpose we provided you with some sub-generators to help you speed up your development.



## CRUD Module Sub-Generator

The CRUD module sub-generator will help you create a new CRUD module (CREATE, READ, UPDATE, DELETE).

To create a new CRUD module you will need to use *slush y* again:

```
$ slush y:crud <module-name>
```

The CRUD Module will generate a whole new module in your client side modules directory.
##### Client
* config
* controllers
* directives
* services
* tests
* styles
* views

This will also generator the full api for this module. the angular-service in the services directory is directly connected to the api created on the backend.

##### Server
* model  -  (Mongoose Model & Schema)
* controller  -  (Express request and response handler)
* route  -  (Express Restful Router)
* test  -  (mocha super test)

The Module comes packed with everything you need to start developing.

**Note:** Don’t forget to use your module name as an argument when calling the CRUD module sub-generator.

## AngularJS Module Sub-Generator

Generates a new AngularJS module structure. For this purpose you can use the Angular module sub-generator. It will create the proper folder structure for you and the module initialization file. Creating a new AngularJS module is simple:

```
$ slush y:module <module-name>
```

The sub-generator will ask for more information about your folder structure, and will create the empty new AngularJS module.
Instead of manually filling out the components ti this new module, we can use the provided sub-generators
to fill in the missing gaps.


#AngularJS Sub-Generators

The Sub-Generators will read the current modules in modules directory, and ask will which which module to use.
Based upon your option, the generator will generate the proper files the proper directory within the chosen module.

## AngularJS Route Sub-Generator

To construct your module you will often need to create a new route. The AngularJS route sub-generator will help you create a view, controller and a proper route in your module **routes.js** file. If it can’t find the module routes file the sub-generator will create one for you. Creating a new AngularJS route will involve executing this command:

```
$ slush y:route <route-name>
```

The sub-generator will ask for more information about your controller, view and routing URL, and will generate the appropriate files for you.



## AngularJS Controller Sub-Generator

The AngularJS Controller sub-generator will create a new AngularJS controller in the specified module's **controllers** folder. To create a new AngularJS controller run *slush y* again by using this command:


```
$ slush y:controller <controller-name>
```

The sub-generator will ask you for the module name under which you would like to create your new controller, and will create a new AngularJS controller file in that module **controllers** folder and a test file in the **tests** folder.


**Don’t forget!** This time you pass the controller name as an argument.



## AngularJS View Sub-Generator

Once you have your controller file ready, you may want to add a view that makes use of this controller. The AngularJS view sub-generator will create a new AngularJS view in the specified module's **views** folder, and will allow you to add a route definition for it. To create a new AngularJS view you will need to execute this command:


```
$ slush y:view <view-name>
```

The sub-generator will ask you for the module name under which you would like to create your new view, and some additional routing information. It will then create a new view file in that module's **views** folder and add a routing state to the module **routes.js** file. If it can’t find the module routes file it will create one for you.



## AngularJS Service Sub-Generator

The AngularJS service sub-generator will create a new AngularJS service in the specified module's **services** folder. To create a new AngularJS service you will need to execute this command:


```
$ slush y:service <service-name>
```

The sub-generator will ask you for the module name under which you would like to create your new service, and will create a new AngularJS service file in that module's **services** folder.



## AngularJS Directive Sub-Generator

The AngularJS directive sub-generator will create a new AngularJS directive in the specified module's **directives** folder. Creating a new AngularJS directive should already look familiar:


```
$ slush y:directive <directive-name>
```

The sub-generator will ask you for the module name under which you would like to create your new directive, and will create a new AngularJS directive file in that module's **directives** folder.



## AngularJS Filter Sub-Generator

The AngularJS filter sub-generator will create a new AngularJS filter in a specified module's **filters** folder. To create a new AngularJS filter you need to call *slush y* again:


```
$ slush y:filter <filter-name>
```

The sub-generator will ask you for the module name under which you would like to create your new filter, and will create a new AngularJS filter file in that module **filters** folder.



## AngularJS Config Sub-Generator

The AngularJS config sub-generator will create a new AngularJS config section in a specified module's **config** folder. To create a new AngularJS config file just call *slush y*:


```
$ slush y:config <config-name>
```

The sub-generator will ask you for the module name under which you would like to create your new config, and will create a new AngularJS config file in that module's **config** folder.



## AngularJS Test Sub-Generator

Your MEAN application comes pre-bundled with the Karma test runner and Jasmine testing framework. To test your AngularJS controllers you’ll need to create a test file, which Karma will later use to run the tests. For this purpose we provided you with the AngularJS test sub-generator. Creating a new AngularJS test is effortless, just execute this command:


```
$ slush y:test <controller-name>
```

This will create a test file for your controller, and if the sub-generator doesn’t find the specified controller file, it will create one for you.


**Don’t forget!** You're suppose to pass the controller name as an argument.



## Express Model Sub-Generator

Often you will find the need to just create a single Express model. The Express model sub-generator will help you with creating an Express model in the **app/models** folder. To create a new model just use *slush y*:


```
$ slush y:express-model <model-name>
```

This will create a new empty model in the **app/models** folder and a test file in the **app/tests** folder.


**Note:** It is recommended you avoid naming your model in plural form and use a singular form instead. i.e article and not articles



## Express Controller Sub-Generator

Another recurring task is creating an empty Express controller. The Express controller sub-generator will help you with creating an Express controller in the **app/controllers** folder. To create a new controller just use *slush y*:


```
$ slush y:express-controller <controller-name>
```

This will create a new empty controller in the **app/controllers** folder.



## Express Routes Sub-Generator

To make HTTP requests to your controller methods you will need to use a routing file in the **app/routes** folder. The Express routes sub-generator will help you to add a new empty routes file. To create a new routes file execute this *slush y* command:


```
$ slush y:express-route <route-name>
```

This will create a new empty route file in the **app/routes** folder.


## Express Test Sub-Generator

Your MEAN application comes pre-bundled with the Mocha testing framework. To test your Express models you’ll need to create a new test file, which Mocha will use while running tests. For this purpose we provided you with the Express test sub-generator. Creating a new Express test is easy, just execute this command:


```
$ slush y:express-test <model-name>
```

This will create a test file for your Express model, and if the sub-generator doesn’t find the specified model, it will create one for you.


**Don’t forget!** You're suppose to pass the model name as an argument.


## Getting To Know Slush

Slush is a tool that uses Gulp for project scaffolding.

Slush does not contain anything "out of the box", except the ability to locate installed slush generators and to run them with liftoff.

To find out more about Slush, check out the [documentation](https://github.com/klei/slush).

## Contributing

See the [CONTRIBUTING Guidelines](https://github.com/joelcoxokc/slush-y/blob/master/CONTRIBUTING.md)

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/joelcoxokc/slush-y/issues).

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