# math.log

自然対数を返す

```lua
math.log (x [, base])
```

## 説明

`x` の対数を計算して返します。オプションの `base` を指定すると、その基数での対数を返します。`base` を省略した場合は自然対数（底 `e` の対数）を返します。

## サンプルコード

```lua
local x = 10
print(math.log(x))         -- 自然対数
print(math.log(x, 10))     -- 底10の対数
```

この例では、`10`の自然対数と底10の対数を計算しています。

## 互換性

- Lua 5.2

## 関連項目

- [`math.exp`](exp.md)
- [`math.log10`](log10.md)