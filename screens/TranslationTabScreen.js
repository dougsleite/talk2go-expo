import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, ListView } from 'react-native';
import { Card, List, ListItem } from 'react-native-elements';

class TranslationTabScreen extends Component {

    componentWillMount() {
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ toTranslationText }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        
        const array = _.map(toTranslationText, (value, key) => {
            return { 
                from: this.getFrom(key),
                to: value
            };
        });
        this.dataSource = ds.cloneWithRows(array);
    }    

    getFrom(id) {
        const { fromTranslationText } = this.props;
        return _.find(fromTranslationText, (value, key) => key === id);  
    }
    
    renderRow = (translationRow) => {
        const{ fromCountry, toCountry } = this.props;
        return(
            <Card>
                <ListItem 
                    roundAvatar
                    hideChevron
                    title={translationRow.from}
                    avatar={{uri: this.props.fromIconUri}}
                />
                <ListItem 
                    roundAvatar
                    hideChevron
                    title={translationRow.to}
                    avatar={{uri: this.props.toIconUri}}
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
