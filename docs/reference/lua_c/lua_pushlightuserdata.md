# lua_pushlightuserdata

ライトユーザーデータをスタックにプッシュします。

`[-0, +1, -]`

```c
void lua_pushlightuserdata (lua_State *L, void *p);
```

## 説明

ライトユーザーデータをスタックにプッシュします。

ユーザーデータはLua内のC値を表します。ライトユーザーデータはポインタを表します。それは値（数値のような）です：作成することはありません、個別のメタテーブルを持たない、そして集められることはありません（それは決して作成されなかったので）。ライトユーザーデータは、同じCアドレスを持つ任意のライトユーザーデータと等しいです。

## サンプルコード

```c
lua_pushlightuserdata(L, &my_data);
```

このコードは、ポインタ`&my_data`をライトユーザーデータとしてスタックにプッシュします。

## 互換性

- Lua5.1

## 関連項目

- lua_newuserdata
- lua_touserdata