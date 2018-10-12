import React from 'react';

const ImageLinkForm = ({ onInputChange, onSubmit}) => {
    return (
        <div>
            <p className="f3 fw9">Magic Brain Will Detect The Face In The Pic</p>
            <div className="center">
                <div className="pa4 br3 shadow-5 form">
                    <input type="text" className="f4 pa2 w-70" onChange={onInputChange} placeholder="Enter url of pic..."></input>
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-green" onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    ) 
}

export default ImageLinkForm;
