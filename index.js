var fs = require('fs')
var postcss = require('postcss')

module.exports.parse = function (css) {
    var root = postcss.parse(css)
    var res = []

    root.eachComment(function (node, i) {
        if (node.type === 'comment') {
            var text = node.text
            var tmp = {}

            var names = text.match(/\@.+?\s.+?(\n|$)/g)
            if (names) {
                names.forEach(function (name, i) {
                    name.match(/\@(.+?)\s(.+?)(\n|$)/g)
                    var key = RegExp.$1
                    var val = RegExp.$2
                    tmp[key] = val
                })
            }

            var only = text.match(/\@(\w+)(\n|$)/g)
            if (only) {
                var key = RegExp.$1
                tmp[key] = true
            }

            var parent = node.parent

            if (parent.type ==='atrule') {
                tmp.atrule = parent.name
                tmp.params = parent.params
            }

            if (parent.type === 'rule') {
                tmp.rule = parent.selector
            }

            res.push(tmp)
        }
    })

    return res
}
