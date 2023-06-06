import {
  BinaryExpr,
  Expr,
  GroupingExpr,
  LiteralExpr,
  UnaryExpr,
  Visitor as VisitorExpr
} from "../lexer/Expr"
import { TokenType } from "../lexer/TokenType"
import { ExpressionStmt, PrintStmt, Stmt, VisitorStmt } from "./Stmt"

export default class Interpreter implements VisitorExpr<any>, VisitorStmt<void> {
  constructor(){}
  interpreter(stmts: Stmt[]): void{
    try{
      for(let stmt of stmts){
        this.execute(stmt)
      }
    }catch(e: any){
      console.log(e)
    }
  }


  execute(stmt: Stmt): any{
    return stmt.accept(this)
  }

  visitingExpressionStmt(stmt: ExpressionStmt): void{
    this.evaluate(stmt.expression)
    return 
  }
   
  visitingPrintStmt(stmt: PrintStmt): void{
    const value: Expr =  this.evaluate(stmt.expression) 
    console.log(value);

    return 
  }
 
  // EXPRESSION EVALUATION
  public evaluate(expression: Expr): any {
    return expression.accept(this)
  }


  visitBinaryExpr(expr: BinaryExpr): any {
    let left: Expr = this.evaluate(expr.left)
    let right: Expr = this.evaluate(expr.right)
    switch (expr.operator.type) {
      case TokenType.Plus: {
        return Number(left) + Number(right)
      }
      case TokenType.Star: {
        return Number(left) * Number(right)
      }
      case TokenType.Minus: {
        return Number(left) - Number(right)
      }
      case TokenType.Slash: {
        return Number(left) / Number(right)
      }
      case TokenType.Greater:
        return Number(left) > Number(right)
      case TokenType.GreaterEqual:
        return Number(left) >= Number(right)
      case TokenType.Less:
        return Number(left) < Number(right)
      case TokenType.LessEqual:
        return Number(left) <= Number(right)
      default:
        break
    }
    return null
  }

  visitLiteralExpr(expr: LiteralExpr): any {
    return expr.value
  }

  visitUnaryExpr(expr: UnaryExpr): any {
    let right: any = this.evaluate(expr.right)
    switch (expr.left.type) {
      case TokenType.Minus:
        return -right
      case TokenType.Bang:
        return !this.isTruthy(right)
      default:
        break
    }
    return null
  }

  visitGroupingExpr(expr: GroupingExpr): any {
    return this.evaluate(expr.expression)
  }

  // private
  isTruthy(val: any): boolean {
    if ([null, undefined].includes(val)) return false;
    if (typeof val === 'boolean') return Boolean(val)
    return true
  }
}
