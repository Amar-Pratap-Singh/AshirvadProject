import React from 'react';

function TestDemo(props){


    function testCases(){

        const result = fetch("http://localhost:8080/SetUpDatabase", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json());

        props.navigator('home-screen-page', false);
    }

    return (
        <div class="center_div">

            <h1>TestCases</h1>

            <div onClick={testCases} class="test-card card text-black bg-light mb-3">
                <div class="card-header">TestCase1</div>
            
                <div class="card-body">
                    <h5 class="card-title">Raise Cancel</h5>
                    <p class="card-text">Customer can raise a complaint and can also cancel it just after raising.</p>
                </div>
            </div>

            <div onClick={testCases} class="test-card card text-white bg-dark mb-3">
                <div class="card-header">TestCase2</div>
            
                <div class="card-body">
                    <h5 class="card-title">Raise Assign Cancel</h5>
                    <p class="card-text">Customer can raise a complaint and can also cancel it after it is being assigned to a plumber.</p>
                </div>
            </div>

            <div onClick={testCases} class="test-card card text-black bg-light mb-3">
                <div class="card-header">TestCase3</div>
            
                <div class="card-body">
                    <h5 class="card-title">Complaint abandoned due to high quotation raised by plumber</h5>
                    <p class="card-text">Customer can abandon the complaint based on plumber's quotation.</p>
                </div>
            </div>

            <div onClick={testCases} class="test-card card text-white bg-dark mb-3">
                <div class="card-header">TestCase4</div>
            
                <div class="card-body">
                    <h5 class="card-title">Complaint Closed Successfully without Pause state</h5>
                    <p class="card-text">Complaint can go smoothly and is executed without buying extra parts for plumbing service.</p>
                </div>
            </div>

            <div onClick={testCases} class="test-card card text-black bg-light mb-3">
                <div class="card-header">TestCase5</div>
            
                <div class="card-body">
                    <h5 class="card-title">Customer is not satisifed, complaint raised again</h5>
                    <p class="card-text">Customer may not be satisfied with the end result and re-raise the complaint.</p>
                </div>
            </div>


            <div onClick={testCases} class="test-card card text-white bg-dark mb-3">
                <div class="card-header">TestCase6</div>
            
                <div class="card-body">
                    <h5 class="card-title">Complaint Closed Successfully through Pause State</h5>
                    <p class="card-text">Plumber or the customer bought some spare parts to successfully execute the complaint.</p>
                </div>
            </div>

        </div>
    );
}

export default TestDemo;