var wrapper = document.getElementsByClassName('wrapper')[0];
var content = document.getElementsByClassName('content')[0];
var imgShow = document.getElementsByClassName('imgShow')[0];
var move = document.getElementsByClassName('move')[0];
var listImg = document.getElementsByClassName('listImg');
var bigImg = document.getElementsByClassName('bigImg')[0];

// 放大倍数
var mul = 4;

var boxLen;

/**
 * 初始化
 */
function init() {
    createMoveBox();

    showImg(0);

    for(var i = 0; i < listImg.length; i++) {
        (function (i) {
            listImg[i].onclick = function () {
                showImg(i);
            }
        })(i);
    }

    content.onmousemove = function (e) {
        moveBox(e);
    }

    content.onmouseleave = function () {
        shutBox();
    }
}

init();

/**
 * 创建“放大镜”
 */
function createMoveBox() {
    boxLen = 500 / mul;
    move.style.width = boxLen + 'px';
    move.style.height = boxLen + 'px';
}

/**
 * 左右两边都显示图片
 * @param i
 */
function showImg(i) {
    var src = listImg[i].getAttribute('src');
    var oImg = new Image();
    oImg.setAttribute('src',src);
    oImg.onload = function() {
        imgShow.innerHTML = '<img src="'+ src + '" alt="">';
        bigImg.style.backgroundImage = 'url("'+ src +'")';
    }

}

/**
 * 移动放大镜
 * @param e
 */
function moveBox(e) {
    var X = e.clientX - wrapper.offsetLeft - boxLen / 2;
    var Y = e.clientY - wrapper.offsetTop - boxLen / 2;
    var maxLeft = content.offsetWidth - boxLen;
    var maxTop = content.offsetHeight - boxLen;

    // 判断边界临界值
    X = X <= 0 ? 0 : X;
    Y = Y <= 0 ? 0 : Y;
    X = X >= maxLeft ? maxLeft : X;
    Y = Y >= maxTop ? maxTop : Y;
    // 放大镜位置改变
    move.style.display = 'block';
    move.style.left = X + 'px';
    move.style.top = Y + 'px';

    // 右侧显示图片图片位置改变
    var size = 100 * mul + '%';
    bigImg.style.display = 'block';
    bigImg.style.backgroundSize = size + ' ' + size;
    bigImg.style.backgroundPositionX = -(X * mul) + 'px';
    bigImg.style.backgroundPositionY = -(Y * mul) + 'px';
}

/**
 * 鼠标离开放大镜
 */
function shutBox() {
    move.style.display = 'none';
    bigImg.style.display = 'none';
}