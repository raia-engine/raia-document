# jit.off

JITコンパイラを無効にする

```lua
jit.off([func|true], [true|false])
```

## 説明

`jit.off` 関数は、JITコンパイラを無効にし、指定した関数または全てのコンパイル済みコードをフラッシュします。これにより、指定された関数や全体のコードがインタプリタモードで実行されるようになります。サブ関数に対しても、再帰的にJITを無効化することが可能です。

## 補足

- `func` に特定の関数を指定すると、その関数のみがJITコンパイルの対象外となります。`func` に `true` を指定すると、全ての関数がJITコンパイルの対象外になります。
- 第2引数の `recursive` に `true` を指定すると、サブ関数やクロージャも含めて再帰的にJITを無効化します。

## サンプルコード

```lua
local jit = require("jit")
jit.off(true, true)  -- 全体でJITを無効化
```

## 互換性

- LuaJIT