type TextProps = {
    tag: 'h1' | 'h2' | 'p'; // Specify the HTML tag
    text: string; // The text content
    textAlign?: 'left' | 'center' | 'right'; // Text alignment
    paddingLeft?: string; // Add paddingLeft property
    paddingRight?: string; // Add paddingLeft property
};

function Text({ tag, text, textAlign = 'left', paddingLeft, paddingRight }: TextProps) {
    const Tag = tag; // Use the 'tag' prop to determine the HTML tag

    const style = {
        textAlign,
        paddingLeft,
        paddingRight,
        // Add other styles as needed
    };

    return <Tag style={style}>{text}</Tag>;
}

export default Text;
