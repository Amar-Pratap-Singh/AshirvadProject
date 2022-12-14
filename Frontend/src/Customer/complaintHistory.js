import React from 'react';
import Navbar from '../Navbar';
import HistoryCard from '../HistoryCard';

function ViewComplaintHistory(props){

    return (
        <div>
            <Navbar props={props} />
            
            <div class="center_div">
                <h1>Your Complaints</h1>

                {props.userComplaintsHistory.map((complaintData, index) => (
                    <div>
                        <HistoryCard 
                        index={index}
                        id={complaintData.id} 
                        complaint={complaintData.complaint}
                        status={complaintData.status}
                        navigator={props.navigator}
                        setComplaintID={props.setComplaintID}
                        />
                        <br></br>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewComplaintHistory;