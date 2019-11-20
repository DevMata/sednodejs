const yargs = require('yargs')
const regexval = require('./regexval')
const filehandler = require('./filehandler')
const formater = require('./formater')

yargs.boolean('n')

const _ = yargs.argv._
const e = yargs.argv.e
const f = yargs.argv.f
const n = yargs.argv.n
const i = yargs.argv.i

let cmd = []
let F = []

for (let obj of _) {
	if (regexval.checkcmd(obj)) {
		if (_.indexOf(obj) == 0) {
			cmd.push(regexval.processcmd(obj))
		} else {
			console.log('Error. Use -e for more than one cmd')
			process.exit()
		}
	} else if (regexval.checkfile(obj)) {
		// for (let line of filehandler.read(obj)) {
		// 	file.push(line)
		// }
		F.push(obj)
	}
}

if (e) {
	if (typeof e == 'string') {
		cmd.push(regexval.processcmd(e))
	} else {
		for (let c of e) {
			cmd.push(regexval.processcmd(c))
		}
	}
}

if (f) {
	if (typeof f == 'string') {
		for (let c of filehandler.arrayify(filehandler.read(f))) {
			cmd.push(regexval.processcmd(c))
		}
	} else {
		for (let file of f) {
			for (let c of filehandler.arrayify(filehandler.read(file))) {
				cmd.push(regexval.processcmd(c))
			}
		}
	}
}

for (let file of F) {
	let stream = ''
	let content = filehandler.read(file)
	let arrayContent = filehandler.arrayify(content)

	for (let line of arrayContent) {
		let l = line
		for (let c of cmd) {
			l = formater.processln(l, c, n)
		}
		stream += l + '\n'
	}

	if (i) {
		if (typeof i === 'boolean') {
			filehandler.write(file, stream)
		} else {
			filehandler.write(regexval.getFileName(file) + i, content)
			filehandler.write(file, stream)
		}
	} else {
		console.log(stream)
	}
}
