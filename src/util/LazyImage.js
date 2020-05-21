import {Image, Loader} from 'semantic-ui-react'
import React from "react";

class LazyImage extends  React.Component  {

    constructor(props) {
        super(props);
        this.state = {loaded: false, imageStatus: "loading"};
    }


    handleImageLoaded= () => {
        this.setState({ imageStatus: "loaded", loaded: true });
    };

    handleImageErrored = () => {
        this.setState({ imageStatus: "failed to load", loaded: false });
    };

    render() {
        const {src} = this.props;

        return (
            <>
                    {this.state.loaded ? null :
                        <Loader inline='centered' active size={"mini"} style={{height: '75px', width: '75px', top: 40}}/>
                    }
                    <Image src={src} onLoad={this.handleImageLoaded} style={this.state.loaded ? {} : {display: 'none'}} {...this.props} onError={this.handleImageErrored} />
            </>
        )
    }
}

export default LazyImage;