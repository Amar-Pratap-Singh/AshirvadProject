import { React } from 'react';
import Navbar from '../Navbar';


function Page3(props){

    function handleButtonClick(){
        const form = document.getElementById("page");
        form.addEventListener('submit', moveToNextPage);
    
        async function moveToNextPage(event){
            event.preventDefault();
    
            const complaintID = props.pageComplaintID;
            const currentStatus = props.pageComplaintStatus;
            const plumberUsername = props.userDetails.userName;
            const quotation = document.getElementById("Quotation").value; 
            const billingAmount = document.getElementById("BillingAmount").value; 
            const temp = "";
            
            console.log(quotation); 

            console.log("ComplaintID: ", complaintID);
            console.log("currentStatus: ", currentStatus);
            console.log("Plumber Username: ", plumberUsername);
            
            const result = await fetch("http://localhost:8080/Page3", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    complaintID,
                    currentStatus,
                    plumberUsername,
                    temp,
                    quotation,
                    billingAmount
                })
            }).then((res) => res.json());

            console.log("Updating oldStatus to ", result.updatedStatus, " in Page3");

            props.setPageComplaintStatus(result.updatedStatus);
            props.setComplaintsStatusArray(result.complaintStatusArray);

            props.navigator("page-4", true);
            // console.log("Status Changed: ",result.status);
        }
    }


    function cancelComplaint(){
        props.navigator("view-accepted-complaints", true);
    }

    function abandonComplaint(){
        const form2 = document.getElementById("page");
        form2.addEventListener('submit', abandonCustomerComplaint);
    
        async function abandonCustomerComplaint(event){
            event.preventDefault();
    
            const complaintID = props.pageComplaintID;
            
            const result = await fetch("http://localhost:8080/AbandonComplaint", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    complaintID
                })
            }).then((res) => res.json());

            props.navigator("plumber-dashboard", true);
        }
    }

    return (
        <div>
            <Navbar props={props} />

            <div class="center_div">
                <h1>Raise a Quotation</h1>

                <form id="page">
                    <div class="form-group">
                        <label for="Quotation">Quotation</label>
                        <div class="col-8">
                            <textarea class="form-control rounded-0" id="Quotation" rows="5"></textarea>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="BillingAmount">Bill Amount</label>
                        <div class="col-8">
                            <input type="number" class="form-control rounded-0" id="BillingAmount"></input>
                        </div>
                    </div>

                    <button class="btn btn-primary" onClick={handleButtonClick} name="RaiseQuotation" type="submit">Raise a Quotation</button>
                    <button class="btn btn-primary" onClick={abandonComplaint} name="Abandon" type="submit">Abandon</button>
                    <button class="btn btn-primary" onClick={cancelComplaint} name="Cancel" type="submit">Cancel</button>
                </form>
            </div>        
        </div>
    );
}

export default Page3;