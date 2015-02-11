var fs = require('fs')
var postcss = require('postcss')

module.exports.parse = function (css) {
    var root = postcss.parse(css)
    var res = []

    root.eachComment(function (node, i) {
        if (node.type === 'comment') {
            var text = node.text
            var tmp = {}


            var names = text.match(/\@.+?(\n|$|\s.+?(\n|$))/g)
            if (names) {
                names.forEach(function (name, i) {
                    if (name.match(/\@(.+?)\s(.+?)(\n|$)/g)) {
                        var key = RegExp.$1
                        var val = RegExp.$2

                        if (val.match(/\,/)) {
                            val = val.split(',')
                            val.forEach(function (v, i) {
                                val[i] = v.trim()
                            })
                        }

                        tmp[key] = val
                    }
                    if (name.match(/\@(\w+)\s*(\n|$)/g)) {
                        var key = RegExp.$1
                        tmp[key] = true
                    }
                })
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
