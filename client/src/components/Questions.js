import React, { useEffect, useState } from 'react'
import { useFetchQestion } from '../hooks/FetchQuestion'
import { useSelector, useDispatch } from 'react-redux'
import { updateResult } from '../hooks/setResult'
export default function Questions({onChecked}) {

    const [checked,setChecked] = useState(undefined)
    const [{isLoading, apiData, serverError}] = useFetchQestion()

    const dispatch = useDispatch()
    const questions  = useSelector(state => state.questions.queue[state.questions.trace])
    const trace = useSelector(state => state.questions.trace)
    const result = useSelector(state => state.result.result)
    useEffect(() => {
          dispatch(updateResult({trace , checked}))
      })

    
     function onSelect(i){
      setChecked(i)
      onChecked(i)
     }
 
     if(isLoading) return <h3 className='text-light'>isLoading</h3>
     if(serverError) return <h3 className='text-light'>{serverError || "Unknown Error"}</h3>
  return (
    <div className='questions'>
        <h2 className='text-light'>{questions?.question}</h2>

        <ul key={questions?.id}>
            {
                questions?.options.map((q, i) => (
                    <li key={i}>
                        <input 
                            type="radio"
                            value={false}
                            name="options"
                            id={`q${i}-option`}
                            onChange={() => onSelect(i)}
                        />

                        <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
                        <div className={`check ${result[trace] == i ? 'checked' : ''}`}></div>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}
