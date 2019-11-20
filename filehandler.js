const fs = require('fs')

class filehandler {
	static read(file) {
		try {
			return fs
				.readFileSync(file, 'utf-8')
				.replace('\r', '')
				.split('\n')
		} catch {
			console.log(`Error at open ${file}`)
			process.exit()
			return ''
		}
	}
}

module.exports = filehandler
