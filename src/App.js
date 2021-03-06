import logo from './logo.svg';
import './App.css';
import { Component } from 'react'
import swal from 'sweetalert';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      form: {
        height: 0,
        weight: 0,
        result: '',
      },
      inputs: []
    }
  }

  handleInputChange = (inputName, inputValue) => {
    const { form } = { ...this.state }
    form[inputName] = inputValue;
    this.setState({ form });
  }

  resetForm = () => {
    this.setState({ form: { weight: 0, height: 0 } });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { form, inputs } = { ...this.state };

    if (form.id > 0) {
      let newData = inputs.map((data) => {
        if (data.id === form.id) {
          return form;
        }
        return data;
      });
      
      this.setState({ inputs: newData });
      
    } else {
      form.id = inputs.length + 1;
      this.setState({ inputs: inputs.concat({ ...form }) });
      this.setState({form : {...form}})
      this.handleCalculateBmi()
      this.resetForm()
    }
    this.resetForm()
  }

  handleCalculateBmi = () => {
    const { form,inputs } = { ...this.state }
    console.log(inputs);
    const calculate = (form.height - 100) - ((form.height - 100) * 0.1)
    const result = Math.round(calculate)

    if (form.weight > result) {
      swal({
        title: "Unbalance Body Weight",
        text: "Your weight is too fat",
        icon: "warning"
      })
    } else if (form.weight < result) {
      swal({
        title: "Unbalance Body Weight",
        text: "Your weight is too thin",
        icon: "warning"
      })
    } else {
      swal({
        title: "Good Jobs",
        text: "Body Goals",
        icon: "success"
      })
    }
  }

  render() {

    return (
      <div className="App">
        <form>
          <label htmlFor="tinggi">Tinggi badan: </label>
          <input type="number" id="tinggi" name="tinggi" placeholder="Tinggi Badan" onChange={(event) => this.handleInputChange("height", event.target.value)} />
          <br />
          <br />
          <label htmlFor="berat">Berat badan: </label>
          <input type="number" id="berat" name="berat" placeholder="Berat badan" onChange={(event) => this.handleInputChange("weight", event.target.value)} />
          <button onClick={this.handleFormSubmit}>Submit</button>
        </form>

      </div>
    );
  }
}

export default App;
