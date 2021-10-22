export function dropBody() {
  $("#door1").velocity({ rotateZ: 90 }, 1000);
  $("#door2").velocity({ rotateZ: -90 }, 1000);
  fall();
}


export function fall() {
  let dur = 500;
  let del = 1000;
  $("#body").velocity({ translateY: "200px" }, { duration: dur, delay: del });
  $("#rope").velocity({ y2: "+=200px" }, { duration: dur, delay: del });
  $("#armL").velocity({ y2: "-=60px" }, { duration: dur, delay: del });
  $("#armR").velocity({ y2: "-=60px" }, { duration: dur, delay: del });
  finish();
}

export function finish() {
  $("#armL").velocity({ y2: "+=70px", x2: "+=10px" }, 500);
  $("#armR").velocity({ y2: "+=70px", x2: "-=10px" }, 500);
}