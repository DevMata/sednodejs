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

console.log(_, e, f, n, i)

let stream = ''
let res = []
let resStream = ''

fs.access(_[1], (err, data) => {
	if (err) {
		console.log("FILE DOESN'T EXISTS")
		process.exit()
	}

	fs.readFile(_[1], 'utf-8', (err, data) => {
		if (err) {
			console.log('Error at open file')
			process.exit()
		}

		stream += data
		res = stream.split('\r')
	})
})

console.log(regexval.check(_[0]))
