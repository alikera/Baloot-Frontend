import React from "react";
import '../css/providerInfo.css';
function ProviderInfo(props){
    const {providerImage, providerDate, providerName} = props;
    return(
        <div className="provider-image-container mb-5">
            <img src={providerImage} alt="Big Image" />
            <div className="subtitle mt-2">
                <p>since {providerDate}</p>
            </div>
            <div className="provider-name">
                <p>{providerName}</p>
            </div>
        </div>
    );

}

export default ProviderInfo;