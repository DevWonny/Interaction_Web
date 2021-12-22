(() => {
  let yOffset = 0; // window.pageYOffset 대신 사용할 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)

  const sceneInfo = [
    {
      // 0
      type: 'sticky',
      heightNum: 5, // Browser 높이의 5배로 scrollHeight를 세팅
      scrollHeight: 0,
      objs: {
        container : document.querySelector("#scroll-section-0")
      }
    },
    {
      // 1
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container : document.querySelector("#scroll-section-1")
      }
    },
    {
      // 2
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container : document.querySelector("#scroll-section-2")
      }
    },
    {
      // 3
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container : document.querySelector("#scroll-section-3")
      }
    }
  ];

  function setLayout() {
    // 각 스크롤 섹션의 높이 세팅 
    for (let i = 0; i < sceneInfo.length; i++){
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * innerHeight;
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    let totalScrollHeight = 0;
    yOffset = window.pageYOffset;
    for (let i = 0; i < sceneInfo.length; i++){
      totalScrollHeight += sceneInfo.scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  };


  function scrollLoop() {

    prevScrollHeight = 0;

    for (let i = 0; i < currentScene; i++){
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
    } 
    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return;
      currentScene--;
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  };

  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });

  window.addEventListener('load', setLayout); // dom 구조 및 이미지까지 모두 로드 되었을때 실행
  // window.addEventListener('DOMContentLoaded', setLayout); // dom구조만 로드되면 실행됨.
  window.addEventListener('resize', setLayout);
})();