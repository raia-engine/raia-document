# lua_getstack

インタープリタのランタイムスタックについての情報を取得します。

`[-0, +0, -]`

```c
int lua_getstack (lua_State *L, int level, lua_Debug *ar);
```

## 説明

インタープリタのランタイムスタックについての情報を取得します。

この関数は、与えられたレベルで実行中の関数のアクティベーションレコードの識別を`lua_Debug`構造体の部分に記入します。レベル0は現在実行中の関数であり、レベルn+1はレベルnを呼び出した関数です。エラーがない場合、`lua_getstack`は1を返します。スタックの深さよりも大きいレベルで呼び出された場合は0を返します。

## サンプルコード

```c
lua_Debug ar;
int result = lua_getstack(L, 0, &ar);
if (result) {
    printf("スタック情報が取得されました\n");
}
```

このコードは、現在の関数のスタック情報を取得して表示します。

## 互換性

- Lua5.1

## 関連項目

- lua_getinfo
- lua_Debug