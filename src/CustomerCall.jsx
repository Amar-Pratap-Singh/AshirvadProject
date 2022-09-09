import React from 'react';
import { Button } from 'react-bootstrap';

function CustomerCall(){

    async function serverConnect(){
        const result = await fetch("http://localhost:3700/api/buttonClick", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },

        }).then((res) => res.json());
    
        console.log(result.response);
    }


    return (
        <div>
            <Button onClick={serverConnect} class="btn btn-primary">
                Check Server Connection
            </Button>
        </div>
    );
}


export default CustomerCall;