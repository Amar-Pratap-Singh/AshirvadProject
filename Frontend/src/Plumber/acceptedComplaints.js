import { React } from 'react';
import Navbar from '../Navbar';
import Card from '../Card';

function AcceptedComplaints(props){
    
    return (
        <div>
            <Navbar props={props}/>

            <div class="center_div">
                <h1>Accepted Complaints</h1>
                
                {props.acceptedComplaints.map((complaint, index) => (
                    <div>
                        <Card 
                        index={index} 
                        customerUsername={props.customers[index]}
                        complaintID={props.acceptedComplaintIDs[index]} 
                        complaint={complaint} 
                        status={props.complaintsStatus[index]}
                        setComplaintIndex={props.setComplaintIndex}
                        setPageComplaintStatus={props.setPageComplaintStatus}
                        setPageComplaintID={props.setPageComplaintID}
                        navigator={props.navigator}
                        />
                        <br></br>
                    </div>
                ))}
            
            </div>
        </div>

    );
}

export default AcceptedComplaints;

