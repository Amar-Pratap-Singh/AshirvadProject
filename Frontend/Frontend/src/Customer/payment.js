import React from 'react';
import Navbar from '../Navbar';

function Payment(props){

    function makePayment(){
        const form = document.getElementById("page");
        form.addEventListener('submit', payBill);

        async function payBill(event) {
            event.preventDefault();

            const complaintID = props.complaintID;

            const result = await fetch("http://localhost:8080/FillJobCard", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    complaintID
                })
            }).then((res) => res.json());

            props.setJobCard(result.jobCardDetails);
            props.navigator("make-payment", true);
            // props.setJobCard(result.jobCardDetails);
        }
    }

    return (
        <div>
            <Navbar props={props}/>
            <div class="center_div">
                <h1>Choose Your Payment Method</h1>

                <form id="page">
                    <div class="col-8">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="PayVia" id="PayThroughUPI" value="option1" />
                            <label class="form-check-label" for="RadioLoginAsCustomer">
                                UPI
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="PayVia" id="PayThroughCard" value="option2" />
                            <label class="form-check-label" for="RadioLoginAsPlumber">
                                Debit Card/ Credit Card
                            </label>
                        </div>
                        
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="PayVia" id="PayThroughNetBanking" value="option3" />
                            <label class="form-check-label" for="RadioLoginAsManager">
                                Net Banking
                            </label>
                        </div>
                    <br></br>
                    </div>

                    <button class="btn btn-primary" onClick={makePayment} name="makePayment" type="submit">Proceed to Pay</button>
                </form>
            </div>        
        </div>
    );
}

export default Payment;