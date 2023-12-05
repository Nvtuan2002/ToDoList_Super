import React from 'react';
import { Button, Form, Input } from 'antd';
import { emailRule, passwordRule } from '@/common/rules';
import { useNavigate } from 'react-router-dom';
import useNotification from '@/customHook/useNotify'
import { useDispatch } from 'react-redux';
import { loginThunk } from '@/redux/auth/thunk';

const Login = () => {
    const { contextHolder, infoNotify, errorNotify } = useNotification()
    const nav = useNavigate();
    const dispatch = useDispatch()
    const onFinish = async (values) => {
        dispatch(loginThunk(values))
            .then(data => {
                if (data.error) {
                    errorNotify('topRight', 'Đăng nhập không thành công')
                } else {
                    infoNotify('topRight', 'Đăng nhập thành công')
                    setTimeout(() => {
                        nav('/')
                    },1000)
                }
            })
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
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name="identifier"
                rules={emailRule}
            >
                <Input />
            </Form.Item>
            {contextHolder}

            <Form.Item
                label="Password"
                name="password"
                rules={passwordRule}
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
export default Login;