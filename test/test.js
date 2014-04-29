var expect = require('expect.js');
var access = require('../lib');

describe('object-deep-access', function () {
    
    var obj;
    
    beforeEach(function () {
        var data = require('./data/object');
        obj = JSON.parse(JSON.stringify(data));
    });
    
    describe('get', function () {
        it('should get key', function () {
            var result = access.get(obj, 'app');
            expect(result).to.equal('My App');
        });
        
        it('should get key path', function () {
            var result = access.get(obj, 'database.mongodb.host');
            expect(result).to.equal('localhost');
        });
        
        it('should fail to get non-existing key path', function () {
            var result = access.get(obj, 'foo.bar');
            expect(result).to.be(false);
        });
    });
    
    describe('set', function () {
        it('should set key', function () {
            access.set(obj, 'foo', 'bar');
            expect(obj.foo).to.equal('bar');
        });
        
        it('should set key path', function () {
            access.set(obj, 'foo.bar', 'baz');
            expect(obj.foo.bar).to.equal('baz');
        });
    });
    
    describe('has', function () {
        it('should return true', function () {
            var result = access.has(obj, 'app');
            expect(result).to.equal(true);
        });
        
        it('should check key path', function () {
            var result = access.has(obj, 'database.mongodb.host');
            expect(result).to.equal(true);
        });
        
        it('should fail to check for non-existing key path', function () {
            var result = access.has(obj, 'database.foo');
            expect(result).to.equal(false);
        });
    });
    
    describe('delete', function () {
        it('should delete key', function () {
            access.delete(obj, 'app');
            expect(obj.app).to.be(undefined);
        });
        
        it('should delete key path', function () {
            access.delete(obj, 'database.mongodb');
            expect(obj.database.mongodb).to.be(undefined);
        });
    });
    
    describe('assign', function () {
        describe('deepGet', function() {
            it('should get assigned', function() {
                access.assign(obj);
                var result = obj.deepGet('app');
                expect(result).to.equal('My App');
            });
        });
        
        describe('deepSet', function() {
            it('should set assigned', function() {
                access.assign(obj);
                obj.deepSet('app', 'Foo App');
                expect(obj.app).to.equal('Foo App');
            });
        });
        
        describe('deepHas', function() {
            it('should has assigned', function() {
                access.assign(obj);
                var result = obj.deepHas('app');
                expect(result).to.equal(true);
            });
            
            it('should not has assigned', function() {
                access.assign(obj);
                var result = obj.deepHas('database.foo.bar');
                expect(result).to.equal(false);
            });
        });
        
        describe('deepDelete', function() {
            it('should delete assigned', function() {
                access.assign(obj);
                obj.deepDelete('app');
                expect(obj.app).to.be(undefined);
            });
        });
        
    });
    
});