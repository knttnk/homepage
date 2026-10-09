import './globals.css';
import { Noto_Sans_JP, Lora, Noto_Serif_JP } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Metadata } from 'next';
import { metadataFrom } from './metadata';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@wrksz/themes/next';

const notosansjp = Noto_Sans_JP({
	subsets: ['latin'],
	variable: '--font-noto-sans-jp',
});
const lora = Lora({
	subsets: ['latin'],
	variable: '--font-lora',
});
const notoserifjp = Noto_Serif_JP({
	subsets: ['latin'],
	variable: '--font-noto-serif-jp',
});

export async function generateMetadata(
	params: Promise<{
		locale: string;
	}>,
): Promise<Metadata> {
	const { locale } = await params;
	return metadataFrom({ locale: locale ?? routing.defaultLocale, root: '/' });
}

export default async function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html
			suppressHydrationWarning
			className={`${notosansjp.variable} ${lora.variable} ${notoserifjp.variable}`}
		>
			<body>
				<ThemeProvider attribute="class" storage="localStorage" storageKey="intentui-theme" enableSystem>
					{children}
				</ThemeProvider>
			</body>
			<GoogleAnalytics gaId="G-7QRCL4J4CZ" />
		</html>
	);
}
