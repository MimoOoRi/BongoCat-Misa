// 按键：音阶，动作，音乐文件名字
var keyDatas = {
  // bongo
  A: ["bongo", 0, "left", "bongo0.mp3"],
  D: ["bongo", 1, "right", "bongo1.mp3"],

  // cat
  " ": ["meow", 0, "mouth", "meow.mp3"],
};

// 加载音乐文件
for (const key in keyDatas) {
  let [group, tone, action, ssound] = keyDatas[key];
  let mp3 = "sounds/" + ssound;
  let mp3Id = group + ssound;
  createjs.Sound.registerSound(mp3, mp3Id);
}

// 儲存未釋放按鈕
let keys = []; 
// keyboard event listener
// 获取按下的是哪个键
// 按下键，猫手放下
// 阻止事件，

document.onkeydown = function (e) {
  e.preventDefault();
  key = e.key.toUpperCase();
  //   避免长按连续触发事件处理
  if (keyDatas[key] != undefined) {
    if (keys.indexOf(key) == -1) {
      //超过-1，已经触发过一次，并且未释放
      keys.push(key);
      console.log(`${keys.indexOf(key)} - keydown`);

      //获取对应动作信息
      let [group, tone, action, ssound] = keyDatas[key];
      createjs.Sound.play(group + ssound);
      switch (action) {
        case "left":
          document.getElementById("leftHand").className = "down";
          break;
        case "right":
          document.getElementById("rightHand").className = "down";
          break;
        case "mouth":
          document.getElementById("mouth").className = "open";
          break;
        default:
          break;
      }
    }
  }
};

// 松开，猫手抬
document.onkeyup = function (e) {
  e.preventDefault();
  key = e.key.toUpperCase();
  if (keyDatas[key] != undefined) {
    console.log(`${key} - keyup`);
    if (keys.indexOf(key) != -1) {
      keys.splice(keys.indexOf(key), 1);
      let [group, tone, action, sound] = keyDatas[key];
      switch (action) {
        case "left":
          document.getElementById("leftHand").className = "up";
          break;
        case "right":
          document.getElementById("rightHand").className = "up";
          break;
        case "mouth":
          document.getElementById("mouth").className = "off";
          break;
        default:
          break;
      }
    }
  }
};
