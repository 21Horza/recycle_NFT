import React, { useState } from 'react'
import styles from './task_1.css'
import yellow_can from '../assets/cans/yellow.png'
import green_can from '../assets/cans/green.png'
import red_can from '../assets/cans/red.png'
import brown_can from '../assets/cans/brown.png'
import blue_can from '../assets/cans/blue.png'
import MyModal from '../modals/MyModal'
import thumb_up from '../assets/thumb_up.png'
import { CHALLENGE_TWO } from '../routes/consts'
import { useNavigate } from 'react-router-dom'

const Task1 = () => {
  const [cardList, setCardList] = useState([
      {id: 1, order: 4, text: 'Glass'},
      {id: 2, order: 3, text: 'Plastic'},
      {id: 3, order: 1, text: 'Food'},
      {id: 4, order: 5, text: 'Metal'},
      {id: 5, order: 2, text: 'Paper'},
    ])
    
  const cansList = [
    {id: 1, order: 1, text: 'Plastic', img: blue_can},
    {id: 2, order: 2, text: 'Paper', img: green_can},
    {id: 3, order: 3, text: 'Glass', img: yellow_can},
    {id: 4, order: 4, text: 'Metal', img: red_can},
    {id: 5, order: 5, text: 'Food', img: brown_can},
  ]

  const navigate = useNavigate()
  function handleClick() {
    navigate(CHALLENGE_TWO)
  }

  const value = 'Go next'
  const text = 'The next challenge is waiting for you!'
  const title = 'Good job!'
  
  const answer = cansList.map(({img, order, id,  ...can}) => can.text)
    // console.log(JSON.stringify(answer))

  let newCardList = cardList.map(({id, order, ...card}) => card.text)
    // console.log(JSON.stringify(newCardList))

  let is_true = JSON.stringify(answer) === JSON.stringify(newCardList);
    // console.log(is_true)

  
    const [currentCard, setCurrentCard] = useState(null)
    
    function dragStartHandler (e, card) {
      setCurrentCard(card)
    }
    
    function dragEndHandler (e) {
      e.target.style.background = ''
    }
    
    function dragOverHandler (e) {
      e.preventDefault()
      e.target.style.background = '#2b41ed'
    }
    
    function dropHandler (e, card) {
      e.preventDefault()
      setCardList(cardList.map(c => {
        if(c.id === card.id) {
          return {...c, order: currentCard.order}
        }
        if (c.id === currentCard.id) {
          return {...c, order: card.order}
        }
        return c
      }))
      e.target.style.background = ''
    }
      
    const sortCards = (a, b) => {
      if (a.order > b.order) {
        return 1
      } else {
        return -1
      }
    }

  return (
    <>
       <div className='container'>
        <h1>Challenge #1</h1>
        <h2 style={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
          Identify each garbage can's title
          </h2>

        <div style={{marginTop: '2rem'}} className='cans'>
            {cansList.map(can => 
              <div
                key={can.id}
                className='can'>
                <img height={300} width={200} src={can.img} />
              </div>
              )}
        </div>
        <div className='cards'>
            {cardList.sort(sortCards).map(card => 
              <div
                key={card.id}
                onDragStart={(e) => dragStartHandler(e, card)}
                onDragLeave={(e) => dragEndHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, card)}
                draggable={!is_true ? 'true' : 'false'}
                style={!is_true ? {backgroundColor: ''} : {backgroundColor: 'green'}}
                className='card'>
                {card.text}
              </div>
              )}
        </div>
      </div>
      {is_true &&
      <MyModal 
        gonext={handleClick}
        value={value} 
        text={text} 
        title={title} 
        pic={thumb_up}/>
      }
    </>
  )
}

export default Task1