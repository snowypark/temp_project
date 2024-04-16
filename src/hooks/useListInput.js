import { useState } from "react"

export const useListInput = (input) => {
    const [ value, setValue ] = useState([]);
    const [ temp, setTemp ] = useState();
    const handleOnChange = (e) => {
        setTemp(() => e.target.value);
    }

    const handleOnKeyDown = (e) => {
        if(e.keyCode === 13) {
            enterFn(ref);
        }
    }

    return { value, handleOnChange, handleOnKeyDown, setValue };
}