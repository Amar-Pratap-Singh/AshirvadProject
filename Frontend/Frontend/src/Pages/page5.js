import { React } from 'react';
import Navbar from '../Navbar';

function Page5(props){


    function showHidden(){
        var isChecked = document.getElementById("PartsFromCompany").checked;

        if (isChecked){
            document.getElementById("PartsPurchaseFromCompany").style.display = "block";
        }
        else{
            document.getElementById("PartsPurchaseFromCompany").style.display = "none";
        }

        isChecked = document.getElementById("PartsFromOutside").checked;
    
        if (isChecked){
            document.getElementById("PartsPurchaseFromOutside").style.display = "block";
        }
        else{
            document.getElementById("PartsPurchaseFromOutside").style.display = "none";
        }
    }

    // function showHidden2(){

    // }


    function handleButtonClick(){
        const form = document.getElementById("page");
        form.addEventListener('submit', moveToNextPage);
    
        async function moveToNextPage(event){
            event.preventDefault();
    
            const complaintID = props.pageComplaintID;
            const currentStatus = props.pageComplaintStatus;
            const plumberUsername = props.userDetails.userName;
            const temp = "";
            
            var purchaseDetails = "";
            var billAmount = 0;

            // purchaseType = {Customer, Company, Outside} 
            var purchaseType = "Customer";

            if (document.getElementById("PartsFromCompany").checked){
                purchaseDetails = document.getElementById("PartsFromCompanyTextbox").value;
                billAmount = document.getElementById("BillingAmountCompany").value;
                purchaseType = "Company";
            }
            else if (document.getElementByID("PartsFromOutside").checked){
                purchaseDetails = document.getElementById("PartsFromOutsideTextbox").value;
                billAmount = document.getElementById("BillingAmountOutside").value;
                purchaseType = "Outside";
            }

            console.log("ComplaintID: ", complaintID);
            console.log("currentStatus: ", currentStatus);
            console.log("Plumber Username: ", plumberUsername);
            console.log("Purchase Details: ", purchaseDetails);
            
            const result = await fetch("http://localhost:8080/Page5", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    complaintID,
                    currentStatus,
                    plumberUsername,
                    temp,
                    purchaseType,
                    purchaseDetails,
                    billAmount
                })
            }).then((res) => res.json());

            props.setPageComplaintStatus(result.updatedStatus);
            
            props.setComplaintsStatusArray(result.complaintStatusArray);

            props.navigator("page-4", true);
            // console.log("Status Changed: ",result.status);
        }
    }


    function cancelComplaint(){
        console.log("Cancelling the complaint");
        props.navigator("view-accepted-complaints", true);
    }

    return (
        <div>
            <Navbar props={props}/>
            
            <div class="center_div">
                <h1>What after pause?</h1>

                <form id="page">

                    <div class="form-group">

                            {/* Parts if provided by the customer */}
                            <div class="form-check">
                                <input onClick={showHidden} class="form-check-input" type="radio" name="PartsFrom" id="PartsFromCustomer" value="option1" />
                                <label class="form-check-label" for="PartsFromCustomer">
                                    Parts Provided By Customer
                                </label>
                            </div>


                            {/* Parts if bought from the company */}
                            <div class="form-check">
                                <input onClick={showHidden} class="form-check-input" type="radio" name="PartsFrom" id="PartsFromCompany" value="option2" />
                                <label class="form-check-label" for="PartsFromCompany">
                                    Parts Bought From Company
                                </label>
                            </div>
                        
                            <div id="PartsPurchaseFromCompany" class="PartsPurchaseFromCompany form-check">
                                <div class="form-group">
                                    <label for="PartsFromCompanyTextbox">Details of Parts Purchased</label>
                                    <div class="col-8">
                                        <textarea class="form-control rounded-0" id="PartsFromCompanyTextbox" rows="5"></textarea>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="BillingAmountCompany">Bill Amount</label>
                                    <div class="col-8">
                                        <input type="number" class="form-control rounded-0" id="BillingAmountCompany"></input>
                                    </div>
                                </div>
                            </div>

                            
                            
                            {/* Parts if bought from outside*/}
                            <div class="form-check">
                                <input onClick={showHidden} class="form-check-input" type="radio" name="PartsFrom" id="PartsFromOutside" value="option3" />
                                <label class="form-check-label" for="PartsFromOutside">
                                    Parts Bought From Outside
                                </label>
                            </div>

                            <div id="PartsPurchaseFromOutside" class="PartsPurchaseFromOutside form-check">
                                <div class="form-group">
                                    <label for="PartsFromOutsideTextbox">Details of Parts Purchased</label>
                                    <div class="col-8">
                                        <textarea class="form-control rounded-0" id="PartsFromCompanyTextbox" rows="5"></textarea>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="BillingAmountOutside">Bill Amount</label>
                                    <div class="col-8">
                                        <input type="number" class="form-control rounded-0" id="BillingAmountOutside"></input>
                                    </div>
                                </div>
                            </div>

                        </div>
                    {/* </div> */}

                    <button class="btn btn-primary" onClick={handleButtonClick} name="Resume" type="submit">Resume</button>
                    <button class="btn btn-primary" onClick={cancelComplaint} name="Cancel" type="submit">Cancel</button>
                </form>
            </div>        
        </div>
    );
}

export default Page5;