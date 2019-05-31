
	window._ev.RowEvent={
		RowLen:10,
		RowStatus:1,//1:增加状态 0:删除状态
		addRowBtnClick:function addRowBtnClick(){
			//修改按钮颜色
			if(_ev.RowEvent.RowStatus===1){
				$(".add-row-btn")[0].parentNode.className="data_title_li_sp";
				_ev.RowEvent.showDelBtn();
				_ev.RowEvent.RowStatus=0;
			}else{
				$(".add-row-btn")[0].parentNode.className="data_title_li_sp2";
				_ev.RowEvent.showAddBtn();
				_ev.RowEvent.RowStatus=1;
			}
		},showAddBtn:function showAddBtn(){
			$(".data_ul").forEach(function(item){
				item.querySelectorAll(".data_li_add")[0].className="data_li_add showed";
				item.querySelectorAll(".data_li_del")[0].className="data_li_del";
			});
		},showDelBtn:function showDelBtn(){
			$(".data_ul").forEach(function(item){
				item.querySelectorAll(".data_li_add")[0].className="data_li_add";
				item.querySelectorAll(".data_li_del")[0].className="data_li_del  showed";
			});
		},refreshRowIdForBtn:function refreshRowIdForBtn(){	//刷新按钮的colid属性
			$(".data_ul").forEach(function(item,index){
				item.querySelectorAll(".data_li_del")[0].setAttribute("rowid",index+1);
				item.querySelectorAll(".data_li_add")[0].setAttribute("rowid",index+1);
			});
			return _ev.RowEvent;
		},refreshRowIdForData:function refreshRowIdForData(){//刷新每行数据的rowid属性
			$(".data_ul").forEach(function(it,id){
				it.setAttribute("rowid",id+1);
			});
			return _ev.RowEvent;
		},addEvent:function addEvent(){
			$(".left-block")[0].insertBefore(_ev.ColEvent.createNewDataLi("mouth-bar",[],"<div class=\"mouth-bar-item\">第"+_ev.creNum(_ev.RowEvent.RowLen+1)+"个月</div>"),$(".mouth-bar")[$(".mouth-bar").length-1]);

			var ul=document.createElement("ul");
			ul.className="data_ul clearfloat";
			ul.innerHTML="";
			for(var i=0;i<_ev.ColEvent.colLen;i++){
				ul.innerHTML+="<li class=\"data_li\" contenteditable=\"true\"></li>";
			}
			ul.innerHTML+="<li class=\"data_li_del\" >-</li>"+
					"<li class=\"data_li_add showed\" >+</li>";
			this.parentNode.parentNode.insertBefore(ul,this.parentNode);

			_ev.initialThings.bindEventForRowBtn();

			_ev.RowEvent.RowLen++;
			_ev.RowEvent.refreshRowIdForData().refreshRowIdForBtn();
			_ev.ColEvent.refreshColIdForData().refreshColIdForBtn();
		},delEvent:function delEvent(){
			if(_ev.RowEvent.RowLen===1){
				_ev.InfoBox.show("月份个数不得小于1！");
				return;
			}
			this.parentNode.parentNode.removeChild(this.parentNode);
			$(".mouth-bar")[0].parentNode.removeChild($(".mouth-bar")[$(".mouth-bar").length-2]);
			_ev.RowEvent.RowLen--;
			_ev.RowEvent.refreshRowIdForData().refreshRowIdForBtn();
		}
	};
