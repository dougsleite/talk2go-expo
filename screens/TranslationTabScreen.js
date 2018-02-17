import _ from 'lodash';
import React, { Component } from 'react';
import expo from 'expo';
import { View, Text, FlatList } from 'react-native';
import { Card, List, ListItem } from 'react-native-elements';
import sounds from '../assets/sounds';

class TranslationTabScreen extends Component {
    
    state = {
        data: []
    }

    componentWillMount() {
        const data = this.createDataSource();
        this.setState({ data });
    }

    createDataSource = () => {
        const { 
            fromCountryName,
            fromCountryLang,
            fromTranslationText,
            toCountryName,
            toCountryLang,
            toTranslationText,
            textKey
         } = this.props;
        
        const filteredFrom = this.filterOutSubText(fromTranslationText);
        const filteredTo = this.filterOutSubText(toTranslationText);
        const mergedTexts = _.mergeWith(filteredFrom, filteredTo, (v1, v2) => {
            return { from: v1, to: v2 };
        });

        return _.map(mergedTexts, (value, key) => {

            const fromSoundSpecific = `${fromCountryLang}-${fromCountryName}.${textKey}.${key}`;
            const fromSoundDefault = `${fromCountryLang}.${textKey}.${key}`;

            const toSoundSpecific = `${toCountryLang}-${toCountryName}.${textKey}.${key}`;
            const toSoundDefault = `${toCountryLang}.${textKey}.${key}`;

            return { 
                fromText: value.from,
                fromSubText: fromTranslationText[`_${key}`],
                fromSound: _.get(sounds, fromSoundSpecific, _.get(sounds, fromSoundDefault)),
                toText: value.to,
                toSubText: toTranslationText[`_${key}`],
                toSound:  _.get(sounds, toSoundSpecific, _.get(sounds, toSoundDefault))
            };
        });
    }    
    
    filterOutSubText = (text) => {
        return _.pickBy(text, (value, key) => !key.startsWith('_'));
    }

    playSound = async (soundToPlay) => {
        await Expo.Audio.Sound.create(soundToPlay, { shouldPlay: true });
    }

    renderRow = ({ item }) => {
        const translationRow = item;
        return(
            <Card>
                <ListItem 
                    roundAvatar
                    title={translationRow.fromText}
                    subtitle={translationRow.fromSubText}
                    avatar={{uri: this.props.fromIconUri}}
                    rightIcon={{name: 'hearing'}}
                    hideChevron={translationRow.fromSound == null}
                    onPressRightIcon={() => this.playSound(translationRow.fromSound)}
                />
                <ListItem 
                    roundAvatar
                    title={translationRow.toText}
                    subtitle={translationRow.toSubText}
                    avatar={{uri: this.props.toIconUri}}
                    rightIcon={{name: 'hearing'}}
                    hideChevron={translationRow.toSound == null}
                    onPressRightIcon={() => this.playSound(translationRow.toSound)}
                />
            </Card>
        );
    }

    render() {
        return (
            <List containerStyle={{ flex : 1 , marginTop: 0}}>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderRow}   
                    keyExtractor={ (item, index) => index}                 
                />         
            </List>               
        );
    }
}

export default TranslationTabScreen;
