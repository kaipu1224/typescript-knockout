/// <reference path="../../../src/jquery.d.ts" />
/// <reference path="../../../src/knockout.d.ts" />
/// <reference path="../../../src/underscore.browser.d.ts" />

module app {
	export class ModelView {
		// Database model
		db:DatabaseModel;
		// Header title
		titleText:knockout.koObservableString;
		// Hero list
		heroList:knockout.koObservableArrayBase;
		// Alive options
		aliveOptions:knockout.koObservableArrayBase;
		aliveValue:any;
		// Gender options
		genderOptions:knockout.koObservableArrayBase;
		genderValue:any;
		// Sort options
		sortOptions:knockout.koObservableArrayBase;
		sortValue:any;

		// Search result count
		resultCount:knockout.koObservable;
		// Search process
		search:any;
		// Sort process
		sort:any;

		constructor(title:string){
			var self = this;

			this.titleText = ko.observable(title);
			this.heroList = ko.observableArray();
			this.aliveOptions = ko.observableArray(["全て","生存","死亡"]);
			this.aliveValue = ko.observable("全て");
			this.genderOptions = ko.observableArray(["全て","男性","女性"]);
			this.genderValue = ko.observable("全て");
			this.sortOptions = ko.observableArray(["無し","名前(昇順)","名前(降順)","年齢(昇順)","年齢(降順)"]);
			this.sortValue = ko.observable("無し");
			this.search = ()=> this.searchData();
			this.sort = ()=> this.sortData();
			this.resultCount = ko.observable(0);
			this.resultCount = ko.computed(()=>{
				return this.heroList().length;
			});

			var loadStartFunc = function(){
				$("#loading").fadeIn();
				self.removeAll();
			};
			var loadEndFunc = function(data){
				$.each(data, function(i, row){
					var check = true;
					if(self.aliveValue() != "全て"){
						var aliveState = self.aliveValue() == "生存" ? "1":"0";
						if(row["alive"] != aliveState){
							check = false;
						}
					}
					if(self.genderValue() != "全て"){
						var genderState = self.genderValue() == "男性" ? "Male":"Female";
						if(row["gender"] != genderState){
							check = false;
						}
					}
					if(check){
						self.addHero(row);
					}
				});
				self.sortData();
				$("#loading").fadeOut();
			};

			this.db = new DatabaseModel(loadStartFunc, loadEndFunc);
			this.searchData();
		}

		private addHero(row){
			this.heroList.push(row);
		}

		private removeAll(){
			this.heroList.removeAll();
		}

		private searchData(){
			this.db.getHeroData();
		}

		private sortData(){
			var sort = this.sortValue();
			this.heroList.sort(function(a,b){
				if(sort == "名前(昇順)"){
					return a.name == b.name ? 0 : (a.name > b.name ? 1 : -1);
				}
				if(sort == "名前(降順)"){
					return a.name == b.name ? 0 : (a.name < b.name ? 1 : -1);
				}
				if(sort == "年齢(昇順)"){
					var age1 = a.age == "??" ? 99 : a.age;
					var age2 = b.age == "??" ? 99 : b.age;
					return age1 == age2 ? 0 : (age1 > age2 ? 1 : -1);
				}
				if(sort == "年齢(降順)"){
					var age1 = a.age == "??" ? 99 : a.age;
					var age2 = b.age == "??" ? 99 : b.age;
					return age1 == age2 ? 0 : (age1 < age2 ? 1 : -1);
				}
			});
		}
	}

	class DatabaseModel {
		// Indicator controll function
		loadStartFunc:any;
		loadEndFunc:any;

		mydata:any = [];

		// for debug
		debug:bool = false;

		constructor(loadStartFunc:any, loadEndFunc:any){
			this.loadStartFunc = loadStartFunc;
			this.loadEndFunc = loadEndFunc;
		}

		public getHeroData(){
			var self = this;
			this.loadStartFunc();
			if(this.debug){
				var data = [
{"id":"0" , "name":"小町 小吉(こまち しょうきち)"        , "alive":"1", "age":"42", "gender":"Male", "height":"187cm", "weight":"87kg" , "country":"日本", "mo1":"大雀蜂", "mo2":"", "like":"熱帯魚", "hate":"ゴキブリ", "desc":"本作の主人公。屈強な体格と逆立たてた黒髪といういでたちの大柄な青年。正義感が強く、争い事は好まない。15歳の時に奈々緒が義父から虐待を受けている最中に出くわし、助けようと素手で殴り殺したため少年刑務所へ入所させられる。出所後、奈々緒の後を追いバグズ手術を受ける。", "imgUrl":""},
{"id":"1" , "name":"秋田 奈々緒(あきた ななお)"          , "alive":"0", "age":"22", "gender":"Female", "height":"168cm", "weight":"54kg" , "country":"日本", "mo1":"蚕蛾", "mo2":"", "like":"", "hate":"", "desc":"Fカップ!", "imgUrl":""},
{"id":"2" , "name":"蛭間 一郎(ひるま いちろう)"          , "alive":"1", "age":"38", "gender":"Male"  , "height":"170cm", "weight":"87kg" , "country":"日本", "mo1":"ネムリユスリカ", "mo2":"", "like":"鍋料理・家族", "hate":"左記以外のほぼ全て", "desc":"肌が荒れ、醜い顔をしている。一見、肥満体のようだが、非常に屈強な肉体と強靭な精神力、更に優れた頭脳の持ち主。11人兄弟の長男であり、年の離れた幼い弟妹（弟6人、妹4人）を養うためにバグズ計画に参加した。病に臥した母の願いから一流大学を目指し、いじめも意に介さず勉学に励んだ結果、大学に受かるものの、なにかと自分を気にかけてくれた男性教師から女子生徒を妊娠させた事件のスケープゴートにされ、大学合格取り消しと退学処分を受けた。", "imgUrl":""},
{"id":"3" , "name":"本多 晃(ほんだ こう)"                , "alive":"1", "age":"??", "gender":"Male"  , "height":"(不明)", "weight":"(不明)" , "country":"日本", "mo1":"", "mo2":"", "like":"", "hate":"", "desc":"aaaaa", "imgUrl":""},
{"id":"4" , "name":"ドナテロ・K・デイヴス"               , "alive":"0", "age":"30", "gender":"Male"  , "height":"188cm", "weight":"90kg" , "country":"アメリカ合衆国", "mo1":"パラポネラ", "mo2":"", "like":"ニール・アームストロング", "hate":"納豆", "desc":"宇宙飛行士を目指していたが、母親には事故死したと聞かされていた父親[5]が実際は過去にU-NASAへ反逆して死刑になっており、その道を閉ざされる。その後、「参加すれば宇宙へ行ける」バグズ計画に参加した。乗組員全員の事情と能力を一応把握しており、乗組員の中で唯一、バグズ1号が知的生命体により攻撃を受けた可能性があることを伝えられていた。薬の使用により両腕が異常に太く発達する。腕力、耐久力はテラフォーマー以上であり、怪力を活かしてて戦う。バグズ2号艦内へ自ら数多くのテラフォーマーを引き付け、味方に酸素を遮断させて殲滅する。酸欠で意識不明になり倒れていた所を、ウッドの裏切りにより銃殺される。オールバック風の髪型に顎鬚を蓄えている。", "imgUrl":""},
{"id":"5" , "name":"張 明明(チョウ ミンミン)"            , "alive":"0", "age":"27", "gender":"Male"  , "height":"170cm", "weight":"56kg" , "country":"中国", "mo1":"カマキリの一種", "mo2":"", "like":"ドラえもん", "hate":"トイレの汚い店", "desc":"Dカップ", "imgUrl":""}
				];
				//var sortedData = _.chain(data).sortBy(function(item){return item.alive;}).value();
				//var sendData = _.where(data, {"alive":params["alive"]});
				this.loadEndFunc(data);
			}else{
				if(self.mydata.length == 0){
					$.get("js/heros.json", (data)=>{
						self.mydata = $.parseJSON(data);
						this.loadEndFunc(self.mydata);
					});
				}else{
					this.loadEndFunc(self.mydata);
				}
			}
		}
	}
}


$(function(){
	var title = "TERRA FORMARS"
	$("#loading").hide();

	ko.applyBindings(new app.ModelView(title));
});