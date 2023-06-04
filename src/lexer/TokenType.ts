export const TokenType = {
	// Keywords
	Illegal: "ILLEGAL",
	Eof: "EOF",
	If: "if",
	Else: "ELSE",
	Return: "return",
	True: "true",
	False: "false",
	Int: "INT",
	Function: "FUNCTION",
	Let: "let",
	And: "AND",
	Class: "CLASS",
	For: "FOR",
	While: "WHILE",
	Or: "OR",
	Nil: "NIL",
	Var: "VAR",
	Super: "SUPER",
	This: "THIS",
	Print: "PRINT",

	// literals
	Identifier: "IDENTIFIER",
	String: "STRING",
	Number: "NUMBER",

// OPERATORS AND SIGNEL CHAR TOKEN
	Equal: "=",
	Plus: "+",
	Minus: "-",
	Star: "*",
	Slash: "/",
	LeftParen: "(",
	RightParen: ")",
	LeftBrace: "{",
	RightBrace: "}",
	Comma: ",",
	Dot: ".",
	Semicolon: ";",
	Bang: "!",
	// COMPARISON
	Greater: ">",
	Less: "<",
	GreaterEqual: ">=",
	LessEqual: "<=",
	EqualEqual: "==",
	BangEqual: "!="
} as const


export type TokenItem =  typeof TokenType[keyof typeof TokenType]

export const keywords = new Map();
keywords.set("and",    TokenType.And);
keywords.set("class",  TokenType.Class);
keywords.set("else",   TokenType.Else);
keywords.set("false",  TokenType.False);
keywords.set("for",    TokenType.For);
keywords.set("fun",    TokenType.Function);
keywords.set("if",     TokenType.If);
keywords.set("nil",    TokenType.Nil);
keywords.set("or",     TokenType.Or);
keywords.set("print",  TokenType.Print);
keywords.set("return", TokenType.Return);
keywords.set("super",  TokenType.Super);
keywords.set("this",   TokenType.This);
keywords.set("true",   TokenType.True);
keywords.set("var",    TokenType.Var);
keywords.set("while",  TokenType.While);
