import React, {useContext} from 'react';
import  GlobalContext from '../context/GlobalContext';


export default function Labels() {
    const {labels, updatedLabel} = useContext(GlobalContext);
    return (
        <>
            <p className='text-gray-500 font-bold mt-10'>
                {labels.map(({label: lbl, checked}, idx) => {
                    return (
                        <label key={idx} className='items-center mt-3 block'>
                            <input type='checkbox' name={lbl} checked={checked} className={`form-checkbox h-5 ${ lbl === "indigo"
                      ? "text-indigo-500"
                      : lbl === "gray"
                      ? "text-gray-500"
                      : lbl === "green"
                      ? "text-green-500"
                      : lbl === "blue"
                      ? "text-blue-500"
                      : lbl === "red"
                      ? "text-red-500"
                      : "text-purple-500"} rounded focus:ring-0 cursor-pointer`}
                      onClick={()=> updatedLabel({label : lbl, checked: !checked})}/>
                            <span className='ml-2 text-gray-700 capitalize'>{lbl}</span>
                        </label>
                    )
                })}
            </p>
        </>
    )
}
