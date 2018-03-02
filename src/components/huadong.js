// import { DatePicker} from 'antd';
// import { createForm } from 'rc-form';
// import moment from 'moment';
// import 'moment/locale/zh-cn';
// import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
//
// const zhNow = moment().locale('zh-cn').utcOffset(8);
// const maxDate = moment('2016-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
// const minDate = moment('2015-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);
//
// const maxTime = moment('22:00 +0800', 'HH:mm Z').utcOffset(8);
// const minTime = moment('08:30 +0800', 'HH:mm Z').utcOffset(8);
//
// const gmtNow = moment().utcOffset(0);
//
// // 如果不是使用 List.Item 作为 children
// const CustomChildren = props => (
//     <div onClick={props.onClick} style={{ backgroundColor: '#fff', height: '0.9rem', lineHeight: '0.9rem', padding: '0 0.3rem' }}>
//         {props.children}
//         <span style={{ float: 'right', color: '#888' }}>{props.extra}</span>
//     </div>
// );
//
// class Test extends React.Component {
//     state = {
//         date: zhNow,
//         dpValue: null,
//         visible: false,
//     }
//     onChange = (date) => {
//         // console.log('onChange', date);
//         this.setState({
//             date,
//         });
//     }
//     render() {
//         const { getFieldProps } = this.props.form;
//         return (<div>
//             <List className="date-picker-list" style={{ backgroundColor: 'white' }}>
//                 <DatePicker className="forss" mode="datetime" onChange={this.onChange} value={this.state.date}>
//                     <List.Item arrow="horizontal">日期+时间</List.Item>
//                 </DatePicker>
//             </List>
//         </div>);
//     }
// }
