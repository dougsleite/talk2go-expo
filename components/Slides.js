import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, Orientation } from 'react-native';
import { Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';

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
                <Icon
                    raised
                    name='thumb-up'
                    color='#085f89'
                    size={32}
                    onPress={this.props.onComplete} />                
            );
        }
    }

    renderSlides() {
        return this.props.data.map( (slide, index) => {
            return (
                <View 
                    key={slide.text} 
                    style={
                        [styles.slideStyle, { backgroundColor: slide.color, width: this.state.pageWidth }]}
                    onLayout={this.getNewDimensions}
                >
                    <Text style={
                        [styles.slideTextStyle, 
                        {
                            color: slide.textColor,
                            lineHeight: slide.lineHeight,
                            fontSize: slide.fontSize
                        }]
                    }>{slide.text}</Text>
                    {
                        this.renderLastSlide(index)
                    }
                </View>
            );
        });
    }

    render() {
        return (
            <Swiper 
                style={styles.wrapper}
                activeDotColor="#10fbfb"
                loop={false}
            >
                {this.renderSlides()}
            </Swiper>
        );
    }
}

const styles = {
    wrapper: {
    },
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slideTextStyle: {
        fontSize: 30,
        paddingLeft: 10,
        lineHeight: 50,
        color: 'white',
        textAlign: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
    }
};

export { Slides };
