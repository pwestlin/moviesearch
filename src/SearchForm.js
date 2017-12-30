import React, {Component} from 'react';


export class SearchForm extends Component {
   constructor(props) {
      super(props);

      this.state = {title: props.title};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange(event) {
      this.setState({title: event.target.value});
   }

   handleSubmit(event) {
      this.props.onSubmit(this.state.title);
      event.preventDefault();
   }

   render() {
      return (
         <div className="SearchForm">
            <form onSubmit={this.handleSubmit}>
               <label>Title</label>&nbsp;
               <input type="text"
                      placeholder="Title of movie..."
                      size="40"
                      value={this.state.title} onChange={this.handleChange}
               />
               <input type="submit" value="Search"/>
            </form>
         </div>
      );
   }
}