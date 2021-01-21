import React from 'react';

// Create a context for managing application settings and provide this at the application level
// Display or Hide completed items (boolean)
// Number of items to display per screen (number)
// Default sort field (string)
// You may manually set (hard code) those state settings in the context provider during development

export const AppSettingsContext = React.createContext();

class AppSettings extends React.Component{
  constructor(props){
    super(props);
    this.state={
      showCompleted:true,
      itemsPerScreen: 3,
      defaultSortField: '',
      setDefaultSort: this.setDefaultSort,
      setCompleted: this.setCompleted
    }
  }

  setCompleted = (preference) => { this.setState({ showCompleted: preference }) }


  setDefaultSort = (preference) => { this.setState({ defaultSortField: preference }) }

  render(){
    console.log(this.state);
    return(
      <AppSettingsContext.Provider value={this.state}>
        {this.props.children}
      </AppSettingsContext.Provider>
    )
  }
}

export default AppSettings;