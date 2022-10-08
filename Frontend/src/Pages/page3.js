import { React } from 'react';


function Page3(props){

    function handleButtonClick(){
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

            props.navigator("page-4", true);
            // console.log("Status Changed: ",result.status);
        }
    }


    function cancelComplaint(){
        props.navigator("view-accepted-complaints", true);
    }

    return (
        <div class="center_div">
            <h1>Raise a Quotation</h1>

            <form id="page">
                <button class="btn btn-primary" onClick={handleButtonClick} name="RaiseQuotation" type="submit">Raise a Quotation</button>
                <button class="btn btn-primary" onClick={cancelComplaint} name="Cancel" type="submit">Cancel</button>
            </form>
        </div>        
    );
}

export default Page3;