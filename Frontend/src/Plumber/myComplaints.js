import React from 'react';
import ComplaintCard from '../ComplaintCard';
import Navbar from '../Navbar';
import { useState } from 'react';

function MyComplaints(props){

    const [complaints, setComplaints] =  useState(props.assignedComplaints);

    return (
        <div>
            <Navbar props={props}/>

            <div class="center_div">
                <h1>My Complaints</h1>
                
                {complaints.map((complaint, index) => (
                    <div>
                        <ComplaintCard index={index} complaints={complaints} setComplaints={setComplaints} customerUsername={props.customers[index]} complaintID={props.assignedComplaintIDs[index]} complaint={complaint} />
                        <br></br>
                    </div>
                ))}

                {/* {Object.entries(props.assignedComplaints).map((key, value) => ( 
                    <div>
                        <ComplaintCard customerUsername={props.customers[key[0]]} complaintID={props.assignedComplaintIDs[key[0]]} complaint={key[1]} />
                        <br></br>
                    </div>
                ))}  */}
                
                {/* tasks goes here */}
             
            </div>
        </div>
    );
}

export default MyComplaints;