# error

実行中の関数を停止し、エラーメッセージを返す

```lua
error (message [, level])
```

## 説明

最後に呼ばれた保護された関数を終了させ、`message`をエラーメッセージとして返します。`error`関数は決して戻りません。

通常、`error`はメッセージの先頭にエラーの位置に関する情報を追加します。`level`引数はエラーの位置を取得する方法を指定します。レベル1（デフォルト）では、エラー位置は`error`関数が呼び出された場所です。レベル2は、`error`を呼び出した関数が呼び出された場所にエラーを指摘します。そして以下同様です。レベル0を渡すと、メッセージにエラー位置情報を追加することが避けられます。

## サンプルコード

```lua
error("An error occurred.")
```
この例では、指定されたメッセージでエラーが発生します。

## 互換性

- Lua5.1

## 関連項目

- [`assert`](assert.md)