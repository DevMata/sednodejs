const cmd = /^s\/(?<search>\w+)\/(?<replace>\w+)\/(?<flag>p|g)?$/

class regexval {
	static check(string) {
		return cmd.test(string)
	}

	static validate(string) {
		if (this.check(string)) {
			const grps = cmd.exec(string).groups

			return {
				search: grps.search,
				replace: grps.replace,
				flag: grps.flag
			}
		} else {
			return {}
		}
	}
}

module.exports = regexval
