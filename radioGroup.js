/**
 * Radio group
 * ataomega@gmail.com
 * www.atasmohammadi.net
 * version 1.0
 */
import React, {Component, PropTypes} from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
var { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';

export default class RadioGroup extends Component {
  constructor(props){
    super(props);
    this.state = {
      pageWidth: Dimensions.get('window').width,
      pageHeight: Dimensions.get('window').height,
      selected: []
    };
  }

  componentDidMount = () => {
    this.props.radios.map(radio=>{
        if(radio.selected){
          this._onSelect(radio.value)
        }
      }
    )
  }

  getNewDimensions(event){
        var pageHeight = event.nativeEvent.layout.height
        var pageWidth = event.nativeEvent.layout.width
        this.setState({
            pageHeight, pageWidth
        })
    }

  _onSelect = (item) => {
    var selected = this.state.selected
    if(selected.indexOf(item) == -1){
      this.setState({
        selected: [item]
      })
    } else {
      this.setState({
        selected: []
      })
    }
    this.props.callback(selected)
  }

  _isSelected = (item) => {
    const selected = this.state.selected
    if(selected.indexOf(item) == -1){
      return false
    }
    return true
  }

  render(){
    const { radios, iconColor, iconSize, labelStyle, checkedIcon, uncheckedIcon, rowStyle, rowDirection } = this.props;

    return(
      <View
        onLayout={(evt)=>{this.getNewDimensions(evt)}}
        style={{
          flex: 1,
          flexDirection: rowDirection,
          padding: 5
        }}
      >
        {radios.map((radio, index)=>{
          return(
            <TouchableOpacity
              key={index}
              style={rowStyle}
              onPress={()=>{
                this._onSelect(radio.value)
              }}
            >
              {this._isSelected(radio.value) ?
                <Icon name={checkedIcon} color={iconColor} size={iconSize}/>
                : <Icon name={uncheckedIcon} color={iconColor} size={iconSize}/>
              }
              <Text style={labelStyle}>{radio.label}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    );
  }
}
