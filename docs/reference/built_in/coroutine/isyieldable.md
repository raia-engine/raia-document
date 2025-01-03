# coroutine.isyieldable

現在の関数が中断可能かどうかを判定する

```lua
coroutine.isyieldable ()
```

## 説明

現在実行中のコルーチンが `yield`（中断）できる場合に `true` を返します。

コルーチンが `yield` 可能なのは、メインスレッドでなく、かつ `yield` 非対応の C 関数の内部にいないときです。

## サンプルコード

```lua
local co = coroutine.create(function()
    print(coroutine.isyieldable())  -- true が表示されます
    coroutine.yield()
end)

print(coroutine.isyieldable())  -- メインスレッドではfalseが表示されます
coroutine.resume(co)
```

この例では、メインスレッドでは`yield`できないため`false`を返し、コルーチン内では`yield`可能なため`true`を返します。

## 互換性

- Lua 5.3

## 関連項目

- [`coroutine.yield`](yield.md)
- [`coroutine.resume`](resume.md)