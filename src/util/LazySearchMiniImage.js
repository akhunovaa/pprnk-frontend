import {Image, Loader} from 'semantic-ui-react'
import React from "react";

class LazySearchMiniImage extends  React.Component  {

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
        const {loaded} = this.state;

        const styles = {
            spanOfContainer: {
                color: '#F2F2F2'
            },
            Loader: {
                marginTop: 13.5,
                marginBottom: 13.5,
                border: 'none'
            },
            Image:{
                display: 'none'
            }
        };

        return (
            <>
                    {loaded ? null :
                        <Loader inline='centered' active size={"mini"} style={styles.Loader}/>
                    }
                    <Image src={src} onLoad={this.handleImageLoaded} style={loaded ? {} : styles.Image} onError={this.handleImageErrored} {...this.props}/>
            </>
        )
    }
}

export default LazySearchMiniImage;