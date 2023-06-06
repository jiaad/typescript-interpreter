import { argv } from "process"
import Lexer from "./lexer/Lexer"
import Parser from "./parser/Parser"
import { createInterface } from "readline"
import { Expr } from "./lexer/Expr"
import Interpreter from "./parser/Interpreter"
import { Stmt } from "./parser/Stmt"

const readline = createInterface({
	input: process.stdin,
	output: process.stdout
})

class Tlox {
	private hadError: boolean = false

	public main() {
		let cliArgs = argv.slice(2)
		let source = `
    var myvar = "jiad";
    var a = 458;
    10 + 45 + 45;
    print "jiad";
    // jiad
  `
		let a = "() {} + - * /"
		let comment = "() // hjfdehfuzehouf ezufeozufyeou"
		const vari: string = `var myvar = "jiad"`
		const math = "4 + 5 * 6"

		if (cliArgs.length === 0) {
			readline.setPrompt("tlox> ")
			readline.prompt()
			readline.on("line", input => {
				this.runPrompt(input)
				readline.prompt()
			})
			readline.on("close", () => {
				console.log("suck it chat")
			})
		} else if (cliArgs.length === 1) {
			this.runFile(math)
		} else {
			throw new Error("Argv [tlox filename]")
		}
	}

	run(input: string) {
		try {
			let lexer = new Lexer(input)
			let tokens = lexer.tokenizer()
			let parser = new Parser(tokens)

		  let expression: Stmt[] = parser.parse()
			if (this.hadError) return
			let interpreter = new Interpreter().interpreter(expression)
			console.log(tokens)
		} catch (error) {
			console.log(error)
		}
	}

	runPrompt(input: string): void {
		this.run(input)
	}

	runFile(input: string) {
		this.run(input)
	}
}

new Tlox().main()
