# ⚡ Light audio
This is a lightweight web audio player with zero dependencies 😎
## 📎 Installation
install this package using `NPM`

    npm i lightaudio --save
## 👌🏼 Usage
Wrap your `audio` element with an element and it is **necessary** to set `width` and `height` of parent element! you can do it with CSS 😁
Inside your parent element and beside the audio tag, place an `img` tag. It is your audio thumbnail.
**AND FINISHED 😉**
## ✍🏼 Example
Here is an example of using `lightaudio` library:
your *html* file: 

    <div id="audio-parent" style="width: 200px; height: 200px;">
        <img src="path/to/thumbnail">
        <audio controls>
            <source src="path/to/audio" type="audio/mpeg">
            <span>Your browser does not support the audio element.</span>
        </audio>
    </div>
your *javascript* file:

    import LightAudio from "lightaudio";
    const audioParent = document.getElementById("audio-parent");
    const la = new LightAudio({ parent: audioParent });

## 😇 Options

|key| value | description |
|--|--|--|
| *parent | HtmlElement |
| audioTitle | String |
| *thumbnail | HtmlElement: **Img** |
| color | ColorCode | player text and shapes color |

***Those tagged with * are necessary***