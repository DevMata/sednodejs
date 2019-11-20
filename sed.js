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

let j = false
let cmd = []
let file = []

for (let obj of _) {
	if (regexval.checkcmd(obj)) {
		if (_.indexOf(obj) == 0) {
			cmd.push(regexval.exec(obj))
		} else {
			console.log('Error. Use -e for more than one cmd')
			process.exit()
		}
	} else {
		for (let line of filehandler.read(obj)) {
			file.push(line)
		}
	}
}

if (e) {
	if (typeof e == 'string') {
		cmd.push(regexval.exec(e))
	} else {
		for (let c of e) {
			cmd.push(regexval.exec(c))
		}
	}
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

for (let line of file) {
	let l = line
	for (let c of cmd) {
		l = formater.processln(l, c, n)
	}
	console.log(l)
}
