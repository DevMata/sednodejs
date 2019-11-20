const yargs = require('yargs')
const regexval = require('./regexval')
const filehandler = require('./filehandler')
const formater = require('./formater')

yargs.boolean('n')
yargs.boolean('i')

const _ = yargs.argv._
const e = yargs.argv.e
const f = yargs.argv.f
const n = yargs.argv.n
const i = yargs.argv.i

let j = 0
let cmd = []
let file = []

if (e) {
	if (typeof e == 'string') {
		cmd.push(regexval.exec(e))
	} else {
		for (let c of e) {
			cmd.push(regexval.exec(c))
		}
	}
} else {
	cmd.push(regexval.exec(_[j]))
	j += 1
}

if (f) {
	if (typeof f == 'string') {
		for (let c of filehandler.read(f)) {
			cmd.push(regexval.exec(c))
		}
	} else {
		for (let file of f) {
			for (let c of filehandler.read(file)) {
				cmd.push(regexval.exec(c))
			}
		}
	}
}

for (let line of filehandler.read(_[j])) {
	file.push(line)
}

console.log(cmd)

for (let line of file) {
	let l = line
	for (let c of cmd) {
		l = formater.processln(l, c, n)
	}
	console.log(l)
}

// let stream = ''
// let res = []
// let resStream = ''
