import _ from 'lodash';
import React, { Component } from 'react';
import expo from 'expo';
import { View, Text, ListView } from 'react-native';
import { Card, List, ListItem } from 'react-native-elements';
import sounds from '../assets/sounds';

class TranslationTabScreen extends Component {

    componentWillMount() {
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource(props) {

        const { 
            fromCountryName,
            fromCountryLang,
            fromTranslationText,
            toCountryName,
            toCountryLang,
            toTranslationText,
            textKey
         } = props;

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        
        const array = _.map(toTranslationText, (value, key) => {
            return { 
                fromText: this.getFromText(fromTranslationText, key),
                fromSound: `${fromCountryName}.${fromCountryLang}.${textKey}.${key}`,
                toText: value,
                toSound: `${toCountryName}.${toCountryLang}.${textKey}.${key}`
            };
        });
        this.dataSource = ds.cloneWithRows(array);
    }    

    getFromText(fromTranslationText, toTextKey) {
        return _.find(fromTranslationText, (value, key) => key === toTextKey);  
    }
    
    playSound = async (soundToPlay) => {
        await Expo.Audio.Sound.create(
            _.get(sounds, soundToPlay),
            { shouldPlay: true }
        );
    }

    renderRow = (translationRow) => {
        return(
            <Card>
                <ListItem 
                    roundAvatar
                    title={translationRow.fromText}
                    avatar={{uri: this.props.fromIconUri}}
                    rightIcon={{name: 'hearing'}}
                    onPressRightIcon={() => this.playSound(translationRow.fromSound)}
                />
                <ListItem 
                    roundAvatar
                    title={translationRow.toText}
                    avatar={{uri: this.props.toIconUri}}
                    rightIcon={{name: 'hearing'}}
                    onPressRightIcon={() => this.playSound(translationRow.toSound)}
                />
            </Card>
        );
    }

    render() {
        return (
            <List containerStyle={{ flex : 1 , marginTop: 0}}>
                <ListView
                    enableEmptySections
                    renderRow={this.renderRow}
                    dataSource={this.dataSource}
                />         
            </List>               
        );
    }
}

export default TranslationTabScreen;
