import { Button, Result } from 'antd';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {

    const error = useRouteError();
    console.log(error);
    return (<>
        <Result
            status={error.status}
            title={error.statusText}
            subTitle={error.statusText}
            extra={<Button type="primary">Back Home</Button>}
        />
    </>)
}