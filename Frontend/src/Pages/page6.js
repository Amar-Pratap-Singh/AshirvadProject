import { React } from 'react';


function Page6(props){

    function cancelComplaint(){
        props.navigator("view-accepted-complaints", true);
    }

    return (
        <div class="center_div">
            <h1>Close the complaint</h1>

            <form id="page">
                <button class="btn btn-primary" onClick={cancelComplaint} name="Cancel" type="submit">Cancel</button>
            </form>
        </div>        
    );
}

export default Page6;