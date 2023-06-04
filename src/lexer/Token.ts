import { TokenItem, TokenType } from "./TokenType"

export default class Token {
	readonly type: TokenItem
	readonly literal: string | null
	readonly lexeme: string
	readonly line: number

	constructor(
		type: TokenItem,
		lexeme: string,
		literal: string | null, // number and string after deleting quots
		line: number
	) {
		this.type = type
		this.lexeme = lexeme
		this.literal = literal
		this.line = line
	}
}
