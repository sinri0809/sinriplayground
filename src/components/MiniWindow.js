const MiniWindow = ({detail, onClickWindow}) => {
  if(detail.open){
    const {index, title, text, date} = detail;

    return <div className='miniwindow'>
      <div className='miniwindow-container'>
        <div className='btn-top'>
          <button>수정</button>
          <button onClick={()=>onClickWindow(false)}>닫기</button>
        </div>
        
        <h4>{title}</h4>
        
        <div className='text-area'>
          <p>{text}</p>
        </div>
        
        <p>{date}</p>
      </div>
    </div>
  }
  else{
    return null;
  }
}

export default MiniWindow;