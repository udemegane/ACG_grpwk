# [ACG グループワーク課題　？班](https://udemegane.github.io/ACG_grpwk/)

[![Game Client by Babylon.js](https://github.com/udemegane/ACG_grpwk/actions/workflows/webpack.yml/badge.svg?branch=main)](https://github.com/udemegane/ACG_grpwk/actions/workflows/webpack.yml)
  
## Documentation

- [HackMD](https://hackmd.io/@udemegane/SyovqFy5F/edit)

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
- 非公式ミラー(udemegane の Gdrive 経由. 公式サイトはめっちゃ遅いのでこっちのほうが速いかも)
  - [Windows](https://drive.google.com/file/d/1-75nv2szsy4O7eOtMfUShfc5AwdO7n8Q/view?usp=sharing)
  - [Mac](https://drive.google.com/file/d/1-CUdCz3ZgKMdiB5j4XOrDm-D_PbsOzzV/view?usp=sharing)
  - [Linux|AppImage](https://drive.google.com/file/d/1-6dqP_1AC65SenikLwwXDFclglUnDO7W/view?usp=sharing)

Windows の場合、**全てのユーザーにインストール:管理者権限**を選択すること。手元の環境ではユーザーインストールだとよからぬエラーが起きた。

### バックエンド用サーバのインストールとセットアップ

```bash
$ ./run-backserver.sh --init  # install all dependencies (requires user input along the way)
$ ./run-backserver.sh -s      # starts up a local backend server
```

[その他のオプションの説明 | run-backserver.sh](#bash-run-backserversh)

---

## エディタのつかいかた

ここに全てが書いてある。https://doc.babylonjs.com/extensions/editor/gettingStarted

### Q&A

- ソースコード(src/のファイル)変更しても何も変わらないが？？
  - エディタ左上メニューバーにある Edit から、Restart Typescript Watcher を連打すると治る。

---

## 仕様

### シーンのスクリプト

babylonjs editor はシーン中に存在するものに typescript ファイルを割り当てて挙動を制御できる。詳しくは[ドキュメント](https://doc.babylonjs.com/extensions/editor/scripting/attachingScripts)を読め。
ゲームのルールなどシーンそのものにスクリプトを割り当てたい場合は、グローバルな処理（あらゆるシーンに対して有効）なら src/scenes/GameScripts/sceneScriptBase.ts に書く。
シーン事の固有のスクリプトの場合は src/scenes/scene/scene.ts とか src/scenes/MainMap/mainMap.ts みたいに SceneScriptBase を継承して書く。

### ランタイムデバッグ用 UI

[tweakpane](https://cocopon.github.io/tweakpane/)をランタイム用デバッグ UI として採用した。ランタイム中に色々調整したいパラメータ（キャラクターの速度とかジャンプ力とか）はこれを使おう。
使い方は、sceneScriptBase.ts にパブリックな Pane 型の静的変数 pane がいるから、

```typescript
import SceneScriptBase from '../GameScripts/sceneScriptBase';
/*
 * なにかの処理
 * */
SceneScriptBase.addInput(PARAMS, KEY);
```

みたいに使う。詳しくはドキュメントを見よう。
デバッグ UI 自体はエディタから GUI で消せるようにしてある。左の graph パネルから scene を選択して、右の inspector パネルの script タブの中にある Show Debug Menu でオンオフができる。

### シーンの切り替え

シーンをランタイム中に切り替える switchScene()を src/GameScript/gameManager.ts に書いた。サンプル実装としてデフォルトの FPS のシーンで０キーを押すと MainMap に切り替わる。詳しくは src/scenes/scene/camera.ts の\_onZeroKey()を見よう。

### `bash run-backserver.sh`

```txt
Usage:  ./run-backserver.sh [OPTIONS]

Options:
  --init          Install all Requirements and Setup Environment for Python Development
  -s, --startup   Start Up Backend Server
  -r, --rebuild   Delete All Auto-Generated Files -> Create All Requirements and Initialize
  -t, --test      Run All Tests
  -d, --db        Show Data Inside Database
  -y, --yes       Say yes to all questions
  -h, --help      Show help
```
