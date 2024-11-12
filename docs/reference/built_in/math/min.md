# math.min

引数の中で最小の数を返す

```lua
math.min (x, ···)
```

## 説明

指定された引数の中で最小の値を返します。複数の引数を指定できます。

## サンプルコード

```lua
local a, b, c = 5, 10, 3
print(math.min(a, b, c))  -- 3
```

この例では、`5`, `10`, `3`の中で最小の値を計算しています。

## 互換性

- Lua 5.1

## 関連項目

- [`math.max`](max.md)