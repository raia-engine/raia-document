# unpack

テーブルの要素を複数の引数として展開する

```lua
unpack (list [, i [, j]])
```

## 説明

指定されたテーブルから要素を返します。この関数は

```lua
return list[i], list[i+1], ..., list[j]
```

と同等ですが、上記のコードは固定数の要素に対してのみ記述できます。デフォルトでは、`i`は1で、`j`は長さ演算子によって定義されたリストの長さです。

## サンプルコード

```lua
local t = {1, 2, 3}
print(unpack(t))  -- 1 2 3
```

この例では、テーブルの要素が展開されて表示されます。

## 互換性

- Lua5.1