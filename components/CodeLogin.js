import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
/**验证码注册 */
class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handleSendCode = (e) => {
      alert(1);
      console.log(this.props.form.getFieldValue('Phone'));
      e.preventDefault();
       fetch("http://learnapi.gogo-talk.com:8082/api/Register/SendPhoneCode?Phone="+this.props.form.getFieldValue('Phone'),
        {
            method: "GET"
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
        })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('Phone', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入手机号" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('captcha', {
            rules: [{ required: true, message: 'Please input the captcha you got!' }],
            })(
            <Input size="large"  />
            )}
            <Button  size="large" onClick={ this.handleSendCode } >Get captcha</Button>
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            注册
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default WrappedNormalLoginForm;