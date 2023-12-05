import { openModal } from '@/redux/modal';
import { searchTask } from '@/services/task';
import { Input, Avatar, List } from 'antd';
import { debounce, set } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const { VITE_ORIGIN } = import.meta.env

export default function SearchTask() {

    const [listTasks, setListTasks] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        function closeSearchPopup(e) {
            setListTasks([])
        }

        window.addEventListener('click', closeSearchPopup)

        return () => {
            window.removeEventListener('click', closeSearchPopup)
        }
    }, [])

    const handleSearch = useCallback(debounce(async (e) => {
        try {
            let res = await searchTask(e.target.value);
            let data = res.data
            setListTasks(data)
        } catch (error) {
        }

    }, 1000), [])

    const handleClick = (item) => {
        dispatch(openModal(item))
    }


    const result = (
        listTasks.length > 0 ? <List
            style={{
                position: 'absolute',
                top: '50px',
                width: '100%',
                zIndex: 1,
                backgroundColor: '#fff',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            }}
            itemLayout="horizontal"
            dataSource={listTasks}
            renderItem={(item, index) => (
                <List.Item
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClick(item)
                    }}
                >
                    <List.Item.Meta
                        avatar={<Avatar src={`${VITE_ORIGIN}${item?.attributes?.image?.data?.attributes?.url}`} />}
                        title={item?.id}
                        description={item?.attributes?.title}
                    />
                </List.Item>
            )}
        /> : null
    )

    return (<>
        <div className="board-search">
            <Input
                onChange={handleSearch}
                type="search" className="board-search-input" aria-label="Board Search" />
            <i className="fas fa-search search-icon" aria-hidden="true"></i>
            {result}
        </div>
    </>)
}