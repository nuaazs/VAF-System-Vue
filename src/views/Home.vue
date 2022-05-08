<template>
  <div class="w">
    <div class="title">声纹识别系统</div>
    <div class="mainbody">
      <!-- <el-row type="flex" justify="center"> -->
      <!-- 底库列表盒子  -->
      <!-- <el-col :span="8"> -->
      <div id="left" class="box">
        <div class="diku" v-show="showli">
          <div class="dikutitle">示例数据</div>
          <ul>
            <li
              v-show="showli"
              class="lilis"
              :class="activeClass == index ? 'active' : ''"
              v-for="(item, index) in newVidbase"
              :key="index"
              @click="didi(index)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <ul>
          <li
            v-show="!showli"
            class="lilis"
            :class="activeClass == index ? 'active' : ''"
            v-for="(item, index) in newVidbase"
            :key="index"
            @click="tapcross(index)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <!-- </el-col
        ><el-col :span="8"> -->
      <div id="middle">
        <!-- 录音盒子 -->
        <div id="mid_top" class="box">
          <audio id="myAudio" class="video-js vjs-default-skin"></audio>
        </div>
        <div class="mid_mid">
          <el-button
            id="startbtn"
            ref="startbtn"
            @click="open"
            :disabled="startbtnClickable"
            >开始上传</el-button
          >
        </div>
        <!-- 分析结果  -->
        <div id="mid_bottom" class="box">
          <img id="loadImg" src="../assets/img/inLoad.gif" v-show="bu" />
          <div class="result_img" v-show="hao">
            <img src="../assets/img/dui.png" v-show="resultThan" /><img
              src="../assets/img/cuo.png"
              v-show="!resultThan"
            />
          </div>
          <div class="end_result">
            <p class="score" v-show="hao" :class="[resultThan ? same : unsame]">
              {{ resultThan ? "是同一个人" : "不是同一个人" }}
            </p>
          </div>
        </div>
      </div>
      <!-- </el-col
        > -->
      <!-- 文本盒子  -->
      <!-- <el-col :span="8"> -->
      <div id="right" class="box">
        <div class="text_title">
          <label id="changebtn" type="primary" @click="changeTxt()"
            >换一篇</label
          >
        </div>

        <!-- <img id="loadImg" src="../assets/img/inLoad.gif" v-show="bu" /><img
              v-bind:src="imgAdd"
              v-show="hao"
            /> -->
        <li>
          <p>{{ textArr[this.currentNum].name }}</p>
        </li>
      </div>
      <!-- </el-col
        ></el-row
      > -->
    </div>
    <div class="footer">
      <div class="content">
        版权所有© 2021 南京龙垣信息科技有限公司
        <a
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=2021036408 "
          >苏ICP备2021036408号</a
        >
      </div>
    </div>
    <!-- <div class="a" style="width:50px;heihgt:50px">AAAAAAAAAAAAAAA</div> -->
  </div>
</template>

<script>
import "../assets/css/scrollbar.css";
import "video.js/dist/video-js.min.css";
import videojs from "video.js";
import RecordRTC from "recordrtc";
import "videojs-record/dist/css/videojs.record.css";
// the following imports are only needed when you're recording
// audio-only using the videojs-wavesurfer plugin
import WaveSurfer from "wavesurfer.js";
import MicrophonePlugin from "wavesurfer.js/dist/plugin/wavesurfer.microphone.js";
import { dataReplace } from "../utils/dataReplace.js";
WaveSurfer.microphone = MicrophonePlugin;

// register videojs-wavesurfer plugin
import "videojs-wavesurfer/dist/css/videojs.wavesurfer.css";
import Wavesurfer from "videojs-wavesurfer/dist/videojs.wavesurfer.js";
import Record from "videojs-record/dist/videojs.record.js";

export default {
  // beforeDestroyRouter(to,form,next){
  //   document.querySelector('body').setAttribute('style','margin:0;padding:0')
  //   next()
  // },
  // beforeRouteLeave(to,form,next){
  //   document.querySelector('body').setAttribute('style','')
  //   next()
  // },
  name: "Home",
  data() {
    return {
      secretgroup: [], //私密手机号数组
      showli: true,
      textArr: [
        {
          id: 0,
          name: "百年风雨，百年奋斗。中国共产党一经成立就把共产主义镌刻在自己的旗帜上，从那时起，党领导人民进行了波澜壮阔的伟大社会革命。人类从来没有停止过对于美好生活的追求，也从来没有停止过对于美好社会制度的探索。从西方柏拉图的《理想国》到莫尔的《乌托邦》、康帕内拉的《太阳城》，从中国古经典《礼记》到陶渊明的《桃花源记》、康有为的《大同书》，记载着思想家们对于人类自由与解放、社会公平与正义的不懈思考。然而，这一切不过是美好的空想。170年前，马克思、恩格斯满怀为人类进步事业而奋斗的崇高理想，写出了划时代巨著《共产党宣言》，科学社会主义由此诞生。这是人类思想史上的一次   壮丽的日出 ，照亮了人类的精神世界，为无产阶级争取自由解放提供了强大思想武器。 ",
        },

        {
          id: 1,
          name: "在马克思主义的科学指引下，国际共产主义运动风起云涌、蓬勃发展。巴黎公社是无产阶级伟大社会革命的英勇尝试。巴黎公社失败的第二天，欧仁·鲍狄埃写下了长诗《国际》，此后被谱曲并起名为《国际歌》，一直激励着全世界劳动者和被压迫人民为争取解放而斗争。列宁领导俄国十月革命在帝国主义的统治链条上打开了一道缺口，建立了世界上第一个社会主义国家，犹如黑夜中的一道闪电，开辟了人类历史的新纪元，为经济文化落后的国家和殖民地半殖民地国家进行伟大社会革命指明了方向。第二次世界大战后，一批社会主义国家诞生，特别是中国这一占世界人口四分之一的东方大国走上社会主义道路，东风开始压倒西风。",
        },

        {
          id: 2,
          name: "在长期努力的基础上，以习近平同志为核心的党中央团结带领人民励精图治、砥砺奋进，创立了习近平新时代中国特色社会主义思想，推动中国特色社会主义进入了新时代。中华民族迎来了从站起来、富起来到强起来的伟大飞跃，迎来了实现中华民族伟大复兴的光明前景；科学社会主义在21世纪的中国焕发出强大生机活力，在世界上高高举起了中国特色社会主义伟大旗帜；中国特色社会主义道路、理论、制度、文化不断发展，拓展了发展中国家走向现代化的途径，给世界上那些既希望加快发展又希望保持自身独立性的国家和民族提供了全新选择，为解决人类问题贡献了中国智慧和中国方案。",
        },

        {
          id: 3,
          name: "党的十八大以来，以习近平同志为核心的党中央高举中国特色社会主义伟大旗帜，统揽伟大斗争、伟大工程、伟大事业、伟大梦想，统筹推进   五位一体 总体布局、协调推进   四个全面 战略布局，团结带领全国各族人民，推动党和国家事业取得历史性成就、发生历史性变革。在这一新的伟大征程中，习近平总书记成为党中央的核心、全党的核心，这是党和人民的共同选择、郑重选择、必然选择，为推进中国特色社会主义伟大事业提供了根本保证。在这一创造性实践中，以习近平总书记为主要代表的中国共产党人，从理论和实践结合上系统回答了新时代坚持和发展什么样的中国特色社会主义、怎样坚持和发展中国特色社会主义，创立了习近平新时代中国特色社会主义思想。",
        },

        {
          id: 4,
          name: "从理论和实践结合上系统回答了新时代坚持和发展什么样的中国特色社会主义、怎样坚持和发展中国特色社会主义，创立了习近平新时代中国特色社会主义思想。这一思想提出了八个明确、十四个坚持 等一系列重大创新观点，包括新时代坚持和发展中国特色社会主义的总目标、总任务、总体布局、战略布局和发展方向、发展方式、发展动力、战略步骤、外部条件、政治保证等基本问题，实现了马克思主义中国化的新飞跃，为推进中国特色社会主义伟大事业提供了科学指引。党的十八大以来，党和国家取得的一切成就、发生的一切变革归根到底，都是由于我们有习近平总书记掌舵领航，有以习近平同志为核心的党中央坚强领导，有习近平新时代中国特色社会主义思想科学指导。",
        },

        {
          id: 5,
          name: " 沧海横流显砥柱，万山磅礴看主峰。 在以习近平同志为核心的党中央坚强领导下，中国特色社会主义取得巨大成功，使两种意识形态、两种社会制度的较量在世界范围内发生了有利于马克思主义、有利于社会主义的深刻转变。习近平新时代中国特色社会主义思想的形成和发展，以全新的视野深化了对共产党执政规律、社会主义建设规律、人类社会发展规律的认识，使马克思主义在世界上产生了新的感召力、影响力。今天，中国特色社会主义不仅是中国共产党和中国人民团结的旗帜、奋进的旗帜、胜利的旗帜，而且正在成为21世纪科学社会主义的光辉旗帜，成为振兴世界社会主义的中流砥柱。",
        },

        {
          id: 6,
          name: "习近平总书记在党的十九大报告中明确指出， 中国特色社会主义最本质的特征是中国共产党领导，中国特色社会主义制度的最大优势是中国共产党领导，党是最高政治领导力量 。这一重大论断深刻揭示了党的领导与中国特色社会主义的内在统一性、不可分离性，也深刻揭示了中国道路成功的密码。中国特色社会主义，从开创、坚持到巩固、发展，一刻都离不开中国共产党的领导，中国特色社会主义道路、理论、制度、文化，都是党提出并在党的领导下形成、丰富和拓展的。让我们放宽历史的尺度看世界。国际共产主义运动的兴起、发展与无产阶级政党的领导密不可分，社会主义国家的前途命运与马克思主义政党的前途命运休戚相关。列宁深刻指出， 无产阶级在夺取政权的斗争中，除了组织，没有别的武器 ，甚至豪迈地说， 给我们一个革命家组织，我们就能把俄国翻转过来！",
        },

        {
          id: 7,
          name: "社会主义革命和建设时期，面对连年战争留下的满目疮痍、一穷二白的家底以及帝国主义的封锁与遏制，正是我们党带领人民迅速治愈战争创伤，完成社会主义改造，建立社会主义基本制度，铺就一条社会主义建设道路，实现了中华民族由近代不断衰落到根本扭转命运、持续走向繁荣富强的伟大飞跃。改革开放和社会主义现代化建设新时期，面对 文化大革命左 的影响和封闭落后的社会状况，正是我们党带领人民开动脑筋、解放思想，毅然决然实行改革开放，开辟出一条中国特色社会主义道路。正是由于我们坚持和加强党的领导，不断改进和完善党的领导，我们国家才保持政局稳定，顶住了苏东剧变后国际国内种种压力，推动中国特色社会主义稳步前进。",
        },

        {
          id: 8,
          name: "中国特色社会主义进入新时代，面对国内外环境、矛盾和问题、发展阶段和发展任务、工作对象和工作条件发生的深刻变化，正是我们党带领人民锐意进取、攻坚克难，沿着中国特色社会主义道路不断从胜利走向新的胜利，开启全面建设社会主义现代化国家新征程。党的十八大以来，以习近平同志为核心的党中央从坚持和加强党的全面领导、全面从严治党入手，鲜明提出 四个意识 ，密集召开新闻舆论、网络安全和信息化、哲学社会科学、文艺、党校、金融、国企、群团、高校思想政治工作、全军政治工作等一系列会议，一个领域一个领域梳理，一条战线一条战线推进，把党的领导具体落实到对各项工作的领导中，落实到对党员干部的选拔教育管理监督中，使党的建设和党的领导被弱化、淡化、虚化的状况得到根本扭转，校正了党和国家前进的航向。",
        },

        {
          id: 9,
          name: "5年多来，中央政治局常委会听取全国人大常委会、国务院、全国政协和最高人民法院、最高人民检察院党组工作汇报，成为一项重要制度安排；出台关于加强和维护党中央集中统一领导的若干规定，修订地方党委工作条例，制定党组工作条例；巡视聚焦是否坚持党的领导，问责首问党的领导弱化问题；明确军委主席负责制是党对人民军队绝对领导制度的 龙头 ，并郑重写入党章；把 中国共产党领导是中国特色社会主义最本质的特征 载入宪法；深化党和国家机构改革，确保党的领导全覆盖，确保党的领导更加坚强有力。正是由于我们旗帜鲜明坚持党对一切工作的领导、坚持党中央权威和集中统一领导、坚定不移全面从严治党，为党和国家事业发展提供了坚强政治保证。",
        },

        {
          id: 10,
          name: "时代是出卷人，我们是答卷人，人民是阅卷人。一年来，经济发展保持稳中有进、稳中向好态势，全面深化改革纵深推进、风生水起，脱贫攻坚力度不断加大，人民获得感、幸福感、安全感更加充实，全面从严治党向纵深发展，主场外交亮点纷呈，中国特色大国外交开创新局面……这份精彩的答卷，是在国内外形势发生深刻复杂变化、各种风险挑战层出不穷的背景下取得的，十分来之不易。这是以习近平同志为核心的党中央统揽全局、科学决策的结果，是１３亿多中国人民齐心协力、拼搏奋斗的结果。回首这极不平凡的一年，眺望新的奋斗征程，我们对实现党的十九大确定的宏伟目标、开创中国特色社会主义事业新局面充满了信心与力量。",
        },

        {
          id: 11,
          name: "伟大的事业，需要科学理论的指引。习近平新时代中国特色社会主义思想是贯穿党的十九大报告的灵魂，是马克思主义中国化的最新成果。一年来，从工厂企业到机关社区，从繁华都市到边远乡村，党的创新理论指导改革发展的火热实践，为各项事业发展注入强大思想力量。实现党的十九大确定的宏伟目标，最根本的，就是要坚持以习近平新时代中国特色社会主义思想为行动指南，坚决维护以习近平同志为核心的党中央权威和集中统一领导，把思想和行动统一到党中央的决策部署上来，在武装头脑、指导实践、推动工作上下功夫，在落实部署、见诸行动上取得实效。",
        },

        {
          id: 12,
          name: "事业发展出题目，深化改革做文章。党的十九大以来，改革扬帆再起航。深化党和国家机构改革、推进雄安新区建设、实施乡村振兴战略、深化拓展自贸试验区改革、探索建设中国特色自由贸易港等一系列重大举措相继出台，在改革开放４０周年的历史节点上，以实际行动彰显了新时代中国深化改革、扩大开放的坚定决心。事业发展没有止境，深化改革没有穷期。贯彻党的十九大精神，实现宏伟目标，需要继续用好改革开放这个关键一招。既有破局开路的大手笔，又有深耕细作的 工笔画 ，坚决破除思想观念和体制机制弊端，才能激发经济社会发展活力，为决胜全面建成小康社会、开启全面建设社会主义现代化国家新征程提供强大动力。",
        },

        {
          id: 13,
          name: "办好中国的事情，关键在党。强体魄于伟大的自我革命，把党建设得更加坚强有力，是百年大党风华正茂的政治密码，也是担当时代使命的根本保证。 全面从严治党永远在路上，不能有任何喘口气、歇歇脚的念头。 一年来，从深化国家监察体制改革，到修订《中国共产党纪律处分条例》，从抓实政治建设，到 打虎拍蝇 不松劲，党的建设不断加强，管党治党取得新成绩。把全面从严治党进行到底，继续清除一切侵蚀党的健康肌体的病毒，大力营造风清气正的政治生态，必将以全党的强大正能量在全社会凝聚起推动中国发展进步的磅礴力量。",
        },

        {
          id: 14,
          name: "艰难困苦，玉汝于成；创业维艰，奋斗以成。从2018年春节团拜会讲话22次提到 奋斗 ，指出新时代是奋斗者的时代；到第十三届全国人大一次会议讲话10次强调 奋斗 ，勉励每一个人都是新时代的见证者、开创者、建设者 ，习近平总书记用 奋斗 定义了新时代的精神气质，奋斗也成为过去一年中国发展进步的实践逻辑。一年来，从补齐民生短板到改善法治环境，从支持创新创业到提升公共服务，新时代为奋斗提供了有力支撑；一年来，从繁华的城市到广袤的乡村，从宁静的校园到忙碌的工厂，从热火朝天的工地到科技创新的前沿，13亿多中国人在各自岗位上的辛勤奋斗，构成了新时代中国激情奋进的壮阔场景。",
        },

        {
          id: 15,
          name: "奋斗是幸福的，奋斗也是艰辛的、长期的、曲折的，没有艰辛就不是真正的奋斗。民族复兴之路上，一代代人前赴后继，涉险滩、越激流，每一段征程都有不同的风景，也都面临不同的挑战。正如习近平总书记指出的， 中华民族伟大复兴，绝不是轻轻松松、敲锣打鼓就能实现的。全党必须准备付出更为艰巨、更为艰苦的努力。 党的十九大以来的这一年，面对社会主要矛盾的历史性变化，我们坚决贯彻新发展理念，着力解决发展不平衡不充分的问题；着眼推动经济实现高质量发展，我们深化供给侧结构性改革，大力激发各类市场主体活力；直面中美经贸摩擦等挑战，我们齐心协力办好自己的事情，推进新一轮高水平对外开放……",
        },

        {
          id: 16,
          name: "过去一年，以不畏浮云遮望眼的宏阔视野总揽四个伟大，以乱云飞渡仍从容的战略定力奋进 两个一百年，以千磨万击还坚劲 的意志品质应对各种风险挑战，奋斗写在了党中央的运筹帷幄中。过去一年，加快落实负面清单制度，大力简政减税降费，为各类所有制企业营造市场化、法治化、国际化营商环境，奋斗写在了各级政府的务实举措中。过去一年，几十万第一书记奋战脱贫一线，数千万科研人员潜心创新创造，数亿农民用勤劳和智慧端牢 中国饭碗 ，奋斗写在了无数干部群众的众志成城中。我们以一年的奋斗，赢得的是经济稳定运行在中高速区间、产业转型升级实现新突破，换来的是各项事业蒸蒸日上、改革开放不断开辟新境界。",
        },

        {
          id: 17,
          name: "看开放， 中国开放的大门不会关闭，只会越开越大！ 习近平主席博鳌亚洲论坛2018年年会开幕式上的主旨演讲掷地有声。这一年，国家发展改革委、商务部发布《自由贸易试验区外商投资准入特别管理措施（负面清单）（2018年版）》，海南全域成为自由贸易试验区，积极筹办首届中国国际进口博览会，中国扩大开放步子稳、措施实。从靠优惠政策吸引外资，到更注重改善营商环境；从促进出口，到扩大进口推动贸易更加平衡发展，中国以更积极的姿态向世界敞开怀抱，跑出更高水平、更高层次的开放 加速度 。开放带来进步，封闭必然落后。一年来，特斯拉在美国之外首个超级工厂正式签约落户上海，宝马增资建设电动汽车全球出口基地，桥水等知名对冲基金加速布局中国资本市场……",
        },

        {
          id: 18,
          name: "春华秋实何寻常，如椽巨笔著华章。犹记得，十九大闭幕后的中外记者见面会上，习近平总书记宣示新时代要有新气象，更要有新作为，强调不要人夸颜色好，只留清气满乾坤 。犹记得，在2018年春节团拜会上，习近平总书记指出 新时代是奋斗者的时代 ，强调 始终为人民不懈奋斗、同人民一起奋斗 。回望十九大，我国各项事业之所以呈现新发展、新变化、新气象，我们之所以能有效应对新问题新挑战、取得世人瞩目的新成就，根本就在于以习近平同志为核心的党中央掌舵领航、举旗定向，根本就在于习近平新时代中国特色社会主义思想的科学指引，根本就在于十九大擘画了美好蓝图、指明了正确方向。",
        },

        {
          id: 19,
          name: "深刻领会社会保障工作的重要意义，把织密扎牢社会保障安全网作为保障和改善民生的重大任务，进一步增强做好工作的责任感和使命感。习近平总书记指出，增进民生福祉是发展的根本目的。在整个发展过程中，都要注重民生、保障民生、改善民生。习近平总书记强调，社会保障发挥着社会稳定器作用。结构性改革要深化，应对人口老龄化工作要做好，构建公平、可持续的养老保险制度至关重要。这些重要论述，深刻阐述了社会保障制度在经济社会发展中的重要地位和作用，充分体现了我们党把人民放在心中最高位置的根本立场和全心全意为人民服务的根本宗旨。我们必须充分认识做好社会保障工作的重大意义，扎实推进社会保障体系建设，使人民获得感、幸福感、安全感更加充实、更有保障、更可持续。",
        },

        {
          id: 20,
          name: "深刻领会社会保障工作的基本原则，坚持尽力而为、量力而行，不断增强社会保障制度的公平性和可持续性。习近平总书记指出，保障和改善民生要抓住人民最关心最直接最现实的利益问题，既尽力而为，又量力而行。要根据经济发展和财力状况逐步提高人民生活水平，政府主要是保基本，不要做过多过高的承诺，多做雪中送炭的重点民生工作。习近平总书记强调，要坚持全覆盖、保基本、多层次、可持续方针，加强城乡社会保障体系建设。推动城乡居民基本养老保险待遇水平随经济发展逐步提高，确保参保居民共享经济社会发展成果。这些重要论述，立足我国基本国情和发展的阶段性特征，既体现党和政府的责任担当和主动作为，又强调实事求是、一切从实际出发，深刻阐明了社会保障工作必须坚持的基本原则。",
        },
      ],
      //示例文本数组
      currentNum: 0,
      newVidbase: [
        "13012340689",
        "13012340689",
        "13012340689",
        "13012340689",
        "13012340689",
        "13012340689",
        "13012340689",
        "13012340689",
        "13012340689",
        "13012340689",
        "13012340689",
        "13012340689",
      ],
      vidbase: [
        "13016990689",
        "13016990689",
        "13012340689",
        "13012340689",
        "13012340689",
        "13012340689",
        "13012340689",
        "13012340689",
        "13012340689",
        "13012340689",
        "13012340689",
        "13012340689",
      ],
      //底库列表盒子
      bu: false,
      hao: false,
      activeClass: -1,
      resultThan: "",
      same: "same",
      unsame: "unsame",
      startbtnClickable: true,
    };
  },

  methods: {
    dataReplace,
    // 切换文本的方法
    changeTxt() {
      var currentIndex = Math.floor(Math.random() * 21);
      console.log(currentIndex);
      this.currentNum = currentIndex;
    },
    rec() {
      console.log("fsfsdsdf");
      var mymessage = confirm("查无此人！");
      if (mymessage == true) {
        this.$router.go(0);
      } else {
        this.$router.go(0);
      }
    },
    // 底库接口
    basewav() {
      this.$axios.post("/namelist").then((res) => {
        if (res.code == 2000) {
          if (res.status) {
            this.vidbase = res.res;
          } else {
            console.log(res);
          }
        }
      });
    },
    // 开始分析接口
    startAnalysisInsert(e) {
      this.startbtnClickable = false;
      var that = this;
      that.bu = true;
      that.hao = false;
      const fd = new FormData();
      fd.append("file", this.recordedData);
      fd.append("spkid", e);
      console.log(this.recordedData);

      that.$axios
        .post("/upload", fd, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          if (res.code == 2000) {
            if (res.status) {
              this.showli = false;
              // 原始数据在这vidbase
              this.vidbase = res.inbase;
              let list = [];
              this.vidbase.forEach((item) => {
                let phoneNum;
                let str;
                str = item.split(":");
                phoneNum = str[1];
                if(str.length>=3){
                  list.push(str[0] + ":" + dataReplace(phoneNum)+":"+str[2] );
                }else{
                list.push(str[0] + ":" + dataReplace(phoneNum) );}
              });
              this.newVidbase = list;
              console.log("list", this.vidbase);
              console.log("list2", this.newVidbase);
              this.res1 = false;
              this.res2 = true;
              this.bu = false;
              this.hao = true;
              // that.imgAdd = res.encoded_img;
              that.scoreThan = res.score.toFixed(2);
              that.resultThan = res.result;
              console.log(res.status);
              console.log(that.scoreThan);
              //音频存入列表
              // res.encoded_wav_list.forEach(function(item) {
              //   // that.audio1.push(that.reback(item));
              // });
            } else {
              alert("查无此人！");
               this.$router.go(0);
              // this.rec();
            }
          } else {
            alert("服务出错了！请联系管理员");
          }
        });
    },

    open() {
      this.$prompt("请输入想比对的音频名?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.$emit("pooo", value);

          this.$message({
            type: "success",
            message: "比对声纹中，请稍等！",
          });
          this.startAnalysisInsert(value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },

    tapcross(i) {
      this.startAnalysisInsert(this.vidbase[i]);
      this.activeClass = i;
      console.log("!!!!!!!!!!!!");
      console.log(this.vidbase[i]);
      // }
    },
    didi(i) {
      console.log(this.vidbase[i]);
    },
  },

  mounted() {
    // 调接口就把这里删掉   演示用的
    let list = [];
    this.vidbase.forEach((item) => {
      list.push(dataReplace(item));
    });
    this.newVidbase = list;

    this.changeTxt();
    // this.basewav();
    //录音组件
    var options = {
      controls: true,
      bigPlayButton: false,
      width: 500,
      height: 250,
      fluid: false,
      plugins: {
        wavesurfer: {
          backend: "WebAudio",
          waveColor: "#eeefda",
          progressColor: "#FAFCD2",
          displayMilliseconds: true,
          debug: true,
          cursorWidth: 1,
          hideScrollbar: true,
          plugins: [
            // enable microphone plugin

            WaveSurfer.microphone.create({
              bufferSize: 4096,
              numberOfInputChannels: 1,
              numberOfOutputChannels: 1,
              constraints: {
                video: false,
                audio: true,
              },
            }),
          ],
        },

        record: {
          audio: true,
          video: false,
          maxLength: 30,
          debug: true,
          displayMilliseconds: true,
        },
      },
    };

    var that = this;

    var player = videojs("myAudio", options, function () {
      var msg =
        "Using video.js " +
        videojs.VERSION +
        " with videojs-record " +
        videojs.getPluginVersion("record") +
        " and videojs-wavesurfer " +
        videojs.getPluginVersion("wavesurfer") +
        " and wavesurfer.js " +
        WaveSurfer.VERSION;
      videojs.log(msg);
    });
    that.player = player;

    player.on("deviceReady", function () {
      console.log("deviceReady!");
      player.record().start();
    });
    // error handling
    player.on("deviceError", function () {
      alert("当前浏览器不支持录音功能！");
      console.log("device error:", player.deviceErrorCode);
    });

    player.on("error", function (element, error) {
      alert("  w(ﾟДﾟ)w！故障啦！请刷新页面重试~");
      console.error(error);
    });

    // user clicked the record button and started recording

    // user completed recording and stream is available
    player.on("finishRecord", () => {
      // the blob object contains the recorded data that
      // can be downloaded by the user, stored on server etc.
      // encoder = new WavAudioEncoder(16, 1);
      // console.log(VmsgEngine);
      console.log("finished recording: ", player.recordedData);
      this.recordedData = player.recordedData;
      this.imgIndex = 0;
      console.log("================="); //如果录音时间过短，提示并刷新页面
      // var sbt = this.$refs.startbtn
      // sbt.disabled = false;
      this.startbtnClickable = false;
      if (this.recordedData.size <= 32000) {
        alert("录音时长过短，请重新录入！");
        this.$router.go(0);
      }
      console.log(this.recordedData);
    });
  },
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.w {
  width: 100%;
  height: 55rem;
  min-height: 99vh;
  min-width: 94.6875rem;
  overflow-y: hidden;
  position: relative;
  background-image: url("../assets/img/mainbg.png");

  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;

  text-align: center;
}

.title {
  padding-top: 1.25rem;
  color: #fff;
  font-size: 28px;
}

.mainbody {
  padding-top: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  /* width: 81.25rem; */
  /* width: 100%; */
  /* border: 1px solid red; */
}

#loadImg {
  width: 7.8125rem;
  height: 7.8125rem;
  margin-top: 1.875rem;
}

#myAudio {
  margin-top: -0.625rem;
  /* border: 1px solid red; */
  width: 20.625rem;
  height: 13rem;
  background-color: rgb(44, 135, 201);
}

#myAudio /deep/ .vjs-device-button.vjs-control {
  font-size: 1rem;
}

#middle {
  width: 21.25rem;
  display: flex;
  /* margin-left: 9.375rem; */
  flex-direction: column;
  padding-top: 3.125rem;
  align-items: center;
  margin-left: 3.75rem;
  /* border: 1px solid red; */
  /* margin-right: 30rem; */
}

#mid_top {
  position: relative;
  display: flex;
  height: 13rem;
  justify-content: center;
  align-items: center;
  margin-top: 1.25rem;
  margin: 0 auto;
}

#mid_top::before {
  position: absolute;
  top: -33%;
  left: -14%;
  content: url("../assets/img/up2.png");
}

#mid_bottom {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  position: relative;
  margin: 0 auto;
  margin-top: 7.375rem;
  height: 13rem;
}

#mid_bottom::before {
  position: absolute;
  top: -33%;
  left: -14%;
  content: url("../assets/img/up3.png");
}

.mid_mid {
  margin-left: 0.625rem;
  margin-top: 2.5rem;
}

@keyframes glow {
  0% {
    border-color: #ccc;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.2),
      inset 0 0 5px rgba(194, 197, 204, 0.1), 0 1px 0 #ccc;
  }

  100% {
    border-color: #fff;
    box-shadow: 0 0 20px rgba(194, 197, 204, 0.6),
      inset 0 0 10px rgba(255, 255, 255, 0.4), 0 1px 0 #fff;
  }
}

#startbtn {
  background-color: rgba(49, 128, 218, 0.2);
  color: #fff;
  width: 96px;
  height: 36px;
  box-shadow: 0 0 8px #c2c5cc inset;
  animation: glow 800ms ease-out infinite alternate;
}

#right li {
  display: flex;
  justify-content: center;
  list-style: none;
}

#right li p {
  width: 80%;
  text-indent: 2em;
  color: #fff;
  margin-top: 20px;
  line-height: 1.625rem;
  font-size: 16px;
  font-weight: 200;
}

.text_title {
  display: flex;
  justify-content: flex-end;
}

.text_title #changebtn {
  color: #fff;
  width: 3.75rem;
  height: 1.25rem;
  /* float: right; */
  line-height: 0.5rem;
  margin-top: 1.875rem;
  margin-right: 1.25rem;
}

.box {
  width: 21.25rem;
  height: 16.5625rem;
  display: inline-block;
  /* background-color: #ffffff; */
  border-radius: 4px;
  /* border: 1px solid #c2c5cc; */
  box-shadow: 0 0 22px #c2c5cc inset;
  margin-top: 1.25rem;
  padding-top: 0.9375rem;
}

#left {
  position: relative;
  height: 42.5rem;
  width: 21rem;
  padding-left: 2.15rem;
  margin-top: -0.8125rem;
  text-align: left;
  z-index: 99;
  /* overflow-y: auto; */
}

#left::before {
  position: absolute;
  top: -11%;
  left: -15%;
  z-index: -2;
  content: url("../assets/img/up1.png");
}

#left::after {
  position: absolute;
  top: 73%;
  left: 35%;
  z-index: -2;
  content: url("../assets/img/down.png");
}

#left ul {
  margin-top: 0.625rem;
  width: 100%;
  /* width: 17.5rem; */
  margin: 0 auto;
  /* border: 1px solid red; */
  height: 100%;
  overflow-y: auto;
}
.diku {
  width: 100%;

  /* height: 200px; */
}
.dikutitle {
  font-weight: 600;
  padding-bottom: 20px;
  color: #fff;
}
.diku ul li {
  color: #fff;
  /* border: 1px solid red; */
}
#left ul li {
  float: left;
  color: #fff;
  width: 82%;
  height: 1.5rem;
  margin-left: 1.3rem;
  padding-right: 20px;
  /* margin: 0 auto; */
  /* list-style: none; */
}
.lilis {
  float: left;
  color: #fff;
  width: 5.6rem;
  height: 1.5rem;
  margin-left: 2.3rem;
}
#left ul li:hover {
  color: rgb(238, 15, 15);
}

#right {
  position: relative;
  /* margin-left: 10rem; */
  margin-top: -0.8125rem;
  height: 42.5rem;
  width: 25rem;
  /* border: 1px solid red; */
}

#right::before {
  position: absolute;
  top: -11%;
  left: -15%;
  content: url("../assets/img/up4.png");
}

#right::after {
  position: absolute;
  top: 73%;
  left: 46%;
  content: url("../assets/img/down.png");
}

.result_img img {
  margin-top: 0.625rem;
  width: 7.5rem;
  height: 7.5rem;
}

.same {
  color: rgb(20, 179, 117);
}

.unsame {
  color: rgb(230, 97, 87);
}

.content a {
  color: #fff;
  text-decoration: none;
  margin-left: 20px;
}
.footer {
  position: absolute;
  bottom: 0;
  left: 37%;
  line-height: 15px;
}

.content {
  line-height: 40px;
  bottom: 0;
  width: 100%;
  text-align: center;
  /* background: #002454; */
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
  width: 26.875rem;
}
</style>