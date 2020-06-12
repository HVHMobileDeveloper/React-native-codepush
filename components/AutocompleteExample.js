import Autocomplete from 'react-native-autocomplete-input';
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View,} from 'react-native';

const API = 'http://dummy.restapiexample.com/api/v1/employees';

class AutocompleteExample extends Component {
  static renderFilm(film) {
    return (
      <View>
        <Text style={styles.titleText}>
          {JSON.stringify(film)}
        </Text>
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      films: [],
      query: '',
      tags: [],
    };
    this.onPress = this.onPress.bind(this);
  }

  componentDidMount() {
    fetch(`${API}`)
      .then(res => res.json())
      .then(json => {
        const {data} = json;
        this.setState({films: data});
      });
  }

  findFilm(query) {
    if (query === '') {
      return [];
    }

    const {films} = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return films.filter(film => film.employee_name.search(regex) >= 0);
  }

  onPress = (index) => {
    const {tags} = this.state;
    tags.splice(index,1);
    this.setState({
      tags: tags,
    });
  };

  render() {
    const {query} = this.state;
    const films = this.findFilm(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <View style={styles.container}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={
            films.length === 1 && comp(query, films[0].employee_name)
              ? []
              : films
          }
          defaultValue={query}
          onChangeText={text => this.setState({query: text})}
          placeholder="Enter Star Wars film title"
          renderItem={({item}) => (
            <TouchableOpacity
              style={{height: 35, justifyContent:'center'}}
              onPress={() => {
                this.setState({query: item.employee_name});
                this.state.tags.push(item.employee_name);
              }}>
              <Text style={styles.itemText}>
                {JSON.stringify(item.employee_name)}
              </Text>
            </TouchableOpacity>
          )}
        />
        <View style={styles.descriptionContainer}>
          {films.length > 0 ? (
            AutocompleteExample.renderFilm(films[0])
          ) : (
            <Text style={styles.infoText}>
              Enter Title of a Star Wars movie
            </Text>
          )}
        </View>

        
        <View style={{flexDirection:'row', flexWrap:'wrap'}}>
          {this.state.tags.map((item, count) => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  margin: 2.5,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 5,
                  paddingBottom: 5,
                  borderRadius: 15,
                  borderWidth: 0.5,
                  borderColor: 'gray',
                  justifyContent: 'center',
                  flexDirection:'row'
                }}
                >
                <Text style={{textAlign: 'center', color: 'gray'}}>
                  {item}
                </Text>
                <TouchableOpacity
                onPress={() => {
                  this.onPress(count);
                }}>
                <Text style={{
                  textAlign:'center',
                  color:'#000000', 
                  padding: 3,
                  marginLeft: 5,
                  fontSize: 10,
                  }}>❌</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 25,
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 25,
  },
  infoText: {
    textAlign: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
  openingText: {
    textAlign: 'center',
  },
  tagsView: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  tag: {
    flexDirection: 'row',
    height: 26,
    borderRadius: 13,
    backgroundColor: '#979797',
    minWidth: 40,
    maxWidth: 200,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    margin: 5,
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  tagText: {
    marginHorizontal: 5,
  },
  labelStyle: {
    fontSize: 12,
    marginTop: 12,
    marginBottom: -4,
  },
  deleteIcon: {
    width: 20,
    height: 20,
    opacity: 0.5,
    marginLeft: 5,
  },
});

export default AutocompleteExample;
