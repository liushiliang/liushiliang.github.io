//列事件对象
	window._ev.ColEvent={//关于列数的事件
		colStatus:1,//0为删除状态 1为增加状态
		colLen:6,
		addColBtnClick:function addColBtnClick(){
			//修改按钮颜色
			if(_ev.ColEvent.colStatus===1){
				$(".add-col-btn")[0].parentNode.className="mouth-bar-item mouth-bar-item-sp";
				_ev.ColEvent.showDelBtn();
				_ev.ColEvent.colStatus=0;
			}else{
				$(".add-col-btn")[0].parentNode.className="mouth-bar-item mouth-bar-item-sp2";
				_ev.ColEvent.showAddBtn();
				_ev.ColEvent.colStatus=1;
			}
		},showDelBtn:function showDelBtn(){
			$(".col_add_btns")[0].className="col_add_btns clearfloat";
			$(".col_del_btns")[0].className="col_del_btns clearfloat showed";
		},showAddBtn:function showAddBtn(){
			$(".col_add_btns")[0].className="col_add_btns clearfloat showed";
			$(".col_del_btns")[0].className="col_del_btns clearfloat";
		},delEvent:function delEvent(){
			if(_ev.ColEvent.colLen===1){
				_ev.InfoBox.show("最后一列不可删除！");
				return ;
			}	
			var colid=this.getAttribute("colid");
	
			$(".data_ul").forEach(function(item,index){ //删除数据
				item.querySelectorAll(".data_li").forEach(function(it,id){
					if(it.getAttribute("colid")===colid){
						item.removeChild(it);
					}
				})
			});
			//删除按钮
			$(".col_del_btn_item").forEach(function(it){
				if(it.getAttribute("colid")===colid){
					it.parentNode.removeChild(it);
				}
			});
			$(".col_add_btn_item").forEach(function(it){
				if(it.getAttribute("colid")===colid){
					it.parentNode.removeChild(it);
				}
			});

			//删除最后一个电缆头标题
			var last_data_title_li;
			$(".data_title_li").forEach(function(i){
				last_data_title_li=i;
			});
			last_data_title_li.parentNode.removeChild(last_data_title_li);

			_ev.ColEvent.refreshColIdForBtn();
			_ev.ColEvent.refreshColIdForData();

			//记录colLen
			_ev.ColEvent.colLen--;
		},addEvent:function addEvent(){
			if(_ev.ColEvent.colLen===8){
				_ev.InfoBox.show("测试列数大于8的功能正在测试中！");
				
				return ;
			}
			var colid=this.getAttribute("colid");
			$(".data_ul").forEach(function(item){
				item.querySelectorAll(".data_li").forEach(function(it){
					if(colid===it.getAttribute("colid")){
						item.insertBefore(_ev.ColEvent.createNewDataLi(),it);
					}
				});
				if(_ev.ColEvent.colLen<colid){
					item.insertBefore(_ev.ColEvent.createNewDataLi(),item.childNodes[item.childNodes.length-3]);
				}
			});
			
			$(".add-row-btn")[0].parentNode.parentNode.insertBefore(_ev.ColEvent.createNewDataLi("data_title_li",[],"电缆头"+(_ev.ColEvent.colLen+1)),$(".add-row-btn")[0].parentNode);

			$(".col_del_btns")[0].appendChild(_ev.ColEvent.createNewDataLi("col_del_btn_item",[],"-",[{ev:"click",func:_ev.ColEvent.delEvent}]));
			$(".col_add_btns")[0].appendChild(_ev.ColEvent.createNewDataLi("col_add_btn_item",[],"+",[{ev:"click",func:_ev.ColEvent.addEvent}]));

			_ev.ColEvent.refreshColIdForBtn();
			_ev.ColEvent.refreshColIdForData();

			_ev.ColEvent.colLen++;
		},refreshColIdForBtn:function refreshColIdForBtn(){	//刷新按钮的colid属性
			$(".col_del_btn_item").forEach(function(it,id){
				it.setAttribute("colid",id+1);
			});
			$(".col_add_btn_item").forEach(function(it,id){
				it.setAttribute("colid",id+1);
			});

			return _ev.ColEvent;
		},refreshColIdForData:function refreshColIdForData(){//刷新每列数据的colid属性
			$(".data_ul").forEach(function(it,id){
				it.querySelectorAll(".data_li").forEach(function(item,index){
					item.setAttribute("colid",index+1);
				});
			});
			return _ev.ColEvent;
		},
		/*
			@param arguments[0] className String
			@param arguments[1] attributes Array[object]
					[{nam:"contenteditable",val:"true"},{...},{...}....]
			@param arguments[2] innerStr String
			@param arguments[3] bindedEvent Array[object]
					[{ev:"click",func:ClickEvent},{...},{...}....]
		*/
		createNewDataLi:function createNewDataLi(){
			var newLi=document.createElement("li");
			if(Object.prototype.toString.call(arguments[0])==="[object String]"){
				newLi.className=arguments[0];
				arguments[1].forEach(function(it){
					newLi.setAttribute(it.nam,it.val);
				});
			}else{	
				newLi.className="data_li";
				newLi.setAttribute("contenteditable","true");			
			}

			if(Object.prototype.toString.call(arguments[2])==="[object String]" || typeof arguments[2] === "number"){	//内含参数
				newLi.innerHTML=arguments[2];
			}

			if(Object.prototype.toString.call(arguments[3])==="[object Array]"){//绑定事件列表
				arguments[3].forEach(function(it){
					addEv(newLi,it.ev,it.func);
				});
			}

			return newLi;
		}
	};
