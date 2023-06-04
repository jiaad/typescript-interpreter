import Token from "./Token"

export interface Visitor<T> {
	visitBinaryExpr(expr: BinaryExpr): T
	visitUnaryExpr(expr: UnaryExpr): T
	visitLiteralExpr(expr: LiteralExpr): T
	visitGroupingExpr(expr: GroupingExpr): T
}

export abstract class Expr {
	abstract accept<T>(visitor: Visitor<T>): T

	static Binary(left: Expr, operator: Token, right: Expr) {
		return new BinaryExpr(left, operator, right)
	}

	static Unary(left: Token, right: Expr) {
		return new UnaryExpr(left, right)
	}

	static Literal(val: number | string | boolean | null) {
		return new LiteralExpr(val)
	}

	static Grouping(expression: Expr) {
		return new GroupingExpr(expression)
	}
}

export class BinaryExpr extends Expr {
	readonly operator: Token
	readonly left: Expr
	readonly right: Expr
	constructor(left: Expr, operator: Token, right: Expr) {
		super()

		this.left = left
		this.operator = operator
		this.right = right
	}

	accept<T>(visitor: Visitor<T>) {
		return visitor.visitBinaryExpr(this)
	}
}

export class UnaryExpr extends Expr {
	readonly left: Token
	readonly right: Expr
	constructor(left: Token, right: Expr) {
		super()
		this.left = left
		this.right = right
	}

	accept<T>(visitor: Visitor<T>) {
		return visitor.visitUnaryExpr(this)
	}
}

export class LiteralExpr extends Expr {
	readonly value: string | number | boolean | null
	constructor(value: string | number | boolean | null) {
		super()
		this.value = value
	}

	accept<T>(visitor: Visitor<T>) {
		return visitor.visitLiteralExpr(this)
	}
}

export class GroupingExpr extends Expr {
	readonly expression: Expr
	constructor(expression: Expr) {
		super()
		this.expression = expression
	}

	accept<T>(visitor: Visitor<T>) {
		return visitor.visitGroupingExpr(this)
	}
}
