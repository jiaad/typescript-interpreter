import {
	BinaryExpr,
	Expr,
	GroupingExpr,
	LiteralExpr,
	UnaryExpr,
	Visitor
} from "./Expr"
import Token from "./Token"
import { TokenType } from "./TokenType"

class AstPrinter implements Visitor<any> {
	public print(expr: Expr) {
		return expr.accept(this)
	}
	visitBinaryExpr(expr: BinaryExpr) {
		return this.parenthesis(expr.operator.lexeme, expr.left, expr.right)
	}
	visitGroupingExpr(expr: GroupingExpr) {
		return this.parenthesis("group", expr.expression)
	}
	visitLiteralExpr(expr: LiteralExpr) {
		if (expr.value === null) return "nil"
		return expr.value.toString()
	}
	visitUnaryExpr(expr: UnaryExpr) {
		return this.parenthesis(expr.left.lexeme, expr.right)
	}

	private parenthesis(name: String, ...exprs: Expr[]): string {
		return this.parenthesisLisp(name, ...exprs)
	}
	private parenthesisRPN(name: String, ...exprs: Expr[]) {
		let res = ""

		for (let i = 0; i < exprs.length; i++) res += ` ${exprs[i].accept(this)}`

		res += ` ${name}`
		return res
	}
	private parenthesisLisp(name: String, ...exprs: Expr[]) {
		let res = `(${name}`

		for (let i = 0; i < exprs.length; i++) {
			res += ` ${exprs[i].accept(this)}`
		}
		res += ")"
		return res
	}
}

let exp = Expr.Binary(
	Expr.Unary(new Token(TokenType.Minus, "-", null, 1), Expr.Literal(123)),
	new Token(TokenType.Star, "*", null, 1),
	Expr.Grouping(Expr.Literal(123))
)
let exp2 = Expr.Binary(
	Expr.Unary(new Token(TokenType.Minus, "-", null, 1), Expr.Literal(123)),
	new Token(TokenType.Star, "*", null, 1),
	Expr.Grouping(Expr.Literal(45.67))
)

let exp3 = Expr.Binary(
	// 1
	Expr.Binary(
		Expr.Literal(1),
		new Token(TokenType.Star, "+", null, 1),
		Expr.Literal(2)
	),
	new Token(TokenType.Star, "*", null, 1),
	Expr.Binary(
		Expr.Literal(4),
		new Token(TokenType.Minus, "-", null, 1),
		Expr.Literal(3)
	)
)
let exec = new AstPrinter().print(exp3)
console.log(exec)
console.log("=======================")

/**
 * 
 * 
expr → expr ( "(" ( expr ( "," expr )* )? ")" | "." IDENTIFIER )+
  | IDENTIFIER
  | NUMBER

  expt -> expr '(' (expr "," expr "," expr) "," expr  ')' 
  expr -> expr "." IDENTFIER
  expr -> expr 
  expt -> IDENTIFIER 
  expt -> NUMBER 
 * 
 */
