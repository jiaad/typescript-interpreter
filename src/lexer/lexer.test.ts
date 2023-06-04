import Token from "./Token"
import { TokenType } from "./TokenType"
import Lexer from "./Lexer"
import { expect, it } from "vitest"

it("should scan the operator", () => {
	const operators: string = "= () {} + - * /"
	const result = [
		{ type: "=", literal: null, lexeme: "=", line: 1 },
		{ type: "(", literal: null, lexeme: "(", line: 1 },
		{ type: ")", literal: null, lexeme: ")", line: 1 },
		{ type: "{", literal: null, lexeme: "{", line: 1 },
		{ type: "}", literal: null, lexeme: "}", line: 1 },
		{ type: "+", literal: null, lexeme: "+", line: 1 },
		{ type: "-", literal: null, lexeme: "-", line: 1 },
		{ type: "*", literal: null, lexeme: "*", line: 1 },
		{ type: "/", literal: null, lexeme: "/", line: 1 },
		{ type: "EOF", literal: null, lexeme: "", line: 1 }
	]
	const lexer = new Lexer(operators)
	let tokens: Token[] = lexer.tokenizer()
	for (const [i, token] of tokens.entries()) {
		const expected = result[i]
		expect(token.type).to.equal(expected.type)
		expect(token.lexeme).to.equal(expected.lexeme)
	}
})

it("should scan the variable", () => {
	const operators: string = `var myvar = "jiad"`
	const result = [
		{ type: TokenType.Var, literal: null, lexeme: "var", line: 1 },
		{ type: TokenType.Identifier, literal: null, lexeme: "myvar", line: 1 },
		{ type: TokenType.Equal, literal: null, lexeme: "=", line: 1 },
		// eslint-disable-line no-use-before-define
		{ type: TokenType.String, literal: "jiad", lexeme: '"jiad"', line: 1 },
		{ type: "EOF", literal: null, lexeme: "", line: 1 }
	]
	const lexer = new Lexer(operators)
	let tokens: Token[] = lexer.tokenizer()
	for (const [i, token] of tokens.entries()) {
		const expected = result[i]
		expect(token.type).to.equal(expected.type)
		expect(token.lexeme.toString()).to.toEqual(expected.lexeme.toString())
		// expect(token.literal).to.toEqual(expected.literal)
		expect(token.line).to.equal(expected.line)
	}
})

it("should scan the variable", () => {
	const input = `var five = 5;
        var ten = 10;
        !-/*5;
        5 < 10 > 5;
        10 == 10;
        10 != 9;
        `
	const result = [
		{ type: TokenType.Var, lexeme: "var", literal: null, line: 1 },
		{ type: TokenType.Identifier, lexeme: "five", literal: null, line: 1 },
		{ type: TokenType.Equal, lexeme: "=", leliteral: null, line: 1 },
		{ type: TokenType.Number, lexeme: "5", literal: null, line: 1 },
		{ type: TokenType.Semicolon, lexeme: ";", leliteral: null, line: 1 },
		{ type: TokenType.Var, lexeme: "var", literal: null, line: 2 },
		{ type: TokenType.Identifier, lexeme: "ten", literal: null, line: 2 },
		{ type: TokenType.Equal, lexeme: "=", leliteral: null, line: 2 },
		{ type: TokenType.Number, lexeme: "10", literal: null, line: 2 },
		{ type: TokenType.Semicolon, lexeme: ";", leliteral: null, line: 2 },

		{ type: TokenType.Bang, lexeme: "!", leliteral: null, line: 3 },
		{ type: TokenType.Minus, lexeme: "-", leliteral: null, line: 3 },
		{ type: TokenType.Slash, lexeme: "/", leliteral: null, line: 3 },
		{ type: TokenType.Star, lexeme: "*", leliteral: null, line: 3 },
		{ type: TokenType.Number, lexeme: "5", literal: null, line: 3 },
		{ type: TokenType.Semicolon, lexeme: ";", leliteral: null, line: 3 },

		{ type: TokenType.Number, lexeme: "5", literal: null, line: 4 },
		{ type: TokenType.Less, lexeme: "<", leliteral: null, line: 4 },
		{ type: TokenType.Number, lexeme: "10", literal: null, line: 4 },
		{ type: TokenType.Greater, lexeme: ">", leliteral: null, line: 4 },
		{ type: TokenType.Number, lexeme: "5", literal: null, line: 4 },
		{ type: TokenType.Semicolon, lexeme: ";", leliteral: null, line: 4 },

		{ type: TokenType.Number, lexeme: "10", literal: null, line: 5 },
		{ type: TokenType.EqualEqual, lexeme: "==", leliteral: null, line: 5 },
		{ type: TokenType.Number, lexeme: "10", literal: null, line: 5 },
		{ type: TokenType.Semicolon, lexeme: ";", leliteral: null, line: 5 },
		{ type: TokenType.Number, lexeme: "10", literal: null, line: 6 },
		{ type: TokenType.BangEqual, lexeme: "!=", leliteral: null, line: 6 },
		{ type: TokenType.Number, lexeme: "9", literal: null, line: 6 },
		{ type: TokenType.Semicolon, lexeme: ";", leliteral: null, line: 6 },
		{ type: TokenType.Eof, lexeme: "", literal: "", line: 7 }
	]

	const lexer = new Lexer(input)
	let tokens: Token[] = lexer.tokenizer()
	for (const [i, token] of tokens.entries()) {
		const expected = result[i]
		expect(token.type).to.equal(expected.type)
		expect(token.lexeme).to.toEqual(expected.lexeme)
		// expect(token.literal).to.toEqual(expected.literal)
		expect(token.line).to.equal(expected.line)
	}
})
