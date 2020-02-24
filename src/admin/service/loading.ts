let temp = document.getElementById('loading-wrapper');
let css = document.createElement('style');
let div = document.createElement('div');
if (!temp) {
  div.id = 'loading-wrapper';
  div.className = 'loading-wrapper';
  div.innerHTML = '<div class="spinner"><div class="spinner-container container1"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container2"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container3"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div></div>';
  css.setAttribute('type', 'text/css');
  css.innerHTML = '.loading-wrapper {position: fixed;left: 0;top: 0;right: 0;bottom: 0;z-index: 9999999;background: rgba(0, 0, 0, 0.3);display: none;}.loading-wrapper.show {display: block}.loading-wrapper .spinner {position: absolute;top: 50%;left: 50%;-webkit-transform: translate(-50%, -50%);transform: translate(-50%, -50%);width: 40px;height: 40px;}.loading-wrapper .container1>div,.loading-wrapper .container2>div,.loading-wrapper .container3>div {width: 10px;height: 10px;background-color: #32B683;border-radius: 100%;position: absolute;-webkit-animation: bouncedelay 1.2s infinite ease-in-out;animation: bouncedelay 1.2s infinite ease-in-out;-webkit-animation-fill-mode: both;animation-fill-mode: both;}.loading-wrapper .spinner .spinner-container {position: absolute;width: 100%;height: 100%;}.loading-wrapper .container2 {-webkit-transform: rotate(45deg);transform: rotate(45deg);}.loading-wrapper .container3 {-webkit-transform: rotate(90deg);transform: rotate(90deg);}.loading-wrapper .circle1 {top: 0;left: 0;}.loading-wrapper .circle2 {top: 0;right: 0;}.loading-wrapper .circle3 {right: 0;bottom: 0;}.loading-wrapper .circle4 {left: 0; bottom: 0;}.loading-wrapper .container2 .circle1 {-webkit-animation-delay: -1.1s;animation-delay: -1.1s;}.loading-wrapper .container3 .circle1 {-webkit-animation-delay: -1s;animation-delay: -1s;}.loading-wrapper .container1 .circle2 {-webkit-animation-delay: -.9s;animation-delay: -.9s;}.loading-wrapper .container2 .circle2 {-webkit-animation-delay: -.8s;animation-delay: -.8s;}.loading-wrapper .container3 .circle2 {-webkit-animation-delay: -.7s;animation-delay: -.7s;}.loading-wrapper .container1 .circle3 {-webkit-animation-delay: -.6s;animation-delay: -.6s;}.loading-wrapper .container2 .circle3 {-webkit-animation-delay: -.5s;animation-delay: -.5s;}.loading-wrapper .container3 .circle3 {-webkit-animation-delay: -.4s;animation-delay: -.4s;}.loading-wrapper .container1 .circle4 {-webkit-animation-delay: -.3s;animation-delay: -.3s;}.loading-wrapper .container2 .circle4 {-webkit-animation-delay: -.2s;animation-delay: -.2s;}.loading-wrapper .container3 .circle4 {-webkit-animation-delay: -.1s;animation-delay: -.1s;}@keyframes bouncedelay {0%,80%,to {transform: scale(0);}40% {transform: scale(1);}}';
  (document.querySelector('body') as HTMLHeadElement).appendChild(div);
  (document.querySelector('head') as HTMLHeadElement).appendChild(css);
}
let loading = temp || div
export default function(bl: boolean) {
  if (bl) {
    loading.className = 'loading-wrapper show';
  } else {
    loading.className = 'loading-wrapper';
  }
}
