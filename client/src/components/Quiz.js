import React, { useEffect, useState } from 'react'
import Questions from './Questions'

import {useSelector, useDispatch} from 'react-redux'
import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion'
import { Navigate } from 'react-router-dom'
import { pushResultAction } from '../redux/result_reducer'
export default function Quiz() {
   
  const [check,setchecked] = useState(undefined)

  const result = useSelector(state => state.result.result);
  const {queue , trace} = useSelector(state => state.questions)
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  useEffect(() => {
  console.log(state)
  })
  
   function onPrev(){
    //console.log('on prev click')
    if(trace > 0 ){
    dispatch(MovePrevQuestion())}
   }

   function onNext(){
    //console.log("on next click")
    if(trace < queue.length){
      if(result.length <= trace){
    dispatch(pushResultAction(check))}
    dispatch(MoveNextQuestion())}

    setchecked(undefined)
   }
  
   function onChecked(check) {
    setchecked(check)
      //console.log(check)
   }

   if(result.length && result.length >= queue.length){
    return <Navigate to={'/result'} replace={true}></Navigate>
}

  return (
    <div className='container'> 
      <h1 className='title text-light'>Quiz Application</h1>

    
    <Questions onChecked={onChecked}/>

      <div className='grid'>
        {trace > 0 ? <button className='btn prev' onClick={onPrev}>prev</button> : <div></div>}
        {trace < (queue.length-1) ?  <button className='btn next' onClick={onNext}>Next</button>: <button className='btn next' onClick={onNext}>Submit</button>}
       
      </div>
    </div>
  )
}
