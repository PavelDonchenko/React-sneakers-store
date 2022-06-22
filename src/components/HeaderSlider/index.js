import Slider from "react-slick";
import styles from "./Slider.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HeaderSlider() {
    const setting = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        
    }
    return (
        <Slider {...setting} >
            <div className={styles.sliderWrap}>
                <div className={styles.slideDescription}>
                    <h2>Life is better in running <span>shoes.</span>
                    </h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas leo ultrices </p>
                </div>
                <div className={styles.sliderImage}>
                    <img src="img/slider-image.png" alt="foto  of sneaker" />
                </div>
            </div>
            <div className={styles.sliderWrap}>
                <div className={styles.slideDescription}>
                    <h2>Life is better in running <span>shoes.</span>
                    </h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas leo ultrices </p>
                </div>
                <div className={styles.sliderImage}>
                    <img src="img/slider-image.png" alt="foto  of sneaker" />
                </div>
            </div>
        </Slider>
    )
}

export default HeaderSlider;