import { notification } from 'antd'

export default function useNotification() {
    const [api, contextHolder] = notification.useNotification();
    const infoNotify = (placement, message, description) => {
        api.info({
            message: message,
            description: description,
            placement,
        });
    };

    const errorNotify = (placement, message, description) => {
        api.error({
            message: message,
            description: description,
            placement,
        });
    };

    return { contextHolder, infoNotify, errorNotify }
}