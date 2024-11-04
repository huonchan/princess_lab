const DUMMY_TEXT= `Dummy`;

const HTML_TEMP = 
`
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>${DUMMY_TEXT}</title>
</head>

<body>

</body>
</html>
`;


const HTML_DIV = 
`
<div id="dummy">

</div>
`;

const HTML_TEXTAREA = 
`
<textarea id="" , rows="5" cols="40">悪ポテトのたち</textarea>
`;

const HTML_BUTTON = 
`
<button onclick="dummy_function()">ボタン</button>
`;


const HTML_LINK = 
`
<button onclick="dummy_function()">ボタン</button>
`;

const HTML_IMAGE = 
`
<img src="./image_name.jpg" alt="代替テキスト" title="オンマウス表示文字"></img>
`;



const HTML_CHECKBOX = 
`
<input type="checkbox" id="checkbox" name="checkbox" value="send_param" , checked >
<label for="checkbox">check</label>
`;

const HTML_YOUTUBE = 
`
<!-- 動画によっては埋め込みから再生できないものがあるらしい。条件不明 -->
<iframe width="560" height="315" 
  src="https://www.youtube.com/embed/nROvY9uiYYk?si=FH0SX104Bdt0i9G-"
  title="YouTube video player" frameborder="0" allow="accelerometer; 
  autoplay; 
  clipboard-write;
  encrypted-media; 
  gyroscope;
  picture-in-picture; 
  web-share"
  referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
</iframe>
`;