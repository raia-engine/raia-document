# lua_rawequal

指定されたインデックスの2つの値が原始的に等しいかを判定します。

`[-0, +0, -]`

```c
int lua_rawequal (lua_State *L, int index1, int index2);
```

## 説明

許容されるインデックス`index1`と`index2`の2つの値が原始的に等しい（つまり、メタメソッドを呼び出さずに）場合は1を返し、そうでなければ0を返します。いずれかのインデックスが無効である場合も0を返します。

## サンプルコード

```c
if (lua_rawequal(L, 1, 2)) {
    printf("インデックス1と2の値は等しいです\n");
}
```

このコードは、インデックス1と2の値が等しいかどうかを判定し、等しい場合にメッセージを表示します。

## 互換性

- Lua5.1

## 関連項目

- lua_equal
- lua_compare