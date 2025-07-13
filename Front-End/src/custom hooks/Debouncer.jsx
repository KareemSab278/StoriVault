import {useState, useEffect} from 'react';


const useDebounce = (value, delay) => {
    const [debounceVal, setDebounceVal] = useState(value);

    useEffect(()=>{
        const timeoutId = setTimeout(() => {
            setDebounceVal(value);
        }, delay);

        return () => {clearTimeout(timeoutId)};
        }, [value, delay]);

        return debounceVal;
  } // created a custom hook for debouncing. this will make sure that theres a delay when typing not to overwork the api or slow down the site

export default useDebounce;