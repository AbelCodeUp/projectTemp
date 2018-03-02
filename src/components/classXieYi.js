import React, { Component } from 'react';
import { Link } from 'react-router';
import { hashHistory } from 'react-router';
import $ from 'jquery';
function GetCookie(sName) {
    let aCookie = document.cookie.split("; ");
    for (let i = 0; i < aCookie.length; i++) {
        let aCrumb = aCookie[i].split("=");
        if (sName == aCrumb[0])
            return unescape(aCrumb[1]);
    }
    return null;
}


export default class My_order extends Component {
    constructor() {
        super();
        this.state = {
            datas: [], openid: null,
            liked: true,
            count: 60,
            orderid: 0
        };
    }


    componentDidMount() {

       document.documentElement.scrollTop = document.body.scrollTop =0;
        if (GetCookie("Tonken") || localStorage.getItem('Tonken')) {


        } else {
            hashHistory.push("/My");
        }
    }



    render() {

        return (
            <div className='xieyiBox'>
                <h2 className='xieyiTitle'>hi翻外教课堂课程协议</h2>
                <p className='xieyiTishi'>提示：在使用【www.hi-fan.cn】网站课程服务之前，请您先认真阅读本《课程服务协议》（以下简称“本协议”），在充分理解并同意遵守本协议各条款内容，特别是免除或者限制责任的条款、争议解决和法律适用条款后再进行本站课程服务的购买和使用。免除或者限制责任的条款可能将以加粗字体显示，您应重点阅读。如您对本协议有任何疑问的，应向本站客服（电话：400-6767-671）咨询。<span style={{ color: '#ff0000' }}>本协议中，“甲方”是指购买乙方相应课程的自然人；“乙方”是指“笨鸟盛世（北京）教育科技有限公司”。</span></p>
                
                <h2 className='xieyiTitle2'>一、关于hi翻外教课堂</h2>
                <p className='xieyiTishi2'>hi翻外教课堂是笨鸟盛世（北京）教育科技有限公司旗下GoGoTalk的另一个青少外教英语品牌，hi翻外教课堂利用在线组队的方式，让学生足不出户与全球优质外教进行实时互动的英语学习。</p>
               
                <h2 className='xieyiTitle2'> 二、协议确认</h2>
                <p className='xieyiTishi3'>1. 本协议内容包括本协议正文所载之各条款及乙方网站（www.hi-fan.cn）已经发布的或将来可能发布的各类课程规则、服务规则（下称“乙方网站规则”）；所有该等乙方网站规则均为本协议不可分割的一部分，与本协议正文具有同等法律效力。本协议是甲方与乙方自愿共同签订的，适用于甲方在乙方网站的全部活动。</p>
                <p className='xieyiTishi3'>2. 甲方在注册乙方网站时，应当详实登录个人正确、完整的信息（包括真实姓名及各项相关资料）。如因甲方提供的资料不实或者不明确，致使任何一方受到任何延误或者损失的，应当由甲方承担相应责任。</p>
                <p className='xieyiTishi3'>3. 在甲方购买乙方课程时，甲方应已年满18岁，且已经阅读、理解并接受本协议正文的全部条款及乙方网站规则，并承诺阅读、理解并接受乙方网站不时发布的乙方网站规则。甲方确认在已知悉并接受本协议的前提下支付课程费用。一旦甲方在乙方网站上完成课程购买并支付相应费用，即意味着甲方已阅读本协议所有条款，并对本协议条款的含义已充分理解，同意受本协议约束。</p>
                <p className='xieyiTishi3'>4. 本协议中的“学员”或者“甲方学员”是指在乙方的官方网站中甲方的注册账户下学习甲方所购买的课程包的一名固定学员。乙方按照该学员个人的学习状况和知识储备情况确定其起始级别并配备相应课程内容，为确保最佳的学习效果，整个学习过程中不得更换或者增加学员。 </p>
                <p className='xieyiTishi3 xieyiTishi2'>5. 通过甲方账号在乙方网站发生的课程购买行为均视为甲方本人的真实意思表示和甲方本人的行为，本协议自乙方收到甲方支付的课程费用起生效，一经成立生效即不可撤销。 </p>
                
                <h2 className='xieyiTitle2'> 三、课程服务方案</h2>
                <p className='xieyiTishi3'>1.1. 学习套餐：甲方可自主选择课程套餐，以实际支付的订单为准。</p>
                <p className='xieyiTishi3'>1.2. 课程的有效期说明</p>
                <p className='xieyiTishi3'>4课时，有效期1个月</p>
                <p className='xieyiTishi3'>30课时，有效期3个月</p>
                <p className='xieyiTishi3'>60课时，有效期6个月</p>
                <p className='xieyiTishi3 xieyiTishi2'>120课时，有效期12个月</p>

                <h2 className='xieyiTitle2'> 四、课程服务管理</h2>
                <p className='xieyiTishi3'>1. 在您为孩子选择的学习套餐下，甲方在一天内可预约多次课程，可一次性预约未来两周之内的多节课程，但课程到期时未使用的课程将失效，不可延期。</p>
                <p className='xieyiTishi3'>2. 乙方将根据学员情况为其确定起始级别，学员及其家长同意课程从该级别开始。</p>
                <p className='xieyiTishi3 xieyiTishi2'>3. 乙方为学员提供一对多（最少1个最多6个）的外教在线视频教学服务，每节课的时长为30分钟。</p>

                <h2 className='xieyiTitle2'> 五、课程预约</h2>
                <p className='xieyiTishi3 xieyiTishi2'>hi翻外教课堂的课程预约全部采用自助约课的形式，您需要至少提前24小时进行课程预约。</p>

                <h2 className='xieyiTitle2'> 六、课时使用</h2>
                <p className='xieyiTishi3'>购买多个课时包，系统默认按照购买的先后顺序消耗。</p>
                <p className='xieyiTishi3 xieyiTishi2'>举例：先购买了99/4节，后购买了998/30节，先消耗99/4节，后消耗998/30节。</p>

                <h2 className='xieyiTitle2'> 七、课程取消与旷课</h2>
                <p className='xieyiTishi3'>1. 课程取消与旷课约定</p>
                <p className='xieyiTishi3'>1.1. 如果学员无法在预定时间上课，请甲方务必至少提前24小时取消课程，乙方每个月（自然月）提供两次24小时内取消课程的机会，且不扣除课时。超出两次后的每次24小时内取消课程将会扣除相应课时。</p>
                <p className='xieyiTishi3'>1.2. 学员自身原因迟到或旷课将会扣除相应课时。</p>
                <p className='xieyiTishi3'>2. 其他约定</p>
                <p className='xieyiTishi3'>2.1. 如由于hi翻外教课堂的原因导致预约的课程无法正常进行的，不视为甲方的旷课，hi翻外教课堂将作出甲方因此未能正常上课课程同等的补偿。</p>
                <p className='xieyiTishi3'>2.2. 学员未能按时进入教室进行上课的，课程将按时开始和结束，学员及甲方不能要求课程延时。</p>
                <p className='xieyiTishi3'>2.3. hi翻外教课堂具体课程服务管理规定以hi翻外教课堂官方网站（www.hi-fan.cn）公示内容为准，甲方应自行关注并按此执行。如甲方因特殊情况需要协调或变更内容的，应与hi翻外教课堂协商后双方以书面形式确认。</p>
                <p className='xieyiTishi3 xieyiTishi2'>2.4. 续费条款：续费时学员可在hi翻外教课堂官方网站（www.hi-fan.cn）自主购买新课程包。如需期限延长事宜请拨打hi翻外教课堂咨询电话 400-676-7671 详细了解相关情况。</p>

                <h2 className='xieyiTitle2'> 八、账户管理</h2>
                <p className='xieyiTishi3'>1. 为便于乙方了解学员情况、更好地履行本协议项下义务，甲方应向乙方提供学员的部分个人信息。甲方同意乙方可将学员的个人信息用于公司内部的教学管理等目的，但应注意依法严格保护学员的个人隐私。</p>
                <p className='xieyiTishi3'>2. 如甲方提供的学员信息发生变更，甲方应及时通知乙方课程顾问；由于甲方未及时通知的而导致乙方无法联系到甲方、使学员的学习受到影响的，甲方应自行承担责任。</p>
                <p className='xieyiTishi3'>3. 甲方同意应妥善保管其课程账户和密码，并对任何人利用其账户和密码所进行的活动负责。如学员的账户和密码遭到未获授权的使用，或者发生其他任何安全问题，由甲方自行承担，甲方可向乙方的工作人员要求暂停相关服务。</p>
                <p className='xieyiTishi3'>4. 甲方亦不得将其账号和密码出借、转移或者让与第三人使用。如乙方合理怀疑甲方违反本约定，乙方有权暂时停止甲方账户之使用，如果乙方最终确认甲方违反本约定，乙方有权立即终止本协议。</p>
                <p className='xieyiTishi3 xieyiTishi2'>5. 未经乙方书面同意及授权，甲方不得以任何方式将因本协议之订立或执行所得悉的乙方之技术数据、商业秘密及其他机密资料和信息提供给任何第三人或向第三人披露，如有违反，乙方有权立即终止本协议并要求甲方赔偿其损失。</p>

                <h2 className='xieyiTitle2'> 九、费用支付</h2>
                <p className='xieyiTishi3'>1. 您在hi翻外教课堂网站上可以通过支付宝、微信进行课程费用的支付，在hi翻外教课堂收到您的款项后立即开通相应的课程服务。</p>
                <p className='xieyiTishi3'>2. 您通过银行汇款的方式向hi翻外教课堂支付课程费用的，hi翻外教课堂在收到您的款项后一个工作日内通知您并为甲方开通相应课程服务。</p>
                <p className='xieyiTishi3'>hi翻外教课堂账户信息如下：</p>
                <p className='xieyiTishi3' style={{color:'#ff0000'}}>收款人开户行名：中国银行股份有限公司北京中关村中心支行</p>
                <p className='xieyiTishi3' style={{color:'#ff0000'}}>收款人账号：318163460962</p>
                <p className='xieyiTishi3 xieyiTishi2' style={{color:'#ff0000'}}>收款人名称：笨鸟盛世（北京）教育科技有限公司</p>

                <h2 className='xieyiTitle2'> 十、退课管理</h2>
                <p className='xieyiTishi3'>除本协议另有约定外，甲方在购买课程后，如遇违约且申请退费，可以按照以下规定办理：</p>
                <p className='xieyiTishi3'>1. 从报名之日起30天内（含）可申请未使用课时退费，已消耗部分的课时单价按照甲方所购课程原价（不含优惠）与总课时（不含赠课）进行单价折算，具体计算公式如下：</p>
                <p className='xieyiTishi3'>退款金额 = 实际支付费用 – （已消耗课时数 *课程单价）。</p>
                <p className='xieyiTishi3'>其中</p>
                <p className='xieyiTishi3'>赠送的课时（含团购赠课）对应单价为0元，申请退费后赠课作废。</p>
                <p className='xieyiTishi3'>实际支付金额不含优惠券积分。</p>
                <p className='xieyiTishi3'>购买多个课时包系统自动按照购买的先后顺序消耗。</p>
                <p className='xieyiTishi3'>举例：小明998元购买了30课时，上了两次课，30天内想要退费，则退费金额=998-（998/30）*2。</p>
                <p className='xieyiTishi3'>2. 从报名之日起超过30天，学员不得要求退费。</p>
                <p className='xieyiTishi3'>3. 退款金额由乙方退还至甲方的付款账户，如有特殊情况的，甲方应本人以书面方式向乙方进行申请，经乙方审核通过后，退款将支付到由甲方书面提供的本人银行账户。因退款产生的相关费用由甲方自行承担，如乙方先行承担的，其有权在支付退款费用时直接予以扣除。如甲方采用信贷方式购买课程的，则退款方式按照甲方与信贷方的约定为准。乙方同意甲方的退款申请后需在10个工作日完成退款。</p>
                <p className='xieyiTishi3 xieyiTishi2'>4. 甲方明确理解并同意，如甲方提前申请退费，甲方在购买课程时赠送的课程、优惠等项目自动取消，甲方不得申请折算为现金进行退款。</p>
 
                <h2 className='xieyiTitle2'> 十一、知识产权</h2>
                <p className='xieyiTishi3 xieyiTishi2'>本网站上所显示、使用或提供之软件、程序及内容（包括但不限于文字、说明、图画、图片、图形、课程资源、页面设计、网站规划与安排等）之专利权、著作权、商标权、商业秘密及其他知识产权均属hi翻外教课堂 或其他权利人所有，非经权利人事先书面授权同意，您不得重制、公开传播、公开播送、公开上映、改作、编辑、转载、链接、引用、抓取、解编、反向破译、或其他方式之使用。如有违反时，除应承担法律责任外，还应承担对乙方造成的全部损失。</p>

                <h2 className='xieyiTitle2'> 十二、法律管辖和争议解决</h2>
                <p className='xieyiTishi3'>1. 本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律（不包括特别行政区及台湾地区法律）。 </p>
                <p className='xieyiTishi3 xieyiTishi2'>2. 协议中如有其它未尽事宜，双方依据hi翻外教课堂的官方网站（www.hi-fan.cn）公示内容为准，其他未尽事宜或执行过程中发生的其它问题由双方协商解决，协商不成，可提交hi翻外教课堂所在地有管辖权法院诉讼解决。</p>

                <h2 className='xieyiTitle2'> 十三、禁止劝诱</h2>
                <p className='xieyiTishi3'>1. 甲方明确了解并同意，hi翻外教课堂（及关系企业）的员工、老师、顾问为其公司存续及发展的重要支撑力量，任何人非经hi翻外教课堂同意不得进行劝诱。</p>
                <p className='xieyiTishi3 xieyiTishi2'>2. 甲方同意在使用hi翻外教课堂提供的课程服务过程中及其后，不得唆使、劝诱hi翻外教课堂（及关系企业）的员工、老师、顾问与hi翻外教课堂终止或解除服务关系，或由您自己介绍他人予以雇佣（无论正式、兼职、约聘）的任何职务。如有违反，甲方应承担hi翻外教课堂为填补该职位空缺所支出的合理费用，并应向乙方承担违约金 （以上述人员离职前上一年度年薪或报酬的三（3）倍计算），违约金不足以弥补损失的，乙方有权要求甲方应予以补足。</p>

                <h2 className='xieyiTitle2'> 十四、其他事宜</h2>
                <p className='xieyiTishi3'>1. 乙方有权根据法律法规的变化及网站运营的需要不时地对本协议及本站的内容进行修改，并在本站张贴。修改后的协议一旦被张贴在本站上即生效，并代替原来的协议，您可随时登录查阅最新协议。您有义务及时关注并阅读最新版的协议及网站公告。如您不同意更新后的协议，可以立即向hi翻外教课堂进行反馈且应立即停止接受hi翻外教课堂依据本协议提供的服务；如您继续使用本站提供的服务的，即视为同意更新后的协议。</p>
                <p className='xieyiTishi3'>2. 本协议自您完成本课程协议的注册程序且将所选课程的款项支付至乙方账户后生效。</p>
                <p className='xieyiTishi3'>3. 协议经甲方确认并同意后，将以电子文件方式留存于乙方公司系统中，以为双方协议签署及遵循的依据。</p>
                <p className='xieyiTishi3 xieyiTishi2'>4. 如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。</p>

            </div>
        )
    }
}
