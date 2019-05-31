	window._ev.TaskEvent={
		CURTASKID:0,
		TASKLEN:1,
		task:[{ttl:"数据1",taskid:0,dataSet:[[13,12,14,16,13,50],[13,13,13,13,13,13],[16,16,16,16,16,16],[15,16,16,15,16,15],[20,17,13,20,16,15],[25,15,16,20,19,14],[30,14,17,20,13,15],[35,16,16,24,16,18],[35,17,20,25,17,15],[50,16,16,21,16,20]],colLen:6,rowLen:10}],
		ClickForTaskBtn:function ClickForTaskBtn(){
			$(".task-li").forEach(function(item,index){
				item.className="task-li";
			});

			this.className+=" task-li-selected";

			_ev.TaskEvent.fillData(this.getAttribute("taskid")-1);
			_ev.TaskEvent.CURTASKID=this.getAttribute("taskid")-1;

			//_ev.TaskEvent.createNewTask();
		},
		/*
			@param taskId Number [如果taskId值等于-1则为自定义模式]
			-------------------------------------------------------
			非自定义模式则为填充已有数据
			自定义模式主要目的是形成固定行列 再将各个数据格清空
				-----------------------------------------------
				自定义模式额外参数
				@param arguments[1] -> colLen Number
				@param arguments[2] -> rowLen Number
		*/
		fillData:function fillData(taskId){	//JS里的taskid从0开始  而dom属性里的taskid从1开始
			
			//---delete dom

			$(".right-block .data_ul").forEach(function (item,index){
				$(".right-block")[0].removeChild(item);
			});

			$(".data_title_li").forEach(function(item,index){
				item.parentNode.removeChild(item);
			});
			
			$(".mouth-bar").forEach(function(item,index){
				if(item.innerHTML.indexOf("月")>-1){
					item.parentNode.removeChild(item);
				}
			});

			$(".col_del_btns")[0].innerHTML="";
			$(".col_add_btns")[0].innerHTML="";

			//clear flags
			_ev.ColEvent.colLen=0;
			_ev.RowEvent.RowLen=0;

			//--create new Dom
				//创建列标签
			for(var j=0;j<((taskId===-1)?arguments[1]:_ev.TaskEvent.task[taskId].colLen);j++){
				_ev.ColEvent.colLen++;
				$(".add-row-btn")[0].parentNode.parentNode.insertBefore(_ev.ColEvent.createNewDataLi("data_title_li",[],"电缆头"+(_ev.ColEvent.colLen)),$(".add-row-btn")[0].parentNode);
					$(".col_del_btns")[0].appendChild(_ev.ColEvent.createNewDataLi("col_del_btn_item",[],"-",[{ev:"click",func:_ev.ColEvent.delEvent}]));
					$(".col_add_btns")[0].appendChild(_ev.ColEvent.createNewDataLi("col_add_btn_item",[],"+",[{ev:"click",func:_ev.ColEvent.addEvent}]));
			}

			//多一个列增加的按钮
			$(".col_add_btns")[0].appendChild(_ev.ColEvent.createNewDataLi("col_add_btn_item",[],"+",[{ev:"click",func:_ev.ColEvent.addEvent}]));
			
				//创建月份标签
			for(var i=0;i<((taskId===-1)?arguments[2]:_ev.TaskEvent.task[taskId].rowLen);i++){
				_ev.RowEvent.RowLen++;
				$(".left-block")[0].insertBefore(_ev.ColEvent.createNewDataLi("mouth-bar",[],"<div class=\"mouth-bar-item\">第"+_ev.creNum(_ev.RowEvent.RowLen)+"个月</div>"),$(".mouth-bar")[$(".mouth-bar").length-1]);
			}

				//--创建数据格
			for(var j=0;j<((taskId===-1)?arguments[2]:_ev.TaskEvent.task[taskId].rowLen);j++){
				var ul=document.createElement("ul");
				ul.className="data_ul clearfloat";
				for(var i=0;i<((taskId===-1)?arguments[1]:_ev.TaskEvent.task[taskId].colLen);i++){
					console.log();
					ul.appendChild(_ev.ColEvent.createNewDataLi("data_li",[{nam:"contenteditable",val:"true"}],(taskId===-1)?"":
						(Object.prototype.toString.call(_ev.TaskEvent.task[taskId].dataSet[j][i])==="[object Null]")?"":_ev.TaskEvent.task[taskId].dataSet[j][i]));
				}
				ul.appendChild(_ev.ColEvent.createNewDataLi("data_li_del",[],"-",[{ev:"click",func:_ev.RowEvent.delEvent}]));
				ul.appendChild(_ev.ColEvent.createNewDataLi("data_li_add showed",[],"+",[{ev:"click",func:_ev.RowEvent.addEvent}]));

				$(".right-block")[0].insertBefore(ul,$(".col_del_btns")[0]);
			}

			if($(".data_title_ul")[0].innerHTML.indexOf("data_title_li_sp2")===-1){
				$(".data_title_li_sp")[0].className="data_title_li_sp2";
			}

			_ev.ColEvent.refreshColIdForBtn();
			_ev.ColEvent.refreshColIdForData();
			_ev.RowEvent.refreshRowIdForBtn();
			_ev.RowEvent.refreshRowIdForData();

			//_ev.TaskEvent.CURTASKID=0;

		},clickForTableSetBtn:function clickForTableSetBtn(){
			
			_ev.TaskEvent.fillData(-1,Number.parseInt($(".col-num")[0].innerHTML),Number.parseInt($(".row-num")[0].innerHTML));	//填充数据格
			_ev.ColEvent.colLen=Number.parseInt($(".col-num")[0].innerHTML);
			_ev.RowEvent.RowLen=Number.parseInt($(".row-num")[0].innerHTML);
			//修正行列信息

			_ev.TaskEvent.createNewTask();	//创建新的task

			_ev.TaskEvent.hideRowColTable();	//隐藏设置面板

		},ClickForAddTaskBtn:function ClickForAddTaskBtn(){

			_ev.TaskEvent.showRowColTable();
		
		},showRowColTable:function showRowColTable(){
		
			$(".wrapper")[0].className="wrapper showed";
			$(".rowcol-table")[0].className="rowcol-table showed";
		
		},hideRowColTable:function hideRowColTable(){
		
			$(".rowcol-table")[0].className="rowcol-table";
			$(".wrapper")[0].className="wrapper";
			_ev.InfoBox.WRAPPER_CAN_CLOSE=1;
		
		},FocusForColNumBtn:function FocusForColNumBtn(){
		
			if(this.innerHTML==="6"){
				this.innerHTML="";				
			}
		
		},FocusForRowNumBtn:function FocusForRowNumBtn(){
			if(this.innerHTML==="10"){
				this.innerHTML="";				
			}
		},BlurForColNumBtn:function BlurForColNumBtn(){
			if(this.innerHTML.trim()==="" || !/^[1-9]+[0-9]*$/.test(this.innerHTML)){
				this.innerHTML=6;
				return;
			}

			if(Number.parseInt(this.innerHTML)<1 || Number.parseInt(this.innerHTML)>8){
				_ev.InfoBox.WRAPPER_CAN_CLOSE=0;
				_ev.InfoBox.show("目前只支持1~8列的测定");
				this.innerHTML=6;
			}
		},BlurForRowNumBtn:function BlurForRowNumBtn(){
			if(this.innerHTML.trim()==="" || !/^[1-9]+[0-9]*$/.test(this.innerHTML)){
				this.innerHTML=10;
				return;
			}

			if(Number.parseInt(this.innerHTML)<1){
				_ev.InfoBox.WRAPPER_CAN_CLOSE=0;
				_ev.InfoBox.show("行数不能小于1");
				this.innerHTML=1;
			}else if(Number.parseInt(this.innerHTML)>=100){
				_ev.InfoBox.WRAPPER_CAN_CLOSE=0;
				_ev.InfoBox.show("行数不能大于等于100");
				this.innerHTML=99;
			}
		},keyDownForNumBtn:function keyDownForNumBtn(e){
			//var caret=document.getSelection();
			if(this.innerHTML.length>=2){
				this.innerHTML="";
			}
		},ClickForCloseTableBtn:function ClickForCloseTableBtn(){
			_ev.TaskEvent.hideRowColTable();
		},createNewTask:function createNewTask(){		
			$(".task-li").forEach(function(item,index){
				item.className="task-li";
			});

			$(".task-ul")[0].insertBefore(_ev.ColEvent.createNewDataLi("task-li task-li-selected",[{nam:"taskid",val:_ev.TaskEvent.TASKLEN+1}],"数据"+(_ev.TaskEvent.TASKLEN+1),[{ev:"click",func:_ev.TaskEvent.ClickForTaskBtn}]),$(".add-task-li")[0]);

			var newTask={};
			newTask.taskid=_ev.TaskEvent.TASKLEN;
			newTask.colLen=_ev.ColEvent.colLen;
			newTask.rowLen=_ev.RowEvent.RowLen;
			newTask.ttl="数据"+(_ev.TaskEvent.TASKLEN+1);
			newTask.dataSet=_ev.TaskEvent.collectData();

			_ev.TaskEvent.task.push(newTask);

			_ev.TaskEvent.TASKLEN++;
			_ev.TaskEvent.CURTASKID=_ev.TaskEvent.TASKLEN-1;

			_ev.TaskEvent.refreshVMToLS();
			
		},refreshVMToLS:function refreshVMToLS(){	//将虚拟环境下的数据转到LS
		
			localStorage.setItem("data_len",_ev.TaskEvent.TASKLEN);
			localStorage.setItem("data_set",JSON.stringify(_ev.TaskEvent.task));

		},refreshLSToVM:function refreshLSToVM(){ //将LS内的数据转到虚拟环境

			_ev.TaskEvent.TASKLEN=Number.parseInt(localStorage.getItem("data_len"));
			_ev.TaskEvent.task=JSON.parse(localStorage.getItem("data_set"));

		},saveData:function saveData(taskId){	//保存数据至虚拟环境
			
			if(taskId===-1){//taskId如果为1 则表明保存当前taskid的数据
				taskId=_ev.TaskEvent.CURTASKID;
			}
			_ev.TaskEvent.task.forEach(function(it,id){
				if(it.taskid===taskId){
					it.dataSet=_ev.TaskEvent.collectData();
					it.colLen=_ev.ColEvent.colLen;
					it.rowLen=_ev.RowEvent.RowLen;
				}
			});

			_ev.TaskEvent.refreshVMToLS();

		},collectData:function collectData(){	//收集dataSet数据
			var dataArr=new Array();

			for(var i=0;i<_ev.RowEvent.RowLen;i++){
				var dataPerRow=new Array();
				for(var j=0;j<_ev.ColEvent.colLen;j++){
					if(Object.prototype.toString.call($(".data_ul")[i].querySelectorAll(".data_li")[j].innerHTML)==="[object Null]" || $(".data_ul")[i].querySelectorAll(".data_li")[j].innerHTML.trim()===""){
						dataPerRow.push(null);
						console.log("null now!");
						continue;
					}
					dataPerRow.push(Number.parseInt($(".data_ul")[i].querySelectorAll(".data_li")[j].innerHTML));
				}
				dataArr.push(dataPerRow);
			}
			return dataArr;
		},initialTask:function initialTask(){	//开启页面时初始化数据

			if(!_ev.TaskEvent.isFirstInitial()){		//是否第一次初始化LS数据
				_ev.TaskEvent.refreshLSToVM();			//将LS内数据初始化入VM中
			}

			_ev.TaskEvent.showTaskList();	//显示数据

		},isFirstInitial:function isFirstInitial(){	//第一次初始化
			if(!localStorage.getItem("data_initial")){
				
				localStorage.setItem("data_initial",1);
				localStorage.setItem("data_len",_ev.TaskEvent.TASKLEN);
				localStorage.setItem("data_set",JSON.stringify(_ev.TaskEvent.task));

				return true;
			}else{
				return false;
			}
		},showTaskList:function showTaskList(){	//展示任务栏

			$(".task-li").forEach(function(item,index){ //情况任务栏
				$(".task-ul")[0].removeChild(item);
			});

			for(var i=0;i<_ev.TaskEvent.TASKLEN;i++){	//初始化任务栏
				$(".task-ul")[0].insertBefore(_ev.ColEvent.createNewDataLi("task-li",[{nam:"taskid",val:i+1}],_ev.TaskEvent.task[i].ttl),$(".add-task-li")[0],[{ev:"click",func:_ev.TaskEvent.ClickForTaskBtn}]);
			}

			//页面初始化先使用第一个数据
			$(".task-li")[0].className+=" task-li-selected";

			_ev.TaskEvent.fillData(0);
		}
	};