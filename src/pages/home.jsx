import VerticalCardProduct from "../components/VerticalCardProduct";
import Banner from "../components/Banner";
import CategoryList from "../components/CategoryList";
import HorizontalCardProduct from "../components/HorizontalCardProduct";

const Home = () => {
  return (
    <div>  
        <CategoryList/>
        <Banner/>
        <HorizontalCardProduct category={"airpods"} heading={"Top Pods Available"}/>

        <HorizontalCardProduct category={"watches"} heading={"Quality Watches"}/>
        <VerticalCardProduct category={"mobile"} heading={"All Quality phones Available"}/>
        <VerticalCardProduct category={"mouse"} heading={"Affordable Mouse"}/>
        <VerticalCardProduct category={"tv"} heading={"High resolution Televisions"}/>
        <VerticalCardProduct category={"camera"} heading={"Cameras and Photography"}/>
        <VerticalCardProduct category={"earphones"} heading={"wired Earphones"}/>
        <VerticalCardProduct category={"speakers"} heading={"Affordable Bluetooth Speakers"}/>
        <VerticalCardProduct category={"refrigerator"} heading={"Long lasting Fridges"}/>
        <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/>
        <VerticalCardProduct category={"printers"} heading={"Printers"}/>

    </div>
  );
}

export default Home