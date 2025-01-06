import React from "react";
import './Loading.css';

export default function Loading({ status }) {
    if (!status) return null;

    return (
        <div className="Loading">
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}