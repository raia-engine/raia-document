# os.remove

```lua
os.remove (filename)
```

## 説明

指定されたファイルまたはディレクトリを削除します。ディレクトリが空でない場合は削除できません。失敗した場合、`nil` とエラーメッセージを返します。

## サンプルコード

```lua
os.remove("test.txt")  -- ファイルを削除
```

この例では、指定されたファイルを削除しています。

## 互換性

- Lua 5.1