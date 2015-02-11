var test = require('tape')
var fs = require('fs')
var annotation = require('..')

function input (name) {
    return fs.readFileSync('test/fixtures/' + name + '.css', 'utf-8').trim()
}

test('test-1', function (t) {
    var actual = annotation.parse(input("test-1"))
    var expected = [
        {
            "name": "morishitter",
            "interest": "css"
        },
        {
            "foo": "foo foo foo"
        }
    ]
    t.same(actual, expected, "top level comment parser")
    t.end()
})

test('test-2', function (t) {
    var actual = annotation.parse(input("test-2"))
    var expected = [
        {
            "foo": "foo"
        },
        {
            "bar": "bar",
            "rule": ".class"
        }
    ]
    t.same(actual, expected, "comment in rules")
    t.end()
})

test('test-3', function (t) {
    var actual = annotation.parse(input("test-3"))
    var expected = [
        {
            "atrule": "media",
            "foo": "foo",
            "params": "screen and (min-width: 600px)"
        },
        {
            "bar": "bar",
            "rule": ".class"
        }
    ]
    t.same(actual, expected, "comment in rules")
    t.end()
})

test('test-4', function (t) {
    var actual = annotation.parse(input("test-4"))
    var expected = [
        {
            "foo": true,
            "rule": ".class"
        }
    ]
    t.same(actual, expected, "comment in rules")
    t.end()
})

test('test-5', function (t) {
    var actual = annotation.parse(input("test-5"))
    var expected = [
        {
            "array": ['foo', 'bar', 'baz'],
            "rule": ".class"
        }
    ]
    t.same(actual, expected, "comment in rules")
    t.end()
})

test('test-6', function (t) {
    var actual = annotation.parse(input("test-6"))
    var expected = [
        {
            "hoge": true,
            "piyo": ['piyo', 'poyo'],
            "rule": ".class"
        }
    ]
    t.same(actual, expected, "comment in rules")
    t.end()
})

test('test trailing whitespaces', function (t) {
    var actual = annotation.parse(input("test-7"))
    var expected = [
        {
            "foo" : true,
            "bar": true
        }
    ]
    t.same(actual, expected, "comment in rules")
    t.end()
})
