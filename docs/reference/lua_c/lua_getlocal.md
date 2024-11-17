# lua_getlocal

指定されたアクティベーションレコードのローカル変数についての情報を取得します。

`[-0, +(0|1), -]`

```c
const char *lua_getlocal (lua_State *L, lua_Debug *ar, int n);
```

## 説明

与えられたアクティベーションレコードのローカル変数についての情報を取得します。`ar`パラメータは、以前の`lua_getstack`の呼び出しによって記入された有効なアクティベーションレコードでなければなりません、またはフックへの引数として与えられる必要があります（`lua_Hook`参照）。`n`インデックスは、調べるローカル変数を選択します（1は最初のパラメータまたはアクティブなローカル変数であり、最後のアクティブなローカル変数まで続きます）。`lua_getlocal`は変数の値をスタックにプッシュし、その名前を返します。

`'('`（開き括弧）で始まる変数名は、内部変数（ループ制御変数、一時変数、C関数のローカル変数）を表します。

インデックスがアクティブなローカル変数の数を超える場合は、NULL（何もプッシュせず）を返します。

## サンプルコード

```c
lua_Debug ar;
lua_getstack(L, 1, &ar);
const char *name = lua_getlocal(L, &ar, 1);
printf("ローカル変数名: %s\n", name);
```

このコードは、現在の関数の最初のローカル変数名を取得して表示します。

## 互換性

- Lua5.1

## 関連項目

- lua_setlocal
- lua_getstack