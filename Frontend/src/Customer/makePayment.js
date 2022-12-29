import React from 'react';
import Navbar from '../Navbar';

function MakePayment(props) {


    function makePayment() {
        const form = document.getElementById("page");
        form.addEventListener('submit', payBill);

        async function payBill(event) {
            event.preventDefault();

            const complaintID = props.complaintID;
            const amountToPay = document.getElementById("AmountToPay").value;

            const result = await fetch("http://localhost:8080/MakePayment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    complaintID,
                    amountToPay
                })
            }).then((res) => res.json());

            alert("Payment Done!!");
            console.log(result.status);
            props.navigator("customer-dashboard", true);
            // props.setJobCard(result.jobCardDetails);
        }
    }

    // Need to add total bill amount 

    return (
        <div>
            <Navbar props={props} />

            <div class="center_div">
                <h1>Invoice</h1>

                <div class="container">
                    <div class="card">
                        <div class="card-header">
                            Invoice:
                            <strong> {props.complaintID + props.jobCard.plumberUsername}  </strong>
                            <span class="float-right"> <strong>Status:</strong> {props.jobCard.paid ? "Done" : "Pending"} </span>
                        </div>

                        <div class="card-body">
                            <div class="row mb-4">
                                <div class="col-sm-6">
                                    <h6 class="mb-3">Raised By:</h6>
                                    <div>
                                        <strong>{props.jobCard.username}</strong>
                                    </div>
                                    {/* <div></div> */}
                                    {/* <div>71-101 Szczecin, Poland</div> */}
                                    {/* <div>Email: </div> */}
                                    <div>Phone: {props.jobCard.contact}</div>
                                </div>

                                <div class="col-sm-6">
                                    <h6 class="mb-3">Serviced By:</h6>
                                    <div>
                                        <strong>{props.jobCard.plumberUsername}</strong>
                                    </div>
                                    {/* <div>43-190 Mikolow, Poland</div> */}
                                    {/* <div>Email: marek@daniel.com</div> */}
                                    {/* <div>Phone: +48 123 456 789</div> */}
                                </div>



                            </div>

                            <div class="table-responsive-sm">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th class="center">#</th>
                                            <th>Item</th>
                                            <th>Provided By</th>

                                            <th class="right">Unit Cost</th>
                                            <th class="center">Qty</th>
                                            <th class="right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="center">1</td>
                                            <td class="left strong">{props.jobCard.quotation}</td>
                                            <td class="left">Plumber</td>

                                            <td class="right">{props.jobCard.quotationAmount}</td>
                                            <td class="center">1</td>
                                            <td class="right">{props.jobCard.quotationAmount}</td>
                                        </tr>

                                        {props.jobCard.purchaseTypeHistory.map((purchase, index) => (
                                            <tr>
                                                <td class="center">{Number(index) + 2}</td>
                                                <td class="left strong">{props.jobCard.purchaseDetailsHistory[index]}</td>
                                                <td class="left">{purchase}</td>

                                                <td class="right">{props.jobCard.purchaseCostHistory[index]}</td>
                                                <td class="center">1</td>
                                                <td class="right">{props.jobCard.purchaseCostHistory[index]}</td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                            <div class="row">
                                <div class="col-lg-4 col-sm-5">

                                </div>

                                <div class="col-lg-4 col-sm-5 ml-auto">
                                    <table class="table table-clear">
                                        <tbody>
                                            <tr>
                                                <td class="left">
                                                    <strong>Subtotal</strong>
                                                </td>
                                                <td class="right">₹ {props.jobCard.billAmount}</td>
                                            </tr>
                                            <tr>
                                                <td class="left">
                                                    <strong>Discount (0%)</strong>
                                                </td>
                                                <td class="right">₹ 0</td>
                                            </tr>
                                            <tr>
                                                <td class="left">
                                                    <strong>GST (10%)</strong>
                                                </td>
                                                <td class="right">₹ {Number(props.jobCard.billAmount) * 0.10}</td>
                                            </tr>
                                            <tr>
                                                <td class="left">
                                                    <strong>Total</strong>
                                                </td>
                                                <td class="right">
                                                    <strong>₹ {Number(props.jobCard.billAmount) * 1.1}</strong>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>

                            </div>

                        </div>
                    </div>
                    <br></br>
                </div>
                
                <form id="page">

                    <div class="form-group">
                        <label for="AmountToPay">Amount</label>
                        <div class="col-8">
                            <input type="number"  value={Number(props.jobCard.billAmount) * 1.1} class="form-control rounded-0" id="AmountToPay" />
                        </div>
                    </div>

                    <button class="btn btn-primary" onClick={makePayment} name="Pay" type="submit">Proceed To Pay</button>
                </form>
            </div>


            </div>
    );
}

export default MakePayment; 
