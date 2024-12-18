# lua_setfenv

指定されたインデックスの値に新しい環境を設定します。

`[-1, +0, -]`

```c
int lua_setfenv (lua_State *L, int index);
```

## 説明

スタックからテーブルをポップし、指定されたインデックスの値の新しい環境として設定します。指定されたインデックスの値が関数、スレッド、またはユーザーデータでない場合、`lua_setfenv`は0を返します。それ以外の場合は1を返します。

## サンプルコード

```c
lua_newtable(L);  /* 新しい環境テーブルを作成 */
lua_setfenv(L, 1);
```

このコードは、新しいテーブルを作成し、インデックス1の値に環境として設定します。

## 互換性

- Lua5.1

## 関連項目

- lua_getfenv
- lua_pushvalue