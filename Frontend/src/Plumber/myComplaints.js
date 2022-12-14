import React from 'react';
import ComplaintCard from '../ComplaintCard';
import Navbar from '../Navbar';
import { useState } from 'react';

function MyComplaints(props){

    const [complaints, setComplaints] =  useState(props.assignedComplaints);
    const [complaintIDs, setComplaintIDs] = useState(props.assignedComplaintIDs);

    return (
        <div>
            <Navbar props={props}/>

            <div class="center_div">
                <h1>My Complaints</h1>
                
                {complaints.map((complaint, index) => (
                    <div>
                        <ComplaintCard 
                        index={index} 
                        plumberUsername={props.userDetails.userName} 
                        complaints={complaints} 
                        complaintIDs={complaintIDs} 
                        setComplaintIDs={setComplaintIDs} 
                        setComplaints={setComplaints} 
                        customerUsername={props.customers[index]} 
                        complaintID={complaintIDs[index]} 
                        complaint={complaint} />
                        <br></br>
                    </div>
                ))}
             
            </div>
        </div>
    );
}

export default MyComplaints;