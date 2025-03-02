import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useLocation,useNavigate } from 'react-router-dom';


function ZoomCallBack() {
    const location = useLocation();
    const navigate = useNavigate();
  
    useEffect(() => {
        const fetchAccessToken = async () => {
            const params = new URLSearchParams(location.search);
            const code = params.get('code');

            if (code) {
                try {
                    const response = await axios.get(`https://college-placement-management-backend-yyv6.onrender.com/api/zoom/callback?code=${code}`);
                    const { access_token } = response.data;
                    localStorage.setItem('zoomAccessToken', access_token);
                  
                    setTimeout(()=>{
                        navigate('/company/dashboard/zoom');
                    },2000) // Redirect to the main page after saving the token
                } catch (error) {
                    console.error('Error fetching access token:', error.response.data);
                }
            }
        };

        fetchAccessToken();
    }, [location]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h2>Zoom Callback</h2>
            <p>Processing your Zoom authentication...</p>
            <div className="loading-spinner" style={{ marginTop: '20px' }}>
                <div className="spinner"></div>
            </div>
        </div>
    );
}

export default ZoomCallBack;