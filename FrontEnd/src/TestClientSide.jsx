import React from 'react';


function TestClientSide(){

    function clientSide(){
        alert("This is client side!");
    }

    return (
        <button onClick={clientSide}>
            Check Client Module 
        </button>
    );
}


export default TestClientSide;