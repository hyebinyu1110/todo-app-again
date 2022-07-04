import './TodoInsert.scss';
import { MdAdd } from 'react-icons/md';
import { useState, useCallback } from 'react';

const TodoInsert = ({ onInsert }) => {
    const [value, setValue] = useState('');

    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);

    return (
        <form className="TodoInsert">
            <input placeholder="할 일을 입력하세요" value={value} onChange={onChange} />
            <button value="submit">
                <MdAdd />
            </button>
        </form>
    )
}


export default TodoInsert;