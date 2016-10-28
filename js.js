/**
 * Created by super-w on 2016/8/29.
 */
(function(){
    var oBox=document.getElementById('box');
    var oBoxInner=oBox.getElementsByTagName('div')[0];
    var aDiv=oBoxInner.getElementsByTagName('div');
    var aImg=oBoxInner.getElementsByTagName('img');
    var oUl=oBox.getElementsByTagName('ul')[0];
    var aLi=oUl.getElementsByTagName('li');
    var oBtnLeft=oBox.getElementsByTagName('a')[0];
    var oBtnRight=oBox.getElementsByTagName('a')[1];
    var timer=null;
    var data=null;
    var step=0;
    getData();
    function getData(){
        var xml=new XMLHttpRequest();
        xml.open('get','json/data.txt',false);
        xml.onreadystatechange=function(){
            if(xml.readyState===4 && /^2\d{2}$/.test(xml.status)){
                data=utils.jsonParse(xml.responseText)
            }
        };
        xml.send();
    }
    bind();
    function bind(){
        var strDiv='';
        var strLi='';
        for(var i=0;i<data.length;i++){
            strDiv+='<div><img realImg="'+data[i].imgSrc+'" alt=""></div>'
            strLi+=i===0?'<li class="on"></li>':'<li></li>'
        }
        oBoxInner.innerHTML+=strDiv;
        oUl.innerHTML+=strLi;
    }
    lazyImg();
    function lazyImg(){
        for(var i=0;i<aImg.length;i++){
            (function(index){
                var curImg=aImg[index];
                var tmpImg=new Image;
                tmpImg.src=curImg.getAttribute('realImg');
                tmpImg.onload=function(){
                    curImg.src=this.src;
                    var oDiv1=aDiv[0];
                    utils.css(oDiv1,'zIndex',1);
                    animate(oDiv1,{opacity:1},1200)
                }
            })(i)

        }
    }
    clearInterval(timer);
    timer=setInterval(autoMove,5000);
    function autoMove(){
        if(step>=aDiv.length-1){
            step=-1
        }
        step++;
        setBanner();

    }
    function setBanner(){
        for(var i=0;i<aDiv.length;i++){
            if(i===step){
                utils.css(aDiv[i],'zIndex',1);
                animate(aDiv[i],{opacity:1},1200,function(){
                    var siblings=utils.siblings(this);
                    for(var i=0;i<siblings.length;i++){
                        animate(siblings[i],{opacity:0})
                    }
                });
                continue;
            }
            utils.css(aDiv[i],'zIndex',0)
        }
        bannerTip();

    }
    function bannerTip(){
        for(var i=0;i<aLi.length;i++){
            aLi[i].className=i===step?'on':null
        }
    }

    oBox.onmouseover=function(){
        clearInterval(timer);
    };
    oBox.onmouseout=function(){
        timer=setInterval(autoMove,5000);
    };

    handleChange();
    function handleChange(){
        for(var i=0;i<aLi.length;i++){
            aLi[i].index=i;
            aLi[i].onclick=function(){
                step=this.index
                setBanner();
            }
        }
    }
    oBtnRight.onclick=autoMove;
    oBtnLeft.onclick=function(){
        if(step<=0){
            step=aLi.length;
        }
        step--;
        setBanner();
    }


})();
enter();
function enter(){
    var oEnter=document.getElementById('m-enterd');
    var sBox=document.getElementById('msbox');
    oEnter.onmouseover=function (){
        sBox.style.display='block';
    };
    oEnter.onmouseout=function (){
        sBox.style.display='none';
    };
}
var oTop=document.getElementById('top');
window.onscroll=computedDisplay;
function computedDisplay(){
    if(utils.win('scrollTop')>(20)){
        oTop.style.display='block';
    }else{
        oTop.style.display='none';
    }
}
oTop.onclick=function (){
    this.style.display='none';
    window.onscroll=computedDisplay;
    utils.win('scrollTop',0);
};
 var picB=document.getElementsByClassName('n-picb');
var oBegin=document.getElementsByClassName('n-begin');
picB.onmouseover=function (){
    oBegin.style.display='block';
};
picB.onmouseout=function (){
    oBegin.style.display='none';
};
var left=document.getElementById('left');
var playBar=document.getElementById('m-playbar');
left.onclick=function (){
    utils.setCss(position,{fixed:-53});
    playBar.style.position='fixed'
};