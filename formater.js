class formater {
	static process(line, args, n) {
		if (args.flag) {
			if (args.flag === 'g') {
				return this.processlng(line, args, n)
			}

			if (args.flag === 'p') {
				return this.processlnp(line, args) + this.processln(line, args, n)
			}
		} else {
			return this.processln(line, args, n)
		}
	}

	static processln(line, args, n) {
		if (n) return ''

		return line.replace(args.search, args.replace) + '\n'
	}

	static processlnp(line, args) {
		if (line.includes(args.search)) {
			return line.replace(args.search, args.replace) + '\n'
		}

		return ''
	}

	static processlng(line, args, n) {
		if (n) return ''

		return line.replace(new RegExp(args.search, 'g'), args.replace) + '\n'
	}
}

module.exports = formater
