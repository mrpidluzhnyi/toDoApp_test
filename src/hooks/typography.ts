import {useEffect, useState} from "react";

interface TypographyVariant {
    title: string,
    subTitle: string
}
export const useTypographyVariant = () => {
    const initialVariant = window.innerWidth < 600 ?
        {
            title: "h3",
            subTitle: "h5"
        } :
        {
            title: "h1",
            subTitle: "h3"
        }
    const [variant, setVariant] = useState<TypographyVariant>(initialVariant)
    const changeTitle = () => {
        if (window.innerWidth < 600) {
            setVariant({
                title: "h3",
                subTitle: "h5"
            })
        } else {
            setVariant({
                title: "h1",
                subTitle: "h3"
            })
        }
    }
    useEffect(() => {
        window.addEventListener('resize', changeTitle);
        return () => window.removeEventListener('resize', changeTitle);
    }, []);
    return variant
}