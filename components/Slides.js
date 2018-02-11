import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, Orientation } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {

    state = {
        pageWidth: Dimensions.get('window').width
    }
    
    getNewDimensions = (e) => {
        this.setState({
          pageWidth: Dimensions.get('window').width
        });
    }

    renderLastSlide(index) {
        if (index === this.props.data.length - 1) {
            return (
                <Button
                    title="Got it!"
                    large
                    raised
                    icon={{name: 'thumb-up'}}
                    buttonStyle={styles.buttonStyle}
                    onPress={this.props.onComplete}
                    backgroundColor="#085f89"
                />
            );
        }
    }

    renderSlides() {
        return this.props.data.map( (slide, index) => {
            return (
                <View 
                    key={slide.text} 
                    style={[styles.slideStyle, { backgroundColor: slide.color, width: this.state.pageWidth }]}
                    onLayout={this.getNewDimensions}
                >
                    <Text style={[styles.slideTextStyle, {color: slide.textColor}]}>{slide.text}</Text>
                    {
                        this.renderLastSlide(index)
                    }
                </View>
            );
        });
    }

    render() {
        return (
            <ScrollView
                horizontal    
                style={{ flex: 1 }}
                pagingEnabled
            >
                {this.renderSlides()}
            </ScrollView>
        );
    }
}

const styles = {
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slideTextStyle: {
        fontSize: 30,
        paddingLeft: 10,
        color: 'white',
        textAlign: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20
    }
};

export default Slides;
