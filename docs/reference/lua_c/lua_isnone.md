# lua_isnone

指定されたインデックスが無効である場合に1を返します。

`[-0, +0, -]`

```c
int lua_isnone (lua_State *L, int index);
```

## 説明

指定された許容インデックスが無効である（つまり、現在のスタックの外部の要素を指している）場合は1を返し、そうでなければ0を返します。

## サンプルコード

```c
if (lua_isnone(L, 10)) {
    printf("インデックス10は無効です\n");
}
```

このコードは、インデックス10が無効であるかを確認し、無効の場合にメッセージを表示します。

## 互換性

- Lua5.1

## 関連項目

- lua_isnoneornil
- lua_type