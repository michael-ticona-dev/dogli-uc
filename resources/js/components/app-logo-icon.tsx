import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src="/Pagina/icono.webp"
            alt="Dogli UC Icon"
            {...props}
        />
    );
}
