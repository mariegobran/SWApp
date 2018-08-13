
    class StarWarsApp extends React.Component{
      constructor(props){
        super(props);
        this.state = {
          name: "",
          data : []
      };
      this.loadData = this.loadData.bind(this);
    }

    /**
     * 
     * @param {string} name  either people  or planets or starships , otherwise it's a SW character to find
     * 
     * 
     */
    loadData(name){
        if(name && (name =="people" || name == "starships" || name == "planets")){

          fetch('http://localhost/SWApp/APIClient.php?dataType='+name)
          .then(results=> { 
            return results.json();
            }).then(data => {
              var dataList = new Array();
                for(var i in data){
                 var resultName=data[i];
                 dataList.push(resultName);
                }
                this.setState({data: dataList});
            });

            
        } // data to fetch are only results' names for (people/planets/starships) buttons
        
        else{ 
              fetch('http://localhost/SWApp/APIClient.php?search='+name)
              .then(results=> {
              return results.json();
              }).then(data => { 
                  this.setState({data});
              });
          
        }// case searching for a character
      
            
    }
      render(){
        var dataList = new Array();
        var data = this.state.data;
        if(this.state.name != "people" || this.state.name != "planets" || this.state.name != "starships"){
            var index =0;
          for(var trait in data){
               
            dataList.push(<p>{trait} : {data[trait]}</p>);
      
            index++;
          }
        }
        else{
          for(var i=0;i<data.length; i++){
            dataList.push(<li>{data[i]}</li>);
        };
        } // runs if the list
        
        return (<div>
        <PeopleBt loadData = {this.loadData} name="people"/>
        <PeopleBt loadData ={this.loadData} name="planets"/>
        <PeopleBt loadData ={this.loadData} name="starships"/>
        <SearchBt loadData ={this.loadData} />
        <div className="results">
        <h1>{this.state.name.toUpperCase()}</h1>
        <ul>{dataList}</ul>

        </div>
      </div>);
      }
    }

/**
 * 
 * class for a general button component for (people/planets/starships)
 */
class PeopleBt extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: ""
    };
  }
  componentDidMount(){
    this.setState({
      name: this.props.name
    });
  }
  render(){
    
    return (<button className="button" onClick={()=>this.props.loadData(this.state.name)}>
        {this.props.name.toUpperCase()}
      </button>);
  }
}

/**
 * return a button that triggers on and off Search(input+button) component
 */
class SearchBt extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showSearch: false
    };
    
    this.findThem = this.findThem.bind(this);
  }

  findThem(){
    if(this.state.showSearch) this.setState({showSearch: false});
      else this.setState({showSearch: true});
  }
  // here implement a componentDidMount method to initialize the data to the data received from API
  render(){
    return (<div className="search"><button className="button" onClick={this.findThem}>Search A Character</button>
      {this.state.showSearch && <Search loadData ={this.props.loadData} />}
      </div>);
  }
}

class Search extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      term: "",
      data: {}
    };
    this.dumpData = this.toSearch.bind(this);
    this.searchName = this.searchName.bind(this);
    this.toSearch = this.toSearch.bind(this);
  }
  
  toSearch(event){
    this.setState({
      term: event.target.value
    });
  }
  
  searchName(){
        this.props.loadData(this.state.term);
  }
  
  render(){
    return (<div>
        <input value={this.state.term} onChange={this.toSearch} />
        <button onClick={this.searchName}>
        Search
      </button>
        </div>);
  }
}

ReactDOM.render(<StarWarsApp/>, document.getElementById('container'));

    