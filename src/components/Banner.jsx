import image1 from "../assest/banner/img1.webp"
import image2 from "../assest/banner/img2.webp"
import image3 from "../assest/banner/img3.jpg"
import image4 from "../assest/banner/img4.jpg"
import image5 from "../assest/banner/img5.webp"
import image1Mobile from "../assest/banner/img1_mobile.jpg"
import image2Mobile from "../assest/banner/img2_mobile.webp"
import image3Mobile from "../assest/banner/img3_mobile.jpg"
import image4Mobile from "../assest/banner/img4_mobile.jpg"
import image5Mobile from "../assest/banner/img5_mobile.png"
import { useEffect, useState } from "react"
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa"

const Banner = () => {
    const [currentImage, setCurentImage] = useState(0)
    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]

    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ]

    const nextImage = () =>{
        if (desktopImages.length -1  > currentImage) {
            setCurentImage(prev => prev + 1)
        }
        
    }

    const prevImage = () =>{
        if (currentImage != 0) {
            setCurentImage(prev => prev - 1)
        }
        
    }



    useEffect(()=>{
        const interval = setInterval(()=>{
            if (desktopImages.length -1  > currentImage) {
                nextImage()
            }else {
                setCurentImage(0)
            }
        }, 5000)
        return () => clearInterval(interval)
    },[currentImage])



    return (
        <div className='container mx-auto rounded-lg'>
            <div className='w-full h-56 md:h-72 bg-slate-100 relative'>
                <div className="absolute z-10 h-full w-full md:flex items-center hidden">
                    <div className="flex justify-between w-full text-4xl">
                        <button onClick={prevImage} className="bg-white shadow-md rounded-full p-2"><FaAngleLeft /></button>
                        <button onClick={nextImage} className="bg-white shadow-md rounded-full p-2"><FaAngleRight /></button>
                    </div>

                </div>

                {/*desktop and tablet*/}
                <div className="hidden md:flex w-full h-full overflow-hidden">
                    {
                        desktopImages.map((image, index) => {
                            return (
                                <div className="w-full min-w-full min-h-full h-full transition-all" key={image} style={{ transform: `translateX(-${currentImage * 100}%` }}>
                                    <img src={image} alt="img" className="w-full h-full" />
                                </div>
                            )
                        })
                    }
                </div>

                    {/*mobile version*/}
                <div className="flex w-full h-full overflow-hidden md:hidden">
                    {
                        mobileImages.map((image, index) => {
                            return (
                                <div className="w-full min-w-full min-h-full h-full transition-all" key={image} style={{ transform: `translateX(-${currentImage * 100}%` }}>
                                    <img src={image} alt="img" className="w-full h-full object-cover" />
                                </div>
                            )
                        })
                    }
                </div>


            </div>
        </div>
    )
}

export default Banner