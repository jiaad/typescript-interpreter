import { Expr } from "../lexer/Expr"
import Token from "../lexer/Token"
import { TokenItem, TokenType } from "../lexer/TokenType"
import {Stmt } from "./../parser/Stmt"
export default class Parser {
	readonly tokens: Token[]
	private current: number
	constructor(tokens: Token[]) {
		this.tokens = tokens
		this.current = 0
	}
	public parse(): Expr {
    try{
      const statements: Expr[] = []
      while(this.isAtEnd()){
        statements.push(statement())
      }
    }catch(e: any){

    }
	//	return this.expression()
	}

  private statement(): Stmt{
    if(this.match(TokenType.Print)) return this.printStatement()
    return this.expressionStatement()
  }

  private printStatement(): Stmt{

  }
  private expressionStatement(): Stmt{}

	private expression(): Expr {
		try {
			return this.equality()
		} catch (e: any) {
			throw new Error(e?.message)
		}
	}

	private equality(): Expr {
		let expr = this.comparison()
		while (this.match(TokenType.EqualEqual, TokenType.BangEqual)) {
			const operator = this.previous()
			const right = this.comparison()
			expr = Expr.Binary(expr, operator, right)
		}
		return expr
	}

	private comparison(): Expr {
		let expr = this.term()
		while (
			this.match(
				TokenType.Greater,
				TokenType.Less,
				TokenType.GreaterEqual,
				TokenType.LessEqual
			)
		) {
			const operator = this.previous() // match increment
			const right = this.term()
			expr = Expr.Binary(expr, operator, right)
		}
		return expr
	}

	private term(): Expr {
		let expr = this.factor()
		while (this.match(TokenType.Plus, TokenType.Minus)) {
			const operator: Token = this.previous()
			const right: Expr = this.factor()
			expr = Expr.Binary(expr, operator, right)
		}
		return expr
	}

	private factor(): Expr {
		let expr = this.unary()
		while (this.match(TokenType.Star, TokenType.Slash)) {
			const operator: Token = this.previous()
			const right: Expr = this.unary()
			expr = Expr.Binary(expr, operator, right)
		}

		return expr
	}

	private unary(): Expr {
		if (this.match(TokenType.Minus, TokenType.Bang)) {
			const operator: Token = this.previous()
			const right: Expr = this.unary()
			return Expr.Unary(operator, right)
		}
		return this.primary()
	}

	private primary(): Expr {
		if (this.match(TokenType.True)) return Expr.Literal(true)
		if (this.match(TokenType.False)) return Expr.Literal(false)
		if (this.match(TokenType.Nil)) return Expr.Literal(null)

		if (this.match(TokenType.String, TokenType.Number)) {
			return Expr.Literal(this.previous().literal)
		}

    if(this.match(TokenType.LeftParen)){
      let expr: Expr = this.expression();
      this.consume(TokenType.RightParen,"Expect ')' after expression.")
      return Expr.Grouping(expr)
    }
		throw new Error("Unexpected" + this.peek().type)
	}

  private consume(type: TokenItem, message: string){
    if(this.check(type)) return this.advanced()
    // throw new Error(this.peek(), message )
  }

	// prvate helper methods
	private peek(): Token {
		return this.tokens[this.current]
	}

	private match(...types: string[]): boolean {
    if(this.isAtEnd()) return false
		const exist: boolean = types.includes(this.peek().type)
		if (exist) this.current++
		return exist === true
	}

	private isAtEnd() {
		return this.tokens[this.current].type === TokenType.Eof
	}

	private previous() {
		return this.tokens[this.current - 1]
	}
	private check(type: TokenItem) {
		if (this.isAtEnd()) return false
		return this.peek().type === type
	}

  private advanced(): Token{
    if(!this.isAtEnd()) this.current++
    return this.previous()
  }
}
