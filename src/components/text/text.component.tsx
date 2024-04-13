import styles from './text.module.css';

type Props = {
	style: 'header' | 'title' | 'subtitle' | 'body' | 'label' | 'caption',
	children: React.ReactNode,
	onClick?: VoidFunction
}
export function Text(props: Props) {

	const getStyle = (style: string): string => {
		switch (style) {
			case 'header':
				return styles.header;
			case 'title':
				return styles.title;
			case 'subtitle':
				return styles.subtitle;
			case 'body':
				return styles.body;
			case 'label':
				return styles.label;
			default:
				return styles.caption;
		}
	}

	return <p className={getStyle(props.style)} onClick={props.onClick}>{props.children}</p>
}