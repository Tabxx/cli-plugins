const rp = require('request-promise')
const fs = require('fs')
const urlRegx = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/gi
let urls = []
let result = []

getURLS()

/**
 * 检测http请求
 */
async function checkRequest() {
    for (let item of urls) {
        await rp({
            uri: item,
            transform: function (body, response, resolveWithFullResponse) {
                result.push({
                    url: item,
                    code: response.statusCode,
                })
            },
        }).catch((err) => {})
    }
    showResult()
}

/**
 * 获取html中的url
 */
function getURLS() {
    fs.readFile('./dist/index.html', 'utf-8', function (err, data) {
        if (err) {
            console.log('error： file not found')
            return
        }
        urls = data.match(urlRegx)
        checkRequest()
    })
}

/**
 * 检测结果
 */
function showResult() {
    if (result.filter((item) => item.code == 200).length == urls.length) {
        console.log('http check success')
        return
    }

    for (let item of result) {
        console.log(`${item.url}:${item.code}\n`)
    }
    process.exit(0)
}
