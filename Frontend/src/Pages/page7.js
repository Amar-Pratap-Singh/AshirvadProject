import { React } from 'react';
import Navbar from '../Navbar';

function Page7(props){

    function handleButtonClick(){
        const form = document.getElementById("page");
        form.addEventListener('submit', moveToNextPage);
    
        async function moveToNextPage(event){
            event.preventDefault();
    
            const complaintID = props.pageComplaintID;
            const currentStatus = props.pageComplaintStatus;
            const plumberUsername = props.userDetails.userName;
            const temp = "submit";
            
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
            props.navigator("page-6", true);
            // console.log("Status Changed: ",result.status);
        }
    }


    return (
        <div>
            <Navbar props={props}/>
           
            <div class="center_div">
                <h1>Job-Card</h1>

                <form id="page">
                    <input type="textbox" id="job-card" name="job-card" placeholder="Enter Something"></input>
                    <button class="btn btn-primary" onClick={handleButtonClick} name="Resume" type="submit">Submit</button>
                </form>
            </div>        
        </div>
    );
}

export default Page7;