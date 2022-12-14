import { React } from 'react';
import Navbar from '../Navbar';

function Page4(props){

    function handlePauseButtonClick(){
        
        const form = document.getElementById("page");
        form.addEventListener('submit', moveToNextPage);
        
        async function moveToNextPage(event){
            event.preventDefault();

            const complaintID = props.pageComplaintID;
            const currentStatus = props.pageComplaintStatus;
            const plumberUsername = props.userDetails.userName;
            const temp = "";
            
            console.log("ComplaintID: ", complaintID);
            console.log("currentStatus: ", currentStatus);
            console.log("Plumber Username: ", plumberUsername);
            
            const result = await fetch("http://localhost:8080/NextPage", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    complaintID,
                    currentStatus,
                    plumberUsername,
                    temp
                })
            }).then((res) => res.json());

            props.setPageComplaintStatus(result.updatedStatus);
            
            props.setComplaintsStatusArray(result.complaintStatusArray);

            props.navigator("page-5", true);
        }
    }


    function handleDoneButtonClick(){
        // go to feedback (fill job cart)
        props.navigator("page-7", true);
    }


    function cancelComplaint(){
        props.navigator("view-accepted-complaints", false);
    }

    return (
        <div>
            <Navbar props={props}/>
            <div class="center_div">
                <h1>What to do with selected complaint?</h1>

                <form id="page">
                    <button class="btn btn-primary" onClick={handlePauseButtonClick} name="Pause" type="submit">Pause</button>
                    <button class="btn btn-primary" onClick={handleDoneButtonClick} name="Done" type="submit">Done</button>
                    <button class="btn btn-primary" onClick={cancelComplaint} name="Cancel" type="submit">Cancel</button>
                </form>
            </div>        
        </div>
    );
}

export default Page4;