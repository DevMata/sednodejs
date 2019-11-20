const cmd = /^s\/(?<search>[\w| ]+)\/(?<replace>[\w| ]+)\/(?<flag>p|g)?$/

class regexval {
	static exec(string) {
		if (cmd.test(string)) {
			const grps = cmd.exec(string).groups

			return {
				search: grps.search,
				replace: grps.replace,
				flag: grps.flag
			}
		} else {
			console.log(`Invalid command ${string}`)
			process.exit()
			return {}
		}
	}
}

module.exports = regexval
