import React from "react";
import "./data.js";
import { hotelsData, today } from "./data.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        dateFrom: today,
        dateTo: new Date(today.valueOf() + 86400000),
        country: "",
        price: 0,
        rooms: 0
      },
      hotels: hotelsData
    };
  }
  render() {
    return (
      <div>
        <Hero filters={this.state.filters} />
        <Filters
          filters={this.state.filters}
          onFilterChange={this.handleFilterChange}
        />
        <Hotel hotel={hotelsData[0]} />
        <Hotels data={hotelsData} />
      </div>
    );
  }
}
class Hero extends React.Component {
  render() {
    const formato = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    return (
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Hoteles</h1>
            <h2 className="subtitle">
              desde el <strong /> hasta el{" "}
              <strong>
                {this.props.filters.dateTo.toLocaleString("es-ES", formato)}
              </strong>
            </h2>
          </div>
        </div>
      </section>
    );
  }
}
class DateFilter extends React.Component {
  constructor(props) {
    super(props);
    this.handledatechange = this.handledatechange.bind(this);
  }
  handledatechange(event) {
    this.props.ondatechange(event);
  }
  render() {
    return (
      <div className="field">
        <input
          className="input"
          type="date"
          onchange={this.handledatechange}
          value={this.date}
          name={this.props.name}
        />
        <div className="control has-icons-left">
          <span className="icon is-small is-left">
            <i className="fas" />
          </span>
        </div>
      </div>
    );
  }
}
class OptionsFilter extends React.Component {
  render() {
    return (
      <div className="field">
        <div className="control has-icons-left">
          <div className="select" style={{ width: "100%" }}>
            <select style={{ width: "100%" }}>
              {this.props.options.map(option => {
                return (
                  <option key={option.name} value={option.value}>
                    {option.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="icon is-small is-left">
            <i className="fas" />
          </div>
        </div>
      </div>
    );
  }
}
class Filters extends React.Component {
  handleOptionChange(event) {
    let payload = this.props.filters;
    payload[event.target.name] = event.target.value;
    this.props.onFilterChange(payload);
  }
  render() {
    return (
      <nav className="navbar is-info" style={{ justifyContent: "center" }}>
        <div className="navbar-item">
          <DateFilter date={this.props.filters.dateFrom} icon="sign-in-alt" />
        </div>
        <div className="navbar-item">
          <DateFilter date={this.props.filters.dateTo} icon="sign-out-alt" />
        </div>
        <div className="navbar-item">
          <OptionsFilter
            options={[
              { value: undefined, name: "Todos los países" },
              { value: "Argentina", name: "Argentina" },
              { value: "Brasil", name: "Brasil" },
              { value: "Chile", name: "Chile" },
              { value: "Uruguay", name: "Uruguay" }
            ]}
            selected={this.handleOptionChange}
            icon="globe"
          />
        </div>
        <div className="navbar-item">
          <OptionsFilter
            options={[
              { value: undefined, name: "Cualquier precio" },
              { value: 1, name: "$" },
              { value: 2, name: "$$" },
              { value: 3, name: "$$$" },
              { value: 4, name: "$$$$" }
            ]}
            selected={this.props.filters.price}
            icon="dollar-sign"
          />
        </div>
        <div className="navbar-item">
          <OptionsFilter
            options={[
              { value: undefined, name: "Cualquier tamaño" },
              { value: 10, name: "Hotel pequeño" },
              { value: 20, name: "Hotel mediano" },
              { value: 30, name: "Hotel grande" }
            ]}
            selected={this.props.filters.rooms}
            icon="bed"
          />
        </div>
      </nav>
    );
  }
}
class Hotel extends React.Component {
  render() {
    if (this.props.handleFilterChange) {
      return (
        <div className="card-footer">
          <h1>Reservar</h1>
        </div>
      );
    } else {
      return (
        <div className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img
                src="./images/sainte-jeanne.jpg"
                alt="Sainte Jeanne Boutique & Spa"
              />
            </figure>
          </div>
          <div className="card-content">
            <p className="title is-4">Sainte Jeanne Boutique & Spa</p>
            <p>
              Sainte Jeanne Hotel Boutique & Spa está ubicado en el corazón de
              Los Troncos, un barrio residencial y elegante de Mar del Plata. El
              lujo, el confort y la pasión por los detalles dan personalidad a
              esta cálida propuesta.
            </p>
            <div
              className="field is-grouped is-grouped-multiline"
              style={{ marginTop: "1em" }}
            >
              <div className="control">
                <div className="tags has-addons">
                  <span className="tag is-medium is-info">
                    <i className="fas fa-map-marker" />
                  </span>
                  <span className="tag is-medium">
                    Mar del Plata, Argentina
                  </span>
                </div>
              </div>
              <div className="control">
                <div className="tags has-addons">
                  <span className="tag is-medium is-info">
                    <i className="fas fa-bed" />
                  </span>
                  <span className="tag is-medium">23 Habitaciones</span>
                </div>
              </div>
              <div className="control">
                <div className="tags">
                  <span className="tag is-medium is-info">
                    <i
                      className="fas fa-dollar-sign"
                      style={{ margin: "0 .125em" }}
                    />
                    <i
                      className="fas fa-dollar-sign"
                      style={{ margin: "0 .125em" }}
                    />
                    <i
                      className="fas fa-dollar-sign"
                      style={{ margin: "0 .125em", opacity: ".25" }}
                    />
                    <i
                      className="fas fa-dollar-sign"
                      style={{ margin: "0 .125em", opacity: ".25" }}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <a
              href="javascript:alert('No implementamos esto aún :(')"
              className="card-footer-item has-background-primary has-text-white has-text-weight-bold"
            >
              Reservar
            </a>
          </div>
        </div>
      );
    }
  }
}

class Hotels extends React.Component {
  render() {
    return (
      <section className="section" style={{ marginTop: "3em" }}>
        <div className="container">
          <div className="columns is-multiline">
            <i className="fas" />
          </div>
        </div>
      </section>
    );
  }
}
export default App;
