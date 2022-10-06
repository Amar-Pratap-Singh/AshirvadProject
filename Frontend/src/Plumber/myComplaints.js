import React from 'react';
import ComplaintCard from '../ComplaintCard';
import Navbar from '../Navbar';


function MyComplaints(props){

    return (
        <div>
            <Navbar props={props}/>

            <div class="center_div">
                <h1>My Complaints</h1>
                
                {Object.entries(props.assignedComplaints).map((key, value) => (
                    <div>
                        <ComplaintCard customerUsername={props.customers[key[0]]} complaintID={props.assignedComplaintIDs[key[0]]} complaint={key[1]} />
                    <br></br>
                    </div>
                ))}
                
                {/* tasks goes here */}
             
            </div>
        </div>
    );
}

export default MyComplaints;