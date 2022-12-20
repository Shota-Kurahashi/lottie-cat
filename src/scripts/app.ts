/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import "../styles/style.scss";
import Lottie from "lottie-web";
import "../assets/data.json";

const load = document.getElementById("load") as HTMLDivElement;

const lottieObj = Lottie.loadAnimation({
  container: document.getElementById("load") as HTMLDivElement, // 表示させたい要素を渡します
  renderer: "svg", // 描画形式を指定します. // svg or canvas or html svg以外ちゃんとためしてないですが
  loop: true, // trueにしたらループです。1回再生の場合はfalseで
  autoplay: true, // 自動再生です。falseの場合は自分のタイミングで
  path: "../assets/data.json", // 再生させたいアニメーションのjsonのパスを指定します。
});

window.addEventListener(
  "load",
  () => {
    setTimeout(() => {
      lottieObj.pause();
      load.classList.add("load--loaded");
    }, 10000);
  },
  false
);
