	
	window._ev.CalcEvent={
		dataSet:[],
		initDataset:function initDataset(){
			_ev.CalcEvent.dataSet=[];
			$(".data_ul").forEach(function(item,index){
				var dataSetPerRow=new Array();
				item.querySelectorAll(".data_li").forEach(function(it,id){
					dataSetPerRow.push(Number.parseInt(it.innerHTML));
				});
				_ev.CalcEvent.dataSet.push(dataSetPerRow);
			});
			
			return true;
		},
		ClickForBeginBtn:function ClickForBeginBtn(){

			if(_ev.CalcEvent.checkDataAvailable()){
				_ev.CalcEvent.initDataset()&&_ev.CalcEvent.getErrorData();
			}
		},checkDataAvailable:function checkDataAvailable(){
			var status=1;
			$(".data_ul").forEach(function(item,index){
				item.querySelectorAll(".data_li").forEach(function(it,id){
					if(!/^[1-9]+[0-9]*$/.test(it.innerHTML)){
						_ev.InfoBox.show("含有非法字符或未填写项!");
						status=0;
					}
				});
			});
			if(status===1){
				return true;
			}else{
				return false;
			}
		},getErrorData:function getErrorData(){
			_ev.CalcEvent.getErrorFromROW().getErrorFromCol();
		},getErrorFromROW:function getErrorFromROW(){	//每行是否有数据错误
			$(".data_ul").forEach(function (item,index){
				var sum=0;
				item.querySelectorAll(".data_li").forEach(function (it,id){
					sum+=Number.parseInt(it.innerHTML);
				});
				sum/=_ev.ColEvent.colLen;
				item.querySelectorAll(".data_li").forEach(function (it,id){
					if(Number.parseInt(it.innerHTML)>sum+_ev.VALUEOFSET){
						it.className="data_li red-displayed";
					}
				});
			});

			return _ev.CalcEvent;
		},getErrorFromCol:function getErrorFromCol(){
			$(".data_ul").forEach(function(item,index){	//recover fillbox
				item.querySelectorAll(".data_li").forEach(function(it,id){
					it.className="data_li";
				});
			});
			var errArr=new Array();
			for(var i=0;i<_ev.ColEvent.colLen;i++){
				var sum=0;
				for(var j=0;j<_ev.RowEvent.RowLen;j++){
					sum+=_ev.CalcEvent.dataSet[j][i];
				}
				sum/=_ev.RowEvent.RowLen;

				for(var j=0;j<_ev.RowEvent.RowLen;j++){
					if(_ev.CalcEvent.dataSet[j][i]>sum+_ev.VALUEOFSET){
						if(errArr.indexOf(i+1)===-1){
							errArr.push(i+1);
						}
						if($(".data_ul")[j].querySelectorAll(".data_li")[i].className.indexOf("red-displayed")!=-1){
							$(".data_ul")[j].querySelectorAll(".data_li")[i].className="data_li  yellow-displayed";
						}else{
							$(".data_ul")[j].querySelectorAll(".data_li")[i].className="data_li  pink-displayed";
						}
					}
				}
			}
			if(errArr.length!==0){
				_ev.InfoBox.show("电缆头"+errArr.join("、电缆头")+"出现故障！");
			}
			return _ev.CalcEvent;			
		},clearData:function clearData(){
			$(".data_ul").forEach(function(item,index){
				item.querySelectorAll(".data_li").forEach(function(it,id){
					it.innerHTML="";
					it.className="data_li";
					if(!it.getAttribute("title")!==null){
						it.removeAttribute("title");
					}
				});
			});
		},compareNow:function compareNow(){
			$(".data_ul").forEach(function(item,index){
				item.querySelectorAll(".data_li").forEach(function(it,id){
					it.className="data_li";
					if(!it.getAttribute("title")!==null){
						it.removeAttribute("title");
					}
				});
			});

			$(".data_ul").forEach(function(item,index){
				item.querySelectorAll(".data_li").forEach(function(it,id){

					if(Number.parseInt(it.innerHTML)<=20){
						it.className+=" outlined-lime";
						it.setAttribute("title","判断：未发现明显的放电现象，措施：每1个月测试一次");
					}else if(Number.parseInt(it.innerHTML)<=30 && Number.parseInt(it.innerHTML)>25){
						it.className+=" outlined-blue";
						it.setAttribute("title","判断：检测到一定程度的放电现象，措施：缩短检测周期，有条件的做相关的检查");
					}else if(Number.parseInt(it.innerHTML)<=40 && Number.parseInt(it.innerHTML)>30){
						it.className+=" outlined-yellow";
						it.setAttribute("title","判断：检测到较强的放点现象，措施：跟踪测试，有条件的做相关检查");
					}else if(Number.parseInt(it.innerHTML)>40){
						it.className+=" outlined-white";
						it.setAttribute("title","判断：检测到强烈的放电现象，措施：与常规预试方法相比较");
					}
				});
			});
		}

	};
