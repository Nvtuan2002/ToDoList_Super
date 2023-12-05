import TaskList from '@/components/TaskList';
import { DatePicker, Form } from 'antd';
import { useDispatch } from 'react-redux';
import { updateFilterDate } from '@/redux/taskList';
const { RangePicker } = DatePicker;
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import dayjs from 'dayjs';

export default function Home() {
    const dispatch = useDispatch()
    const [query, setQuery] = useSearchParams()
    const [form] = Form.useForm()

    function convertQueryToObject() {
        let queryObj = {}
        query.forEach((value, key) => {
            queryObj[key] = value
        })

        return queryObj
    }

    const onChangeRangePicker = (values) => {
        let queryObj = convertQueryToObject()

        if (!values) {
            values = [null, null]
        }
        let startDate = values[0]?.format('YYYY-MM-DD')
        let endDate = values[1]?.format('YYYY-MM-DD')

        if (startDate && endDate) {
            queryObj.startDate = startDate
            queryObj.endDate = endDate
        } else {
            delete queryObj.startDate
            delete queryObj.endDate
        }
        setQuery(queryObj)
    }

    useEffect(() => {
        let { startDate, endDate } = convertQueryToObject()
        if (startDate && endDate) {

        } else {
            startDate: null
            endDate: null
        }

        dispatch(updateFilterDate({
            startDate: startDate,
            endDate: endDate,
        }))
        startDate = startDate ? dayjs(startDate) : null
        endDate = endDate ? dayjs(endDate) : null
        form.setFieldsValue({
            date: [startDate, endDate]
        })
    }, [query])

    return (<>
        <section className="lists-container">
            <Form form={form}>
                <Form.Item name='date'>
                    <RangePicker
                        onChange={onChangeRangePicker}
                    />
                </Form.Item>
            </Form>
            <TaskList title="Công việc đã hoàn thành" topic="done" />
            <TaskList title="Công việc chưa hoàn thành" topic="doing" />
        </section>
    </>)
}