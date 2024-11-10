"use client";

import React, { useState, useEffect } from 'react';
import { useOCAuth } from '@opencampus/ocid-connect-js';
import { jwtDecode } from "jwt-decode";
import { Button } from '@/components/ui/button';

interface DecodedToken {
    user_id: number;
    eth_address: string;
    edu_username: string;
    iss: string;
    iat: number;
    exp: number;
    aud: string;
    [key: string]: any;
}

interface Job {
    id: string;
    title: string;
    description: string;
    applied: boolean;
}

const jobList: Job[] = [
    { id: '1', title: 'Software Engineer', description: 'Work on web applications.', applied: false },
    { id: '2', title: 'Product Manager', description: 'Manage product development.', applied: false },
    { id: '3', title: 'Data Analyst', description: 'Analyze data trends.', applied: false }
];

const JobBoard: React.FC = () => {
    const { login, logout, authState } = useOCAuth();
    const [jobs, setJobs] = useState<Job[]>(jobList);
    const [userId, setUserId] = useState<number | null>(null);
    const [username, setUsername] = useState<string>("Guest");

    useEffect(() => {
        if (authState.isAuthenticated && authState.idToken) {
            const decodedToken: DecodedToken = jwtDecode(authState.idToken);
            setUserId(decodedToken.user_id);
            setUsername(decodedToken.edu_username);
        }
    }, [authState.isAuthenticated, authState.idToken]);

    const handleApply = (jobId: string) => {
        setJobs(jobs.map(job => job.id === jobId ? { ...job, applied: true } : job));
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-6">
                Hello, {username}!
            </h1>

            {!authState.isAuthenticated ? (
                <Button onClick={login}>Login with OCID</Button>
            ) : (
                <>
                    <p>Welcome back, {username}! (User ID: {userId})</p>
                    <div className="job-list mt-4">
                        {jobs.map(job => (
                            <div key={job.id} className="job-item border p-4 mb-4">
                                <h2 className="text-xl font-semibold">{job.title}</h2>
                                <p>{job.description}</p>
                                <Button
                                    onClick={() => handleApply(job.id)}
                                    disabled={job.applied}
                                    className="mt-2"
                                >
                                    {job.applied ? 'Applied' : 'Apply'}
                                </Button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default JobBoard;
