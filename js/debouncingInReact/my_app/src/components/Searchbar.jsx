import React, { useCallback, useState } from 'react'

export default function Searchbar() {
    const [search, setSearch] = useState([]);

    const handleSearch = (e) =>{
        const {value} = e.target;
        fetch( `https://demo.dataverse.org/api/search?q=${value}`)
            .then(res => res.json())
            .then(json => setSearch(json.data.items));
    }

    const debounce = (fn) =>{
        let timer;
        return function(...args) {
            const context = this;
            if(timer) clearTimeout(timer);
            timer = setTimeout(()=>{
                timer = null;
                fn.apply(context, args);
            }, 500);
        }
    }

    const optimisedHandleSearch = useCallback(debounce(handleSearch))
  return (
    <div className='searchbar'>
        <input type="text" name='search' placeholder='Type Something' className='search' onChange={optimisedHandleSearch} />
        {
            search?.length > 0 && 
            <div className='autocomplete'>
                {search?.map((el, i) =>
                <div key={i} className='autocomplete-items'>
                    <span>{el.name}</span>
                </div>
                )}
            </div>
        }
        
    </div>
  )
}
