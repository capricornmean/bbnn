export default function ProductDetails({ details }) {
    console.log(details);
    return (<div className="m-5 w-auto h-full">
        <img src={`./image/${details.src}.jpg`} className="w-full h-5/6 object-contain" />
        <h6 className="font-bold text-center">{details.name}</h6>
        <p className="text-center">{details.description}</p>
        <p className="text-center">{details.price}</p>
    </div>);
}