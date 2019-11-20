class formater {
	static process(line, args, n) {}

	static processln(line, args, n) {
		if (n) return ''

		return line.replace(args.search, args.replace)
	}
}

module.exports = formater
