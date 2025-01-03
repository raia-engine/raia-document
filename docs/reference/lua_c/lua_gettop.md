# lua_gettop

スタックの最上位要素のインデックスを返します。

`[-0, +0, -]`

```c
int lua_gettop (lua_State *L);
```

## 説明

スタックの最上位要素のインデックスを返します。インデックスは1から始まるため、この結果はスタック内の要素の数と等しくなります（したがって0は空のスタックを意味します）。

## サンプルコード

```c
int top = lua_gettop(L);
printf("スタックの最上位インデックスは %d です\n", top);
```

このコードは、現在のスタックの最上位インデックスを取得し、表示します。

## 互換性

- Lua5.1

## 関連項目

- lua_settop
- lua_pushvalue