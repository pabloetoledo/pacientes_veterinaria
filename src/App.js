import React, {Component} from 'react';
import './bootstrap.min.css';
import Header from './components/Header';
import NuevaCita from './components/NuevaCita';
import ListaCitas from './components/ListaCitas';

class App extends Component {
  state = {  
    citas : []
  }

  //Cuando la aplicacion carga
  componentDidMount() {
    const citasLS = localStorage.getItem('citas');    
    if(citasLS){
      this.setState({
        citas : JSON.parse(citasLS)
      })
    }    
  }

  //Cuando agregamos o eliminamos una cita
  componentDidUpdate() {
    localStorage.setItem('citas', JSON.stringify(this.state.citas));

  }

  crearNuevaCita = datos => {

    /*Debemos agregar la nueva cita al array de citas en el state
    Nunca se debe modificar nada del state sin antes guardar una 
    copia*/

    //copiamos el state actual y agregamos la nueva cita.
    //Esto es como un push en un array
    const citas = [...this.state.citas, datos];

    //agregar el nuevo state actualizado
    this.setState({
      /*citas : citas -> Usualmente se deberia poner asi 
      pero como se llaman iguales se pone un solo nombre*/
      citas
    })
  }

  eliminarCita = id => {
    //primero hacemos una copia del state
    const citasActuales = [...this.state.citas];

    //utilizamos filter para sacar el elemento @id del arreglo citas
    /*Con filter obtenemos todas las citas cuyo id sea distintas al
    id pasado como parametro. Esto lo hacemos para crear una copia
    de las citas en donde no este el elemente con id al id pasado */
    const citas = citasActuales.filter(cita => cita.id !== id);

    //Actualizamos el state
    this.setState({
      citas
    })

  }


  render() { 
    return (  
      <div className="container">
        <Header
          titulo = 'Administrador Pacientes Veterinaria'
        />

        <div className="row">
          <div className="col-md-10 mx-auto">
              <NuevaCita
                crearNuevaCita = {this.crearNuevaCita}
              />
          </div>

          <div className="mt-5 col-md-10 mx-auto">
            <ListaCitas
              citas = {this.state.citas}
              eliminarCita = {this.eliminarCita}
            />
          </div>

        </div>                        
      </div>

    );
  }
}
 
export default App;
