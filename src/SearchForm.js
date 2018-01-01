import React, {Component} from 'react';


export class SearchForm extends Component {
   constructor(props) {
      super(props);

      this.state = {
         title: props.title ? props.title : 'impossible',
         year: props.year ? props.year : '',
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange(event) {
      const {target} = event;
      if (target.name === "title") {
         this.setState({title: target.value});
      } else if (target.name === "year") {
         this.setState({year: target.value});
      }
   }

   handleSubmit(event) {
      event.preventDefault();

      console.log("this.state.title = ", this.state.title);
      console.log("this.state.year = ", this.state.year);
      this.props.onSubmit({
         title: this.state.title,
         year: this.state.year,
      });

   }

   render() {
      return (
         <div className="SearchForm">
            <form onSubmit={this.handleSubmit}>
               <label>Title</label>&nbsp;
               <input type="text"
                      name="title"
                      placeholder="Title of movie..."
                      size="40"
                      value={this.state.title} onChange={this.handleChange}
               />
               <br/>
               <label>Year</label>&nbsp;
               <input type="text"
                      name="year"
                      placeholder="Year of movie..."
                      size="4"
                      value={this.state.year} onChange={this.handleChange}
               />
               <br/>
               <input type="submit" value="Search"/>
            </form>
         </div>
      );
   }
}