# ACG グループワーク課題　？班

## 環境構築

### リポジトリのクローン

このリポジトリを好きな場所にクローンする。
```
$ cd WORK_DIR_ROOT
$ git clone https://github.com/udemegane/ACG_grpwk.git
```

### エディタのインストール

[babylonjs.editor](http://editor.babylonjs.com)を以下のリンクからインストールする。
 - 公式サイト: http://editor.babylonjs.com
 - 非公式ミラー(udemeganeのGdrive経由. 公式サイトはめっちゃ遅いのでこっちのほうが速いかも)
   - [Windows](https://drive.google.com/file/d/1-75nv2szsy4O7eOtMfUShfc5AwdO7n8Q/view?usp=sharing)
   - [Mac](https://drive.google.com/file/d/1-CUdCz3ZgKMdiB5j4XOrDm-D_PbsOzzV/view?usp=sharing)


Windowsの場合、**全てのユーザーにインストール:管理者権限**を選択すること。手元の環境ではユーザーインストールだとよからぬエラーが起きた。

---
## エディタのつかいかた
ここに全てが書いてある。 http://editor.babylonjs.com
### Q&A
- ソースコード(src/のファイル)変更しても何も変わらないが？？
  - エディタ左上メニューバーにあるEditから、Restart Typescript Watcherを連打すると治る。
