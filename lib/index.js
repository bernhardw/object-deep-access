/**
 * Get path as array.
 * 
 * @param {String|Array} path - Path as string or array.
 * @returns {Array} - Path as array.
 */
function getPath(path) {
    if (Array.isArray(path)) {
        return path;
    }
    return path.split('.');
};

/**
 * Create argument from obj and other arguments.
 * 
 * @param {Object} obj - The subject object.
 * @param {Arguments} args - Array-like arguments.
 * @returns {Array} - Array of arguments minus first.
 */
function createArguments(obj, args) {
    var args = Array.prototype.slice.call(args);
    args.unshift(obj);
    return args;
};

/**
 * Deep access object.
 * 
 * @param {Object} obj - Subject object. 
 * @param {String|Array} path - Path as string or array.
 * @param {Boolean} create - Whether to create (missing) properties or not.
 * @param {accessCallback} cb - The callback that handles the response.
 * 
 * @callback accessCallback
 * @param {Object} obj - Accessed object.
 * @param {Number} i - Loop index.
 * @param {Array} parts - Path parts.
 */
function access(obj, path, create, cb) {
    var parts = getPath(path);
    for (var i = 0, length = parts.length; i < length; i++) {
        var part = parts[i];
        // Create property if it doesn't exist yet.
        if (create && !hasOwnProperty.call(obj, part)) {
            obj[part] = {};
        }
        // Part not found in subject object.
        if (!(part in obj)) {
            return false;
        }
        obj = obj[part];
    }
    return cb(obj, i, parts);
}

module.exports = {
    /**
     * Get value under path.
     * 
     * @param {Object} obj - Object to get from.
     * @param {String|Array} path - Path to look under.
     * @returns {*|false} - Found value or false when path does not exist.
     */
    get: function(obj, path) {
        return access(obj, path, false, function (obj) {
            return obj;
        });
    },
    
    /**
     * Set value under path.
     * 
     * @param {Object} obj - Object to set to.
     * @param {String|Array} path - Path to look under.
     */
    set: function (obj, path, value) {
        var parts = getPath(path);
        var partsToLoop = parts.slice(0, parts.length - 1);

        return access(obj, partsToLoop, true, function (obj, index) {
            return obj[parts[index]] = value;
        });
    },
    
    /**
     * Has a value under path?
     * 
     * TODO: Handle truthy and falsy values.
     * 
     * @param {Object} obj - Object to check in.
     * @param {String|Array} path - Path to look under.
     * @returns {Boolean} - Whether the path has a value or not.
     */
    has: function (obj, path) {
        return this.get(obj, path) ? true : false;
    },
    
    /**
     * Delete value under `path`.
     * 
     * @param {Object} obj - Object to delete in.
     * @param {String|Array} path - Path to look under.
     */
    delete: function (obj, path) {
        var parts = getPath(path);
        var partsToLoop = parts.slice(0, parts.length - 1);
    
        access(obj, partsToLoop, false, function (obj, index) {
            delete obj[parts[partsToLoop.length]];
        });
    },
    
    /**
     * Assign methods to subject object.
     * 
     * @param {Object} obj - The object to assign to.
     * @param {Object} names - Custom method names.
     * @returns {Object} - The assigned object.
     */
    assign: function (obj, names) {
        names = names || {};
        var that = this;
        
        var defaults = {
            get: names.get || 'deepGet',
            set: names.set || 'deepSet',
            has: names.has || 'deepHas',
            delete: names.delete || 'deepDelete'
        };
        
        Object.keys(defaults).forEach(function(key, value) {
            Object.defineProperty(obj, defaults[key], {
                configurable: true,
                value: function(path) {
                    var args = createArguments(this, arguments);
                    return that[key].apply(that, args);
                }
            });
        });
        
        return obj;
    }
};