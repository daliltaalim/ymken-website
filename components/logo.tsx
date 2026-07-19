import Image from 'next/image';
export function Logo({ light = false }: { light?: boolean }) { return <Image src={light ? '/assets/ymken-logo-light.svg' : '/assets/ymken-logo.svg'} alt="YMKEN Solutions" width={154} height={53} priority />; }
