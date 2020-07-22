import React from 'react';
import './PopUp.css';


const PopUp = () => {

        const closeModal = () => {

        const closeModalButton = document.querySelector('.modalClosingButton');

        setTimeout(() => {

        closeModalButton.click();
              
        }, 4000);
        
    }

    return (  

        <div >
        <button 
            type="button"
            className="navbar-enter-btn"
            data-toggle="modal"
            data-target="#rounds"
            onClick={() => closeModal()}
        >
            show popup
        </button>

        <div
            className="modal fade"
            id="rounds"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
        >
            <div
                className="modal-dialog modal-dialog-centered"
                role="document"
            >
                <div className="popUp">

                   
                    <div >
                    <h2>Whats the name of the song?</h2>
                        <button 
                            type="button"
                            className="close modalClosingButton"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    
                                        
                </div>
            </div>
        </div>
    </div>

     )
    };

export default PopUp;