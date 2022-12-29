import { React } from 'react';
import Navbar from '../Navbar';

function Page6(props){

    function cancelComplaint(){
        props.navigator("view-accepted-complaints", true);  
    }

    return (
        <div>
            <Navbar props={props}/>
            
            <div class="center_div">
                <h1>Close the complaint</h1>

                <form id="page">
                    <button class="btn btn-primary" onClick={cancelComplaint} name="Cancel" type="submit">Cancel</button>
                </form>
            </div>        
        </div>
    );
}

export default Page6;