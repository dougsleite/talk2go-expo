import _ from 'lodash';
import React, { PureComponent, Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import iconFlags from '../assets/icons/flags';

const GRAY_COLOR = '#646873';

class ListItem extends PureComponent {
    render() {
        const { 
            title, 
            subtitle, 
            avatarSrc, 
            containerStyle, 
            onPress, 
            onLongPress,
            rightIcon,
            hideChevron
        } = this.props;
        return(    
            <TouchableOpacity
                onPress={onPress}
                onLongPress={onLongPress}
            >
                <View style={[ styles.outsideContainerStyle, containerStyle ]}>
                    <View style={[ styles.innerContainerStyle, containerStyle ]}>
                        <Image
                            style={{width: 34, height: 34}}
                            source={avatarSrc}
                        />     
                        <View style={styles.textContainerStyle}> 
                            <Text style={styles.textStyle}>
                                {title}
                            </Text>
                            <Text style={styles.subTextStyle}>
                                {subtitle}
                            </Text>
                        </View>
                    </View>
                    { hideChevron ? <View/> : (
                        <Icon 
                            name={rightIcon ? rightIcon.name : 'keyboard-arrow-right'}
                            color={GRAY_COLOR}
                        />
                    )}
                </View>
            </TouchableOpacity>    
        );
    }
}

const styles = {
    outsideContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 20,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        position: 'relative',
    },
    innerContainerStyle: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    textContainerStyle: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },    
    textStyle: {
        paddingLeft: 15,
        fontSize: 16
    },
    subTextStyle: {
        paddingLeft: 15,
        fontSize: 14,
        color: GRAY_COLOR        
    }
};

export { ListItem };