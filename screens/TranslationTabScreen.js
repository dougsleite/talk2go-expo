import _ from 'lodash';
import React, { PureComponent } from 'react';
import { View, Text, ListView } from 'react-native';
import { Spinner, ListItem, Card, CardSection } from '../components';

import expo from 'expo';
import sounds from '../assets/sounds';

class TranslationTabScreen extends PureComponent {
    
    state = {
        dataSource: null
    }

    componentWillMount() {
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource = async (props) => {
        const { 
            fromCountryName,
            fromCountryLang,
            fromTranslationText,
            toCountryName,
            toCountryLang,
            toTranslationText,
            textKey
         } = props;
        
        const filteredFrom = this.filterOutSubText(fromTranslationText);
        const filteredTo = this.filterOutSubText(toTranslationText);
        const mergedTexts = _.mergeWith(filteredFrom, filteredTo, (v1, v2) => {
            return { from: v1, to: v2 };
        });

        const arrayPromisses = _.map(mergedTexts, async (value, key) => {

            const fromSoundSpecific = `${fromCountryLang}-${fromCountryName}.${textKey}.${key}`;
            const fromSoundDefault = `${fromCountryLang}.${textKey}.${key}`;

            const toSoundSpecific = `${toCountryLang}-${toCountryName}.${textKey}.${key}`;
            const toSoundDefault = `${toCountryLang}.${textKey}.${key}`;

            const fromSound = _.get(sounds, fromSoundSpecific, _.get(sounds, fromSoundDefault));
            const toSound = _.get(sounds, toSoundSpecific, _.get(sounds, toSoundDefault));

            return { 
                fromText: value.from,
                fromSubText: fromTranslationText[`_${key}`],
                fromSound,
                toText: value.to,
                toSubText: toTranslationText[`_${key}`],
                toSound
            };
        });

        const array = await Promise.all(arrayPromisses);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({ dataSource: ds.cloneWithRows(array) })
    }    
    
    filterOutSubText = (text) => {
        return _.pickBy(text, (value, key) => !key.startsWith('_'));
    }

    playSound = async (soundPath) => {
        try {
            const soundToPlay = new Expo.Audio.Sound();
            await soundToPlay.loadAsync(soundPath); 
            await soundToPlay.playAsync(); 
        } catch (error) {
            soundObject.unloadAsync();
        }
    }

    renderRow = (translationRow, sectionID) => {
        return(
            <CardSection>
                <ListItem 
                    title={translationRow.fromText}
                    subtitle={translationRow.fromSubText}
                    avatarSrc={this.props.fromIconUri}
                    rightIcon={{ name: 'hearing'}}
                    hideChevron={translationRow.fromSound == null}
                    onPress={translationRow.fromSound == null ? null : () => this.playSound(translationRow.fromSound)}
                />
                <ListItem 
                    title={translationRow.toText}
                    subtitle={translationRow.toSubText}
                    avatarSrc={this.props.toIconUri}
                    rightIcon={{ name: 'hearing'}}
                    hideChevron={translationRow.toSound == null}
                    onPress={translationRow.toSound == null ? null : () => this.playSound(translationRow.toSound)}
                />
            </CardSection>
        );
    }

    render() {
        if (!this.state.dataSource) {
            return <Spinner size="large" />;
        }
        return (
            <Card>
                <ListView
                    enableEmptySections
                    renderRow={this.renderRow}
                    dataSource={this.state.dataSource}
                />    
            </Card>  
        );
    }
}

export default TranslationTabScreen;
