
let enable = false;
let timeDistance = 400;
let currentScroll = 0;
let scrollDistance = 0;
let currentTime = 0;

const scrollToAnim = ({ top, scroll, distance, time }) => {
    enable = true;
    timeDistance = time;
    currentTime = 0;
    currentScroll = scroll;
    scrollDistance = distance;
    console.log('top, time', top, time);
    // window.scrollTo({ top, behavior: 'instant' });
}

const runner = (value) => {

}

const scrollToTick = (delta) => {
    if (!enable) return;

    // currentScroll // 500
    // scrollDistance // -300 /
    currentTime += delta;

    if (currentTime >= 1) {
        enable = false;
        currentTime = 1;
    }

    const timeNorm = currentTime / timeDistance;
    let fraction = scrollDistance * timeNorm;
    console.log('timeNorm', timeNorm);

    window.scroll({ top: currentScroll - fraction, behavior: 'instant' });
}


/**
* @param callbackObj Object An object with callbacks in .start, .progress, and .done
* @param duration Integer Total duration in seconds
*/
function animate(callbackObj, duration) {
        var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
        var startTime = 0, percentage = 0, animationTime = 0;

        duration = duration*1000 || 1000;

        var animation = function(timestamp) {

          if (startTime === 0) {
              startTime = timestamp;
            } else {
              animationTime = timestamp - startTime;
            }

          if (typeof callbackObj.start === 'function' && startTime === timestamp) {
             callbackObj.start();

             requestAnimationFrame(animation);
          } else if (animationTime < duration) {
             if (typeof callbackObj.progress === 'function') {
               percentage = animationTime / duration;
               callbackObj.progress(percentage);
             }

            requestAnimationFrame(animation);
          } else if (typeof callbackObj.done === 'function'){
              callbackObj.done();
          }
        };

      return requestAnimationFrame(animation);
}



export {
    scrollToAnim, scrollToTick
}