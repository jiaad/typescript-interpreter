import {
  BinaryExpr,
  Expr,
  GroupingExpr,
  LiteralExpr,
  UnaryExpr,
  Visitor
} from "../lexer/Expr"
import { TokenType } from "../lexer/TokenType"

export default class Interpreter implements Visitor<any> {
  constructor() { }
  public interpreter(expression: Expr) {
    return expression.accept(this)
  }

  visitBinaryExpr(expr: BinaryExpr): any {
    let left: Expr = this.interpreter(expr.left)
    let right: Expr = this.interpreter(expr.right)
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
    let right: any = this.interpreter(expr.right)
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
    return this.interpreter(expr.expression)
  }

  // private
  isTruthy(val: any): boolean {
    if ([null, undefined].includes(val)) return false;
    if (typeof val === 'boolean') return Boolean(val)
    return true
  }
}
