import React, {useState, useEffect} from 'react';
import './PopUp.css';



const PopUp = (props) => {

    const [timeLeft, setTimeLeft] = useState(5);
    const [popUpClass, setPopUp] = useState('none')

    const closeModal = () => {

        setTimeLeft(5)   
        setPopUp('popUp') 
        
    }

    useEffect(() => {
        if(timeLeft===0){
           console.log("TIME LEFT IS 0");
           setTimeLeft(null)
        }
       
        if (!timeLeft) return;
     
        
        const intervalId = setInterval(() => {
     
          setTimeLeft(timeLeft - 1);
        }, 1000);
     
      
        return () => clearInterval(intervalId);
      
      }, [timeLeft]);

    return (  

    <div >
        <button className={ popUpClass == 'popUp' ? 'none' : props.popButton}
           
            onClick={() => closeModal()}
        >
            {props.popText}
        </button>

      
        <div className={popUpClass}>

            <div >
            <h2 className={'popHead'}>Whats the name of the song? </h2>
            <p className={'timer2'}>{timeLeft}</p>
            </div>                
                                
        </div>
        
        
    </div>

     )
    };

export default PopUp;