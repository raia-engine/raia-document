# debug.setfenv

```lua
debug.setfenv (object, table)
```

## 説明

指定したオブジェクト`object`の環境テーブルを`table`に設定します。オブジェクトとして関数やスレッドが指定できます。

## サンプルコード

```lua
local function test() print(a) end
debug.setfenv(test, {a = 42})
test()  -- 42が表示される
```

この例では、関数`test`の環境を設定して、その中で変数`a`が使用されます。

## 互換性

- Lua 5.1

## 関連項目

- [`debug.getfenv`](getfenv.md)
- [`setfenv`](../std/setfenv.md)