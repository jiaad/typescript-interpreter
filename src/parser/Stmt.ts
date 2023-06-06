import {Expr} from "../lexer/Expr"



export interface VisitorStmt<T> {
  visitingExpressionStmt(Expr: ExpressionStmt): T;
  visitingPrintStmt(expr: PrintStmt): T;
}

export abstract class Stmt {
	abstract accept<T>(visitor: VisitorStmt<T>): T
  static Print(expression: Expr){
    return new PrintStmt(expression)
  }

  static Expression(expression: Expr){
    return new ExpressionStmt(expression)
  }
}


export class ExpressionStmt extends Stmt {
  readonly expression: Expr
  constructor(expression: Expr){
    super()
    this.expression = expression
  }

  accept<T>(visitor: VisitorStmt<T>): T{
    return visitor.visitingExpressionStmt(this)
  }
}

export class PrintStmt extends Stmt {
  readonly expression: Expr
  constructor(expression: Expr){
    super()
    this.expression = expression
  }
  accept<T>(visitor: VisitorStmt<T>): T{
    return visitor.visitingPrintStmt(this)
  }
}
