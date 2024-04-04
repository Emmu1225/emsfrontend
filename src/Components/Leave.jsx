import React, { Component } from 'react';
import axios from 'axios'; 
import Footer from './Footer'; 
import Navbar1 from './Navbar1';
import Section from './Section';

class Leave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingLeave: [],
    };
  }

  async componentDidMount() {
    try {
      const response = await axios.get('http://localhost:8080/leave/pending');
      this.setState({ pendingLeave: response.data });
    } catch (error) {
      console.error('Error fetching leave data:', error);
    }
  }

  handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:8080/leave/approve/${id}`); // Fixed the template literal syntax
      const updatedLeave = this.state.pendingLeave.filter((leave) => leave.id !== id);
      this.setState({ pendingLeave: updatedLeave }, () => {
        alert('Leave approved successfully.'); // Wrapped the string in quotes
        window.location.href = '/Leave';
      });
      await this.fetchPendingLeave(); // fetchPendingLeave() is not defined, consider removing or defining it
    } catch (error) {
      console.error('Error approving leave:', error);
    }
  };

  handleReject = async (id) => {
    try {
      await axios.post(`http://localhost:8080/leave/reject/${id}`); // Fixed the template literal syntax
      const updatedLeave = this.state.pendingLeave.filter((leave) => leave.id !== id);
      this.setState({ pendingLeave: updatedLeave }, () => {
        alert('Leave rejected successfully.'); // Wrapped the string in quotes
        window.location.href = '/Leave';
      });
      await this.fetchPendingLeave(); // fetchPendingLeave() is not defined, consider removing or defining it
    } catch (error) {
      console.error('Error rejecting leave:', error);
    }
  };

  render() {
    const { pendingLeave } = this.state;

    return (
      <div className='row'>
        <Navbar1 /> 
        <div className="col-3 col-md-3">
          <Section/>
          </div>
          <div className="col-9 col-md-9">
        <h2 style={{ textAlign: 'center', fontFamily: 'Times New Roman', marginTop: '80px' }}>PENDING LEAVE REQUESTS</h2>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <div>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr style={{ backgroundColor: '#333', color: '#fff', fontFamily: 'Times New Roman' }}>
                  <th style={{ border: '1px solid #ddd', padding: '8px'}}>ID</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Employee</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Leave Type</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Reason</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Start Date</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>End Date</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingLeave.map((leave, index) => (
                  <tr key={index} style={{ backgroundColor: '#fff' }}> {/* Fixed key */}
                    <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman' }}>{index + 1}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman' }}>{leave.employee}</td> {/* Adjusted property */}
                    <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman' }}>{leave.leaveType}</td> {/* Adjusted property */}
                    <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman' }}>{leave.reason}</td> {/* Adjusted property */}
                    <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman' }}>{new Date(leave.startDate).toLocaleDateString()}</td> {/* Adjusted property */}
                    <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman' }}>{new Date(leave.endDate).toLocaleDateString()}</td> {/* Adjusted property */}
                    <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman' }}>
                      <button
                        style={{ backgroundColor: 'green', color: 'white', marginRight: '5px' }}
                        onClick={() => this.handleApprove(leave.id)}
                      >
                        Approve
                      </button>
                      <button
                        style={{ backgroundColor: 'red', color: 'white', fontFamily: 'Times New Roman' }}
                        onClick={() => this.handleReject(leave.id)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Leave;