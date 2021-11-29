import React from 'react';

class Loading extends React.Component {


    render() {
        return (
            <>
                <div className="app__container">
                    <div className="gif__container">
                        <img src="https://i.gifer.com/2iiJ.gif" className="loading__gif noselect"></img>
                    </div>
                </div>
            </>
        )
    }
}

export default Loading;