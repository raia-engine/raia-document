# lua_newthread

新しいスレッドを作成し、スタックにプッシュします。

`[-0, +1, m]`

```c
lua_State *lua_newthread (lua_State *L);
```

## 説明

新しいスレッドを作成し、スタックにプッシュし、この新しいスレッドを表す`lua_State`へのポインタを返します。この関数によって返される新しいステートは、元のステートとすべてのグローバルオブジェクト（テーブルなど）を共有しますが、独立した実行スタックを持ちます。

スレッドを閉じるまたは破壊するための明示的な関数はありません。スレッドは、任意のLuaオブジェクトと同様に、ガーベジコレクションの対象です。

## サンプルコード

```c
lua_State *new_thread = lua_newthread(L);
lua_pushthread(new_thread);
```

このコードは、新しいスレッドを作成し、そのスレッド自体をスタックにプッシュします。

## 互換性

- Lua5.1

## 関連項目

- lua_resume
- lua_yield