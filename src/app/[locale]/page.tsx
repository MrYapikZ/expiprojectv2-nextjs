import {useTranslations} from 'next-intl';
import HeroBackground from "@/components/home/HeroBackground";

export default function HomePage() {
    const t = useTranslations('HomePage');
    return <>
        {/*<h1>{t('title')}</h1>*/}
        <HeroBackground/>
    </>;
}