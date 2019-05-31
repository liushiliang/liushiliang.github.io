	//关于初始化的工具对象
	window._ev.initialThings={
		bind:function bind(){	//绑定事务处理
			_ev.initialThings.bindEventForColBtn();
			_ev.initialThings.bindEventForInfoBox();
			_ev.initialThings.bindEventForRowBtn();
			_ev.initialThings.bindEventForCalcBtn();
			_ev.initialThings.bindEventForTaskBtn();
		},initial:function initial(){//初始化
			//初始化
			_ev.initialThings.initialData();
			_ev.initialThings.bind();
		
		},initialData:function initialData(){//初始化数据
			
			_ev.ColEvent.refreshColIdForData();
			_ev.ColEvent.refreshColIdForBtn();
			_ev.TaskEvent.initialTask();

		},bindEventForColBtn:function bindEventForColBtn(){
			addEv($(".add-col-btn")[0],"click",_ev.ColEvent.addColBtnClick);
			$(".col_add_btn_item").forEach(function(item,index){
				addEv(item,"click",_ev.ColEvent.addEvent);
			});
			$(".col_del_btn_item").forEach(function(item,index){
				addEv(item,"click",_ev.ColEvent.delEvent);
			});
		},bindEventForInfoBox:function bindEventForInfoBox(){
			addEv($(".delete-info-box")[0],"click",_ev.InfoBox.hideInfoBox);
		},bindEventForRowBtn:function bindEventForRowBtn(){
			addEv($(".add-row-btn")[0],"click",_ev.RowEvent.addRowBtnClick);
			$(".data_ul").forEach(function(item,index){
				addEv(item.querySelectorAll(".data_li_del")[0],"click",_ev.RowEvent.delEvent);
			});
			$(".data_ul").forEach(function(item,index){
				addEv(item.querySelectorAll(".data_li_add")[0],"click",_ev.RowEvent.addEvent);
			});
		},bindEventForCalcBtn:function bindEventForCalcBtn(){
			addEv($(".begin-btn")[0],"click",_ev.CalcEvent.ClickForBeginBtn);
			addEv($(".clear-btn")[0],"click",_ev.CalcEvent.clearData);
			addEv($(".begin-compare-btn")[0],"click",_ev.CalcEvent.compareNow);
		},bindEventForTaskBtn:function bindEventForTaskBtn(){
			addEv($(".add-task-li")[0],"click",_ev.TaskEvent.ClickForAddTaskBtn);
			_ev.initialThings.bindEventForTaskBtn2();
			//输入框事件
			addEv($(".row-num")[0],"focus",_ev.TaskEvent.FocusForRowNumBtn);
			addEv($(".col-num")[0],"focus",_ev.TaskEvent.FocusForColNumBtn);
			addEv($(".row-num")[0],"blur",_ev.TaskEvent.BlurForRowNumBtn);
			addEv($(".col-num")[0],"blur",_ev.TaskEvent.BlurForColNumBtn);
			addEv($(".row-num")[0],"keydown",_ev.TaskEvent.keyDownForNumBtn);
			addEv($(".col-num")[0],"keydown",_ev.TaskEvent.keyDownForNumBtn);
			
			addEv($(".close-table-btn")[0],"click",_ev.TaskEvent.ClickForCloseTableBtn);
			addEv($(".table-set-btn")[0],"click",_ev.TaskEvent.clickForTableSetBtn);
			addEv($(".save-btn")[0],"click",(function(){
				return function(){
					_ev.TaskEvent.saveData(-1);
				};
			})());

			addEv($(".initial-btn")[0],"click",function(){
				localStorage.clear();
				var meta=document.createElement("meta");
				meta.setAttribute("http-equiv","Refresh");
				meta.setAttribute("content","0");
				$("head")[0].appendChild(meta);
			});
		},bindEventForTaskBtn2:function bindEventForTaskBtn2(){
			$(".task-li").forEach(function(item,index){
				addEv(item,"click",_ev.TaskEvent.ClickForTaskBtn);
			});
		}
	}


	window._ev.initial=window._ev.initialThings.initial;