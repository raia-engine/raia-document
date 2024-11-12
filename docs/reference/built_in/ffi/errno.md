# ffi.errno

Cライブラリの`errno`の値を取得または設定する

```lua
ffi.errno([newerr])
```

## 説明

`ffi.errno` 関数は、直前のC関数呼び出しで発生したエラー番号を返します。オプションで `newerr` を指定すると、エラー番号をその値に設定し、以前のエラー番号を返します。これは、OSに依存しない方法でエラー状態を追跡するために使用されます。

## 補足

- `ffi.errno` はエラー状態を示すC関数（通常は `-1` や `NULL` を返す関数）でのみ意味を持ち、そうでない場合は未定義の値が含まれる可能性があります。
- 関連するC関数の呼び出し直後に取得するのが推奨されます。

## サンプルコード

```lua
local ffi = require("ffi")

-- C関数でエラーが発生した後にerrnoを取得
local err = ffi.errno()
print("Last error: ", err)
```

このコードは、最後に発生したエラー番号を取得して表示します。

## 互換性

- LuaJIT