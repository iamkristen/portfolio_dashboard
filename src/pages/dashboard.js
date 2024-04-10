import logo from '../assets/logo.png'


const Dashboard = () => {
    return (
        <div className="logo-container text-center d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            <img className="logo" src={logo} alt="Logo" height={100} width={100}/>
            <br/>
            <b> Dashboard</b>
          </div>
    )
} 
export default Dashboard