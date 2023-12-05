import React from 'react';
import { Button, Form, Input } from 'antd';
import { usernameRule, emailRule, passwordRule, rePasswordRule } from '@/common/rules';
import { register } from '@/services/auth';
import './Register.css'
import { useNavigate } from 'react-router-dom';


const Register = () => {

    const nav = useNavigate();

    const onFinish = async (values) => {
        try {
            await register(values);
            nav('/login')
        }
        catch (error) {
            console.log('Loi', error);
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={usernameRule}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={emailRule}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={passwordRule}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Re-Password"
                name="rePassword"
                rules={rePasswordRule}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
};
export default Register;