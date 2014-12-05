var fs = require('fs')
var postcss = require('postcss')
var inspect = require('obj-inspector')

module.exports.parse = function (css) {
    var root = postcss.parse(css)
    var res = []

    root.eachComment(function (node, i) {
        if (node.type === 'comment') {
            var text = node.text
            var tmp = {}

            var names = text.match(/\@.+?\s(.+?)(\n|$)/g)
            names.forEach(function (name, i) {
                name.match(/\@(.+?)\s(.+?)(\n|$)/g)
                var key = RegExp.$1
                var val = RegExp.$2
                tmp[key] = val
            })

            if (node.parent.type === 'rule') {
                tmp.rule = node.parent.selector
            }

            res.push(tmp)
        }
    })

    return res
}
