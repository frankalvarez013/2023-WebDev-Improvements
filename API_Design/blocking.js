const { isUtf8 } = require('buffer');
const fs = require('fs')
const path = require('path')
const result1 = async ()=> {
    const result = fs.readFileSync(path.join(__dirname, 'package.json'),'utf-8');
    return result
}
result1().then(f => console.log(f))
console.log('hi')