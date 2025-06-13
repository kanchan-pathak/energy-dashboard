const PrimaryButton=({buttonText,buttonFunction})=>{
return(
    <button className="mx-6 my-2 p-2 w-20 rounded-xl bg-primary hover:bg-primaryhover text-foreground font-medium" onClick={buttonFunction}>{buttonText}</button>
)
}
export default PrimaryButton