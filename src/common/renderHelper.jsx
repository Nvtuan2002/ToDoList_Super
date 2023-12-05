import { Button, Result, Spin } from 'antd';
export function render(loading, error, element, btn = <Button type="primary">Back Home</Button>){
    if(error){
      return  <Result
      status="500"
      title="500"
      subTitle={error.message}
      extra={btn}
    />
    }
  
    return <Spin tip="Loading" size="large" spinning={loading}>
      {element}
    </Spin>
}