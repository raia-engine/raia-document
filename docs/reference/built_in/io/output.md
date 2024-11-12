# io.output

```lua
io.output ([file])
```

## 説明

デフォルトの出力ファイルを設定します。`file` にファイル名を指定すると、そのファイルを開いてデフォルトの出力ファイルに設定します。ファイルハンドルを指定した場合は、そのハンドルをデフォルトの出力ファイルに設定します。引数なしで呼び出すと、現在のデフォルト出力ファイルを返します。

## サンプルコード

```lua
io.output("test.txt")  -- test.txt をデフォルトの出力に設定
io.write("Hello, Lua!")
```

この例では、出力ファイルを設定して文字列を書き込んでいます。

## LuaJIT独自の拡張

64ビットファイルオフセットを扱う。

## 互換性

- Lua 5.1
- LuaJIT

## 関連項目

- [`io.input`](input.md)