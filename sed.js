const fs = require('fs')
const yargs = require('yargs')
const regexval = require('./regexval')

yargs.boolean('n')
yargs.boolean('i')

const _ = yargs.argv._
const e = yargs.argv.e
const f = yargs.argv.f
const n = yargs.argv.n
const i = yargs.argv.i

// console.log(_, e, f, n, i)

let cmd = ''
let file = ''

if (!e) {
	cmd = _[0]
	file = _[1]
} else {
	for (let cmd of e) {
		console.log(regexval.check(cmd))
	}
}

let stream = ''
let res = []
let resStream = ''

fs.access(file, (err, data) => {
	if (err) {
		console.log("File doesn't exists")
		process.exit()
	}

	fs.readFile(file, 'utf-8', (err, data) => {
		if (err) {
			console.log('Error at open file')
			process.exit()
		}

		stream += data
		res = stream.split('\r')

		console.log(res)
	})
})
