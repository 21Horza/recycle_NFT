import React, {useState, useEffect} from 'react'
import MyModal from '../modals/MyModal'
import styles from './task_2.css'
import { useNavigate } from 'react-router-dom'
import { mintNFT } from '../mint/mintingNFT'

const Task2 = () => {
  const navigate = useNavigate()
  const [userHasNFT, setuserHasNFT] = useState(false);

  useEffect(() => {
    const receivedNFT = async () => {
      console.log(
        await window.contract.check_token({
          id: `${window.accountId}-recycle-tok`,
        })
      );
      if (window.accountId !== "") {
        console.log(
          await window.contract.check_token({
            id: `${window.accountId}-recycle-tok`,
          })
        );

        setuserHasNFT(
          await window.contract.check_token({
            id: `${window.accountId}-recycle-tok`,
          })
        );
      }
    };
    receivedNFT();
  }, []);

  function handleClick() {
    mintNFT()
    navigate('/completed')
  }

  const [boards, setBoards] = useState([
    {id: 1, title: 'Recyclable', background: require('./../assets/recyclable.PNG'),  items: [{id: 1, title: 'Apple'}, {id: 2, title: 'Paper bags'}, {id: 3, title: 'Milk'}, {id: 4, title: 'Newspaper'}, {id: 5, title: 'Cans'}]},
    {id: 2, title: 'Non-recyclable', background: require('./../assets/non_recyclable.PNG'), items:[{id: 6, title: 'Fish'}, {id: 7, title: 'Soap'}, {id: 8, title: 'Plastics'}, {id: 9, title: 'Drinking straw'}, {id: 10, title: 'Aluminium foil'}]},
  ])

  const recyclableAnswer = ["Cans, Drinking straw, Newspaper, Paper bags, Plastics"]

  // for the modal
  const value = 'Mint NFT'
  const text = 'The Earth is in the save hands'
  const title = 'Awesome!'

  // get the recyclable board and leave only items object
  const recyclableBoard = boards.slice(0,1).map(({id, title, background, ...items}) => items)
  console.log(recyclableBoard)
  
  // drag items from the array, sort and put them into one line
  const finalData = recyclableBoard.map((item) => {
    return {
      itemType: item.items.map((i) => {
        return i.title;
      }).sort().join(', ')
    };
  });

  // get the result
  let result = finalData.map(data => data.itemType)

  // compare the board with the answer
  let is_true = JSON.stringify(recyclableAnswer) === JSON.stringify(result);

  /* drag handlers */
  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)

  function dragStartHandler (e, board, item) {
    setCurrentBoard(board)
    setCurrentItem(item)
  }
  
  function dragEndHandler (e) {
    e.target.style.boxShadow = 'none'
  }
  
  function dragLeaveHandler (e) {
    e.target.style.boxShadow = 'none'
  }
  
  function dragOverHandler (e) {
    e.preventDefault()
    if (e.target.className == 'item') {
      e.target.style.boxShadow = '0 4px 4px lightblue'
    }
  }

  function dropHandler (e, board, item) {
    e.preventDefault()
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex + 1, 0, currentItem)
    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))
  }

  function dropCardHandler (e, board) {
    board.items.push(currentItem)
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))
  }

  return (
    <>
    <h1>Challenge #2</h1>
    <h2 style={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
          Drag the items into the correct column
          </h2>
      <div className='boards__container'>
        {boards.map((board,id) => 
        <div 
            key={id}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropCardHandler(e, board)}
            className='board' 
            >
            <div className='board__title'>{board.title}</div>
            <img height={100} width={100} src={board.background}/>
            {board.items.map((item,id) => 
                <div 
                key={id}
                onDragStart={(e) => dragStartHandler(e, board, item)}
                onDragOver={(e) => dragOverHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDrop={(e) => dropHandler(e, board, item)}
                draggable={true}
                className='item'
                >
                  {item.title}
                </div>
              )}
        </div>
          )}
      </div>
    {is_true && <MyModal 
        userHasNFT={userHasNFT}
        gonext={handleClick}
        value={value} 
        text={text} 
        title={title} 
        pic={require('./../assets/save_earth.PNG')}/>
      }
    </>
  )
}

export default Task2