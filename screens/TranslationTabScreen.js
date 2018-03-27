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

            const fromSound = new Expo.Audio.Sound();
            fromSound.loadAsync(_.get(sounds, fromSoundSpecific, _.get(sounds, fromSoundDefault)));

            const toSound = new Expo.Audio.Sound();
            toSound.loadAsync(_.get(sounds, toSoundSpecific, _.get(sounds, toSoundDefault)));

            return { 
                fromText: value.from,
                fromSubText: fromTranslationText[`_${key}`],
                fromSound: fromSound,
                toText: value.to,
                toSubText: toTranslationText[`_${key}`],
                toSound: toSound
            };
        });
    }    
    
    filterOutSubText = (text) => {
        return _.pickBy(text, (value, key) => !key.startsWith('_'));
    }

    playSound = async (soundToPlay) => {
        //await Expo.Audio.Sound.create(soundToPlay, { shouldPlay: true });
        try {
            await soundToPlay.playAsync(); 
        } catch (error) {
            soundObject.unloadAsync();
        }
    }

    renderRow = ({ item }) => {
        const translationRow = item;
        const iconProps = { name: 'hearing', color: '#646873' };
        return(
            <Card>
                <ListItem 
                    roundAvatar
                    title={translationRow.fromText}
                    subtitle={translationRow.fromSubText}
                    avatar={{uri: this.props.fromIconUri}}
                    rightIcon={iconProps}
                    hideChevron={translationRow.fromSound == null}
                    onPress={translationRow.fromSound == null ? null : () => this.playSound(translationRow.fromSound)}
                />
                <ListItem 
                    roundAvatar
                    title={translationRow.toText}
                    subtitle={translationRow.toSubText}
                    avatar={{uri: this.props.toIconUri}}
                    rightIcon={iconProps}
                    hideChevron={translationRow.toSound == null}
                    onPress={translationRow.toSound == null ? null : () => this.playSound(translationRow.toSound)}
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
