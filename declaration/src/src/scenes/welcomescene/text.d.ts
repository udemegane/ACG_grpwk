import { AdvancedDynamicTexture, Button, InputText, TextBlock } from '@babylonjs/gui';
import { Mesh } from '@babylonjs/core';
/**
 * This represents a script that is attached to a node in the editor.
 * Available nodes are:
 *      - Meshes
 *      - Lights
 *      - Cameas
 *      - Transform nodes
 *
 * You can extend the desired class according to the node type.
 * Example:
 *      export default class MyMesh extends Mesh {
 *          public onUpdate(): void {
 *              this.rotation.y += 0.04;
 *          }
 *      }
 * The function "onInitialize" is called immediately after the constructor is called.
 * The functions "onStart" and "onUpdate" are called automatically.
 */
export default class MyScript extends Mesh {
    private _SpaceKey;
    advancedTexture: AdvancedDynamicTexture;
    time: number;
    ispressed: boolean;
    selectup: boolean;
    nowscene: number;
    button: TextBlock;
    multiplay: TextBlock;
    singleplay: TextBlock;
    inputusername: InputText;
    inputpassword: InputText;
    welcome: TextBlock;
    waiting: TextBlock;
    errortext: TextBlock;
    enterbutton: Button;
    returnbutton: Button;
    /**
     * Override constructor.
     * @warn do not fill.
     */
    protected constructor();
    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    onInitialize(): void;
    /**
     * Called on the scene starts.
     */
    onStart(): void;
    private _onSpaceKey;
    private _onWKey;
    private _onSKey;
    private _onZKey;
    /**
     * Called each frame.
     */
    onUpdate(): void;
    welcomecommentGUI(): void;
    createbuttonGUI(): void;
    createsingleplayGUI(): void;
    createmultiplayGUI(): void;
    selectbutton(): void;
    createinputGUI(): void;
    createenterbuttonGUI(): void;
    createreturnbuttonGUI(): void;
    createloadingGUI(): void;
    waitinganimation(): void;
    playSound(name: any): void;
    /**
     * Called on a message has been received and sent from a graph.
     * @param message defines the name of the message sent from the graph.
     * @param data defines the data sent in the message.
     * @param sender defines the reference to the graph class that sent the message.
     */
    onMessage(name: string, data: any, sender: any): void;
}
