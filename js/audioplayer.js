import { wrapElement, d, classPrefix } from "./htmlUtility";

export default class AudioPlayer {
    constructor(nodes) {
        wrapElement(nodes, nodeParent());
    }

    init(node) {
        node.controls = false;
        this.addPlayPauseButton(node.parentNode);
        this.addPlayerSeekbar(node.parentNode);
        this.addVolumeSeekbar(node.parentNode);
    }

    addPlayPauseButton(parent) {
        const nodePlayPauseBtn = d.createElement("button");
        nodePlayPauseBtn.className = `${classPrefix}play-btn btn btn-play`;
        nodePlayPauseBtn.innerText = "play";
        parent.appendChild(nodePlayPauseBtn);
    }

    addPlayerSeekbar(parent) {
        const nodePlayerSeekbar = d.createElement("input");
        nodePlayerSeekbar.className = `${classPrefix}player-seekbar seekbar player-seekbar`;
        nodePlayerSeekbar.setAttribute("type", "range");
        nodePlayerSeekbar.setAttribute("min", "0");
        nodePlayerSeekbar.setAttribute("max", "100");
        nodePlayerSeekbar.setAttribute("value", "0");
        parent.appendChild(nodePlayerSeekbar);
    }

    addVolumeSeekbar(parent) {
        const nodeMuteBtn = d.createElement("button");
        nodeMuteBtn.className = `${classPrefix}mute-btn btn btn-mute`;
        nodeMuteBtn.innerText = "mute";
        parent.appendChild(nodeMuteBtn);
    }
}

export const nodeParent = () => {
    const nodeParent = d.createElement("div");
    nodeParent.className = `${classPrefix}container`;
    return nodeParent;
};
