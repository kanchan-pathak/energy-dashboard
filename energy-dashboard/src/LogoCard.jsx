import Logo from './assets/EnergyLogo.png'
const LogoCard=()=>{
return(
    <div className="mx-4 p-1 w-1/11 h-full flex justify-around items-center-safe">
        <img src={Logo} className="h-full object-contain"/>
        <h1 className="text-3xl font-bold text-primary">ERU</h1>
    </div>
)
}

export default LogoCard