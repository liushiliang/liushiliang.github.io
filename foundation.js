function $(domStr){
		return document.querySelectorAll(domStr);
	}
function addEv(targetDom,eventStr,func){
	targetDom.addEventListener(eventStr,func,false);
}


window._ev={};
window._ev.VALUEOFSET=6;
window._ev.cnNum=["一","二","三","四","五","六","七","八","九","十"];
window._ev.creNum=function creNum(num){
	if(num<=10){
		return _ev.cnNum[num-1];
	}else if(num>=10 && num<20){
		return _ev.cnNum[9]+_ev.cnNum[num%10-1];
	}else if(num>=20 && num<100){
		var tailStr=(num%10===0)?"":_ev.cnNum[num%10-1];
		return _ev.cnNum[Number.parseInt(num/10)-1]+_ev.cnNum[9]+tailStr;
	}else if(num>=100){
		_ev.InfoBox.show("不支持大于100个月份的统计!");
		return null;
	}
};
	window._ev.InfoBox={//消息框
		WRAPPER_CAN_CLOSE:1	//wrapper是否可以关闭 0表示不可以关闭 1表示可以关闭
		,show:function show(infoStr){
			$(".info-box")[0].innerHTML=infoStr+"<span class='delete-info-box'>X</span>";
			$(".info-box")[0].className="info-box showed";
			$(".wrapper")[0].className="wrapper showed";
			setTimeout(function(){$(".info-box")[0].className+=" info-box-trans";},10);
			
			_ev.initialThings.bindEventForInfoBox();

			return _ev.InfoBox;
		},hideInfoBox:function hideInfoBox(){
			$(".info-box")[0].className="info-box info-box-trans";
			$(".wrapper")[0].className=(_ev.InfoBox.WRAPPER_CAN_CLOSE & 1)?"wrapper":"wrapper showed";
			
			return _ev.InfoBox;
		}
	}