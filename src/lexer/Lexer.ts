import Token from "./Token"
import { TokenItem, TokenType, keywords } from "./TokenType"
const getAscii = (c: string | number) => String(c).charCodeAt(0)
const _a = getAscii("a")
const _z = getAscii("z")
const _A = getAscii("A")
const _Z = getAscii("Z")
const _0 = getAscii("0")
const _9 = getAscii("9")
const _dash = getAscii("_")

export default class Lexer {
	readonly source: string
	public line: number
	public tokens: Token[]
	private current: number
	private start: number
	// readonly
	constructor(source: string) {
		this.source = source
		this.tokens = []
		this.line = 1
		this.start = 0
		this.current = 0
	}

	private tokenize(): void {
		let char = this.advance()
		switch (char) {
			case "\n":
				this.line++
				break
			case " ":
			case "\r":
			case "\t":
				break
			//
			case "(":
				this.addToken({ type: TokenType.LeftParen })
				break
			case ")":
				this.addToken({ type: TokenType.RightParen })
				break
			case "{":
				this.addToken({ type: TokenType.LeftBrace })
				break
			case "}":
				this.addToken({ type: TokenType.RightBrace })
				break
			case ",":
				this.addToken({ type: TokenType.Comma })
				break
			case ".":
				this.addToken({ type: TokenType.Dot })
				break
			case ";":
				this.addToken({ type: TokenType.Semicolon })
				break
			// opàerator
			case "=":
				// ==
				this.addToken({
					type: this.match("=") ? TokenType.EqualEqual : TokenType.Equal
				})
				break
			case "+":
				this.addToken({ type: TokenType.Plus })
				break
			case "-":
				this.addToken({ type: TokenType.Minus })
				break
			case "/":
				// //
				if (this.match("/")) {
					this.skipComment()
					break
				}
				this.addToken({ type: TokenType.Slash })
				break
			case "*":
				this.addToken({ type: TokenType.Star })
				break
			case "<":
				this.addToken({ type: TokenType.Less })
				break
			case ">":
				this.addToken({ type: TokenType.Greater })
				break
			case "<=":
				this.addToken({ type: TokenType.LessEqual })
				break
			case ">=":
				this.addToken({ type: TokenType.GreaterEqual })
				break
			case "!":
				// !=
				this.addToken({
					type: this.match("=") ? TokenType.BangEqual : TokenType.Bang
				})
				break
			case '"':
				this.readString()
				break
			default:
				if (this.isAlpha(char)) {
					this.readIdentifier()
					break
				}
				if (this.isDigit(char)) {
					this.readNumber()
					break
				}
		}
	}
	tokenizer(): Token[] {
		while (!this.isAtEnd()) {
			this.start = this.current
			this.tokenize()
		}
		this.tokens.push(new Token(TokenType.Eof, "", null, this.line))
		return this.tokens
	}
	private addToken({
		type,
		literal = null
	}: {
		type: TokenItem
		literal?: string | null
	}): void {
		const textLexeme: string = this.source.substring(this.start, this.current)
		this.tokens.push(new Token(type, textLexeme, literal, this.line))
	}
	private advance(): string {
		return this.source[this.current++]
	}

	private isAtEnd() {
		return this.current >= this.source.length
	}

	private between(num: number, start: number, end: number): boolean {
		return num >= start && num <= end
	}

	private isAlpha(c: string): boolean {
		const cAscii = getAscii(c)
		return (
			this.between(cAscii, _a, _z) ||
			this.between(cAscii, _A, _Z) ||
			cAscii === _dash
		)
	}
	private isDigit(c: string): boolean {
		const cAscii = getAscii(c)
		return this.between(cAscii, _0, _9)
	}

	private readIdentifier() {
		while (this.isAlpha(this.source[this.current]) && !this.isAtEnd()) {
			this.advance()
		}
		const identifier = this.source.substring(this.start, this.current)
		let type: TokenItem = keywords.get(identifier)
		if (type === undefined) type = TokenType.Identifier
		this.addToken({ type })
	}

	private readString() {
		while (this.peek() !== '"' && !this.isAtEnd()) {
			if (this.peek() == "\n") this.line++
			this.advance()
		}
		this.advance()
		const str: string = this.source.substring(this.start + 1, this.current - 1)
		this.addToken({ type: TokenType.String, literal: str })
	}

	private readNumber() {
		while (this.isDigit(this.source[this.current]) && !this.isAtEnd()) {
			this.advance()
		}
		const num = this.source.substring(this.start, this.current)
		this.addToken({ type: TokenType.Number, literal: num })
	}

	private peek(): string {
		return this.source.charAt(this.current)
	}

	private nextPeek(): string {
		if (this.isAtEnd()) return "\0"
		return this.source.charAt(this.current + 1)
	}

	private match(char: string): boolean {
		if (this.isAtEnd()) return false
		if (this.peek() === char) {
			this.advance()
			return true
		}
		return false
	}

	private skipComment() {
		while (this.peek() !== "\n" && !this.isAtEnd()) {
			this.advance()
		}
	}
}
