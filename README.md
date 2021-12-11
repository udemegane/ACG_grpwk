# ACG グループワーク課題　？班

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
 - 非公式ミラー(udemeganeのGdrive経由. 公式サイトはめっちゃ遅いのでこっちのほうが速いかも)
   - [Windows](https://drive.google.com/file/d/1-75nv2szsy4O7eOtMfUShfc5AwdO7n8Q/view?usp=sharing)
   - [Mac](https://drive.google.com/file/d/1-CUdCz3ZgKMdiB5j4XOrDm-D_PbsOzzV/view?usp=sharing)
   - [Linux|AppImage](https://drive.google.com/file/d/1-6dqP_1AC65SenikLwwXDFclglUnDO7W/view?usp=sharing)


Windowsの場合、**全てのユーザーにインストール:管理者権限**を選択すること。手元の環境ではユーザーインストールだとよからぬエラーが起きた。

---
## エディタのつかいかた
ここに全てが書いてある。https://doc.babylonjs.com/extensions/editor/gettingStarted
### Q&A
- ソースコード(src/のファイル)変更しても何も変わらないが？？
  - エディタ左上メニューバーにあるEditから、Restart Typescript Watcherを連打すると治る。

---
## 仕様
### シーンのスクリプト
babylonjs editorはシーン中に存在するものにtypescriptファイルを割り当てて挙動を制御できる。詳しくは[ドキュメント]( https://doc.babylonjs.com/extensions/editor/scripting/attachingScripts )を読め。
ゲームのルールなどシーンそのものにスクリプトを割り当てたい場合は、グローバルな処理（あらゆるシーンに対して有効）ならsrc/scenes/GameScripts/sceneScriptBase.tsに書く。
シーン事の固有のスクリプトの場合はsrc/scenes/scene/scene.tsとかsrc/scenes/MainMap/mainMap.tsみたいにSceneScriptBaseを継承して書く。

### ランタイムデバッグ用UI
[tweakpane]( https://cocopon.github.io/tweakpane/ )をランタイム用デバッグUIとして採用した。ランタイム中に色々調整したいパラメータ（キャラクターの速度とかジャンプ力とか）はこれを使おう。  
使い方は、sceneScriptBase.tsにパブリックなPane型の静的変数paneがいるから、
```typescript
import SceneScriptBase from "../GameScripts/sceneScriptBase";
/*
* なにかの処理
* */
SceneScriptBase.addInput(PARAMS, KEY);
```
みたいに使う。詳しくはドキュメントを見よう。  
デバッグUI自体はエディタからGUIで消せるようにしてある。左のgraphパネルからsceneを選択して、右のinspectorパネルのscriptタブの中にあるShow Debug Menuでオンオフができる。  

### シーンの切り替え
シーンをランタイム中に切り替えるswitchScene()をsrc/GameScript/gameManager.tsに書いた。サンプル実装としてデフォルトのFPSのシーンで０キーを押すとMainMapに切り替わる。詳しくはsrc/scenes/scene/camera.tsの_onZeroKey()を見よう。