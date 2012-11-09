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

		constructor(title:string){
			var self = this;

			this.titleText = ko.observable(title);
			this.heroList = ko.observableArray();

			var loadStartFunc = function(){
				$("#loading").fadeIn();
				self.removeAll();
			};
			var loadEndFunc = function(data){
				$("#loading").fadeOut();
				$.each(data, function(i, row){
					self.addHero(row);
				});
			};
			this.db = new DatabaseModel(loadStartFunc, loadEndFunc);
			this.db.getHeroData();
		}

		private addHero(row){
			this.heroList.push(row);
		}

		private removeAll(){
			this.heroList.removeAll();
		}
	}

	class DatabaseModel {
		// Indicator controll function
		loadStartFunc:any;
		loadEndFunc:any;

		// for debug
		debug:bool = true;

		constructor(loadStartFunc:any, loadEndFunc:any){
			this.loadStartFunc = loadStartFunc;
			this.loadEndFunc = loadEndFunc;
		}

		public getHeroData(){
			this.loadStartFunc();
			if(this.debug){
				var data = [
{"id":"0", "name":"小町 小吉(こまち しょうきち)"        , "alive":"1", "age":"22(第一部) 42?(第二部)", "gender":"Male", "height":"187cm", "weight":"87kg" , "country":"日本", "mo1":"大雀蜂", "mo2":"", "like":"熱帯魚", "hate":"ゴキブリ", "desc":"本作の主人公。屈強な体格と逆立たてた黒髪といういでたちの大柄な青年。正義感が強く、争い事は好まない。15歳の時に奈々緒が義父から虐待を受けている最中に出くわし、助けようと素手で殴り殺したため少年刑務所へ入所させられる。出所後、奈々緒の後を追いバグズ手術を受ける。", "imgUrl":""},
{"id":"1", "name":"秋田 奈々緒(あきた ななお)"          , "alive":"0", "age":"22", "gender":"Female", "height":"168cm", "weight":"54kg" , "country":"日本", "mo1":"蚕蛾", "mo2":"", "like":"", "hate":"", "desc":"Fカップ!", "imgUrl":""},
{"id":"2", "name":"蛭間 一郎(ひるま いちろう)"          , "alive":"1", "age":"18(第一部) 42?(第二部)", "gender":"Male"  , "height":"170cm", "weight":"87kg" , "country":"日本", "mo1":"ネムリユスリカ", "mo2":"", "like":"鍋料理・家族", "hate":"左記以外のほぼ全て", "desc":"肌が荒れ、醜い顔をしている。一見、肥満体のようだが、非常に屈強な肉体と強靭な精神力、更に優れた頭脳の持ち主。11人兄弟の長男であり、年の離れた幼い弟妹（弟6人、妹4人）を養うためにバグズ計画に参加した。病に臥した母の願いから一流大学を目指し、いじめも意に介さず勉学に励んだ結果、大学に受かるものの、なにかと自分を気にかけてくれた男性教師から女子生徒を妊娠させた事件のスケープゴートにされ、大学合格取り消しと退学処分を受けた。", "imgUrl":""},
{"id":"3", "name":"本多 晃(ほんだ こう)"                , "alive":"1", "age":"(不明)", "gender":"Male"  , "height":"(不明)", "weight":"(不明)" , "country":"日本", "mo1":"", "mo2":"", "like":"", "hate":"", "desc":"aaaaa", "imgUrl":""},
{"id":"4", "name":"ドナテロ・K・デイヴス"               , "alive":"0", "age":"30", "gender":"Male"  , "height":"188cm", "weight":"90kg" , "country":"アメリカ合衆国", "mo1":"パラポネラ", "mo2":"", "like":"ニール・アームストロング", "hate":"納豆", "desc":"宇宙飛行士を目指していたが、母親には事故死したと聞かされていた父親[5]が実際は過去にU-NASAへ反逆して死刑になっており、その道を閉ざされる。その後、「参加すれば宇宙へ行ける」バグズ計画に参加した。乗組員全員の事情と能力を一応把握しており、乗組員の中で唯一、バグズ1号が知的生命体により攻撃を受けた可能性があることを伝えられていた。薬の使用により両腕が異常に太く発達する。腕力、耐久力はテラフォーマー以上であり、怪力を活かしてて戦う。バグズ2号艦内へ自ら数多くのテラフォーマーを引き付け、味方に酸素を遮断させて殲滅する。酸欠で意識不明になり倒れていた所を、ウッドの裏切りにより銃殺される。オールバック風の髪型に顎鬚を蓄えている。", "imgUrl":""},
{"id":"5", "name":"張 明明(チョウ ミンミン)"            , "alive":"0", "age":"27", "gender":"Male"  , "height":"170cm", "weight":"56kg" , "country":"中国", "mo1":"カマキリの一種", "mo2":"", "like":"ドラえもん", "hate":"トイレの汚い店", "desc":"Dカップ", "imgUrl":""},
{"id":"6", "name":"ティン"                              , "alive":"0", "age":"21", "gender":"Male"  , "height":"179cm", "weight":"68kg" , "country":"タイ", "mo1":"サバクトビバッタ", "mo2":"", "like":"豆乳", "hate":"なし", "desc":"", "imgUrl":""},
{"id":"7", "name":"ヴィクトリア・ウッド"                , "alive":"0", "age":"19", "gender":"Female", "height":"159cm", "weight":"45kg" , "country":"日本", "mo1":"エメラルドゴキブリバチ", "mo2":"", "like":"ラグビー観戦", "hate":"何かベテランぶったオバサン", "desc":"Aカップ", "imgUrl":""},
{"id":"8", "name":"ゴッド・リー"                        , "alive":"1", "age":"26", "gender":"Male"  , "height":"180cm", "weight":"80kg" , "country":"イスラエル", "mo1":"ミイデラゴミムシ(ヘコキムシ)", "mo2":"", "like":"戦闘", "hate":"戦争", "desc":"面白ェ!!!", "imgUrl":""},
{"id":"9", "name":"マリア・ビレン"                      , "alive":"0", "age":"24", "gender":"Female", "height":"170cm", "weight":"56kg" , "country":"ロシア", "mo1":"ニジイロクワガタ", "mo2":"", "like":"絵を描くこと", "hate":"ミソスープ", "desc":"Gカップ", "imgUrl":""},
{"id":"10", "name":"トシオ・ブライト"                    , "alive":"0", "age":"22", "gender":"Male"  , "height":"170cm", "weight":"55kg" , "country":"イギリス", "mo1":"不明", "mo2":"", "like":"バクマン", "hate":"もち", "desc":"割れ顎", "imgUrl":""},
{"id":"11", "name":"ジャイナ・エイゼンシュテイン"        , "alive":"0", "age":"19", "gender":"Female", "height":"161cm", "weight":"49kg" , "country":"カザフスタン", "mo1":"クロカタゾウムシ", "mo2":"", "like":"野菜", "hate":"すごく大きいもの", "desc":"Cカップ", "imgUrl":""},
{"id":"12", "name":"ルドン・ブルグスミューラー"          , "alive":"0", "age":"26", "gender":"Male"  , "height":"170cm", "weight":"80kg" , "country":"アメリカ合衆国", "mo1":"不明", "mo2":"", "like":"日本のHENTAIゲーム", "hate":"普通のアダルトビデオ", "desc":"", "imgUrl":""},
{"id":"13", "name":"ジョーン・ウェルソーク"              , "alive":"0", "age":"24", "gender":"Male"  , "height":"180cm", "weight":"88kg" , "country":"オーストラリア", "mo1":"不明", "mo2":"", "like":"カイコガのフライ", "hate":"銀行", "desc":"", "imgUrl":""},
{"id":"14", "name":"陽 虎丸(ヤン フワン)"                , "alive":"0", "age":"24", "gender":"Male"  , "height":"180cm", "weight":"70kg" , "country":"中国", "mo1":"不明", "mo2":"", "like":"北斗の拳", "hate":"チャーハン", "desc":"男塾の彼ではない", "imgUrl":""},
{"id":"15", "name":"ミッシェル・K・デイヴス"             , "alive":"1", "age":"20", "gender":"Female", "height":"164cm", "weight":"85kg" , "country":"アメリカ合衆国", "mo1":"爆弾アリ", "mo2":"パラポネラ", "like":"", "hate":"", "desc":"", "imgUrl":""},
{"id":"16", "name":"アドルフ"                            , "alive":"1", "age":"??", "gender":"Male"  , "height":"???cm", "weight":"??kg" , "country":"ドイツ", "mo1":"???", "mo2":"", "like":"", "hate":"", "desc":"", "imgUrl":""},
{"id":"17", "name":"シルヴェスター・アシモフ"            , "alive":"1", "age":"51", "gender":"Male"  , "height":"190cm", "weight":"136kg" , "country":"ドイツ", "mo1":"タスマニアン・キング・クラブ", "mo2":"", "like":"", "hate":"", "desc":"マーズランキング 3位", "imgUrl":""},
{"id":"18", "name":"ジョセフ"                            , "alive":"1", "age":"??", "gender":"Male"  , "height":"???cm", "weight":"??kg" , "country":"???", "mo1":"???", "mo2":"", "like":"", "hate":"", "desc":"", "imgUrl":""},
{"id":"19", "name":"劉(りゅう)"                          , "alive":"1", "age":"??", "gender":"Male"  , "height":"???cm", "weight":"??kg" , "country":"???", "mo1":"???", "mo2":"", "like":"", "hate":"", "desc":"", "imgUrl":""},
{"id":"20", "name":"膝丸 燈(ひざまる あかり)"            , "alive":"1", "age":"??", "gender":"Male"  , "height":"???cm", "weight":"??kg" , "country":"???", "mo1":"???", "mo2":"", "like":"", "hate":"", "desc":"", "imgUrl":""},
{"id":"21", "name":"シーラ"                              , "alive":"1", "age":"??", "gender":"Female", "height":"???cm", "weight":"??kg" , "country":"???", "mo1":"???", "mo2":"", "like":"", "hate":"", "desc":"", "imgUrl":""},
{"id":"22", "name":"アレックス"                          , "alive":"1", "age":"??", "gender":"Male"  , "height":"???cm", "weight":"??kg" , "country":"???", "mo1":"???", "mo2":"", "like":"", "hate":"", "desc":"", "imgUrl":""},
{"id":"23", "name":"マルコス・エリングラッド・ガルシア"  , "alive":"1", "age":"??", "gender":"Male"  , "height":"???cm", "weight":"??kg" , "country":"???", "mo1":"???", "mo2":"", "like":"", "hate":"", "desc":"", "imgUrl":""},
{"id":"24", "name":"エヴァ"                              , "alive":"1", "age":"??", "gender":"Female", "height":"???cm", "weight":"??kg" , "country":"???", "mo1":"???", "mo2":"", "like":"", "hate":"", "desc":"", "imgUrl":""},
{"id":"25", "name":"エレナ"                              , "alive":"1", "age":"??", "gender":"Female", "height":"???cm", "weight":"??kg" , "country":"???", "mo1":"???", "mo2":"", "like":"", "hate":"", "desc":"", "imgUrl":""},
{"id":"26", "name":"イワン"                              , "alive":"1", "age":"??", "gender":"Male"  , "height":"???cm", "weight":"??kg" , "country":"???", "mo1":"???", "mo2":"", "like":"", "hate":"", "desc":"", "imgUrl":""},
{"id":"27", "name":"慶次(けいじ)"                        , "alive":"1", "age":"??", "gender":"Male"  , "height":"???cm", "weight":"??kg" , "country":"???", "mo1":"???", "mo2":"", "like":"", "hate":"", "desc":"", "imgUrl":""},
{"id":"28", "name":"蛭間 七星(ひるま しちせい)"          , "alive":"1", "age":"??", "gender":"Male"  , "height":"???cm", "weight":"??kg" , "country":"???", "mo1":"???", "mo2":"", "like":"", "hate":"", "desc":"", "imgUrl":""},
{"id":"29", "name":"百合子(ゆりこ)"                      , "alive":"0", "age":"??", "gender":"Female", "height":"???cm", "weight":"??kg" , "country":"???", "mo1":"???", "mo2":"", "like":"", "hate":"", "desc":"", "imgUrl":""},
{"id":"30", "name":"ブライアン・チャオミー"              , "alive":"0", "age":"14", "gender":"Male"  , "height":"251cm", "weight":"342kg", "country":"アメリカ合衆国", "mo1":"熊", "mo2":"", "like":"", "hate":"", "desc":"", "imgUrl":""},
{"id":"31", "name":"春風 桜人(はるかぜ さくらと)"        , "alive":"0", "age":"??", "gender":"Male"  , "height":"???cm", "weight":"??kg" , "country":"???", "mo1":"???", "mo2":"", "like":"", "hate":"", "desc":"", "imgUrl":""},
{"id":"32", "name":"ジョナサン・レッド"                  , "alive":"0", "age":"??", "gender":"Male"  , "height":"???cm", "weight":"??kg" , "country":"???", "mo1":"???", "mo2":"", "like":"", "hate":"", "desc":"", "imgUrl":""},
{"id":"33", "name":"ジョージ・スマイルズ"                , "alive":"0", "age":"??", "gender":"Male"  , "height":"???cm", "weight":"??kg" , "country":"???", "mo1":"???", "mo2":"", "like":"", "hate":"", "desc":"", "imgUrl":""},
{"id":"34", "name":"リサ・オイカワ"                      , "alive":"0", "age":"??", "gender":"Female", "height":"???cm", "weight":"??kg" , "country":"???", "mo1":"???", "mo2":"", "like":"", "hate":"", "desc":"", "imgUrl":""},
{"id":"35", "name":"ケント・ホーランド"                  , "alive":"0", "age":"??", "gender":"Male"  , "height":"???cm", "weight":"??kg" , "country":"???", "mo1":"???", "mo2":"", "like":"", "hate":"", "desc":"", "imgUrl":""},
{"id":"36", "name":"トーマス・ベルウッド"                , "alive":"0", "age":"??", "gender":"Male"  , "height":"???cm", "weight":"??kg" , "country":"???", "mo1":"???", "mo2":"", "like":"", "hate":"", "desc":"", "imgUrl":""},
{"id":"37", "name":"カルロス・ミネリー"                  , "alive":"0", "age":"??", "gender":"Male"  , "height":"???cm", "weight":"??kg" , "country":"???", "mo1":"???", "mo2":"", "like":"", "hate":"", "desc":"", "imgUrl":""},
{"id":"38", "name":"M･K･デイヴス"                        , "alive":"0", "age":"??", "gender":"Male"  , "height":"???cm", "weight":"??kg" , "country":"???", "mo1":"???", "mo2":"", "like":"", "hate":"", "desc":"", "imgUrl":""},
				];
				var sortedData = _.chain(data).sortBy(function(item){return item.alive;}).value();
				this.loadEndFunc(sortedData);
			}else{
				$.get("js/heros.json", (data)=>{
					this.loadEndFunc($.parseJSON(data));
				});
			}
		}
	}
}


$(function(){
	var title = "TERRA FORMARS"
	$("#loading").hide();

	ko.applyBindings(new app.ModelView(title));
});