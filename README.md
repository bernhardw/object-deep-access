> **Info:** This module is still under active development.

# object-deep-access

Deep-access objects by path to get, set, check and delete values.

## Quick Start

    var access = require('object-deep-access');
    
    var myObject = {
        database: {
            host: 'localhost',
            user: 'root',
            pass: 'root'
        }
    };
    
    access.set(myObject, 'database.pass', 'secret');
    access.has(myObject, 'database.pass'); // Returns: true
    access.get(myObject, 'database.pass'); // Returns: 'secret'
    access.delete(myObject, 'database.pass'); 

## Ideas

* Extend prototype with deepGet, deepSet and deepHas methods like [should](https://github.com/visionmedia/should.js/) does (non-enumerable). So the subject object needs not to be a param. Or maybe as an option.
    
    myObject.deepSet('foo.bar', 'baz');
    
    // vs.
    
    deep(myObject, 'foo.bar', 'baz')
        
http://lostechies.com/derickbailey/2012/10/07/javascript-mixins-beyond-simple-object-extension/
http://lostechies.com/chrismissal/2012/09/27/extending-objects-with-javascript/

## API

### get(object, path)

Get value under `path`.

    var access = require('object-deep-access');
    access.get(myObject, 'database.mongodb.host'); // 'localhost'

### set(object, path, value)

Set `value` under `path`.

    var access = require('object-deep-access');
    access.set(myObject, 'database.mongodb.host', 'localhost');

You can set any allowed property values, including objects and functions.

### has(object, path)

Check if a property exists under `path`.

### delete(object, path)

Delete value under `path`.

    var access = require('object-deep-access');
    access.delete(myObject, 'database.mongodb.host');

### assign(object, [names])

Assign methods as non-enumerable properties to object. To prevent naming collisions, the methods are assigned as `deepGet`, `deepSet`, `deepHas` and `deepDelete`.

**Warning:** You still have have to be careful with overriding already exiting properties with the same name, or be overwritten for that matter. But you can specify your own method names of choice:

    extend(myObject, {
        get: 'myDeepGet',
        set: 'myDeepSet',
        has: 'myDeepHas',
        delete: 'myDeepDelete'
    });

## Others

* `deep-access`, juliangruber. [npm](https://www.npmjs.org/package/deep-access) | [Github](https://github.com/juliangruber/deep-access); *get only*
* `dobj`, sel. [npm](https://www.npmjs.org/package/dobj) | [Github](https://github.com/finalclass/dobj)
* `dot-access`, ntran013. [npm](https://www.npmjs.org/package/dot-access) | [Github](https://github.com/Ntran013/dot-access); *nice idea with new Function(); slower;*
* `dotaccess`, daaku. [npm](https://www.npmjs.org/package/dotaccess) | [Github](https://github.com/daaku/nodejs-dotaccess)
* `deep`, jeffomatic. [npm](https://www.npmjs.org/package/deep) | [Github](https://github.com/jeffomatic/deep)
* `deep-get-set`, acstll. [npm](https://www.npmjs.org/package/deep-get-set) | [Github](https://github.com/acstll/deep-get-set)
* `dget`, shockwork. [npm](https://www.npmjs.org/package/dget) | [Github](https://github.com/shockwork/dget); *get only*
* `peek`, adamdicarlo. [npm](https://www.npmjs.org/package/peek) | [Github](https://github.com/adamdicarlo/peek)
* `pathway`, substack. [npm](https://www.npmjs.org/package/pathway) | [Github](https://github.com/substack/node-pathway)

## Benchmarks

[TODO]

## Roadmap

* Configurable path separators.
* Step up tests (for edge cases).
* Allow to only assign some methods.

## Test

    mocha
    
## License

MIT.