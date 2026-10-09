type HeaderProps = {
    title: string,
    content: string
}


export function Header(props: HeaderProps){
    const {title, content} = props;
    return(
        <header className="header-style">
            <div className="title">
                <h1>{title}</h1>
            </div>
            <div className="header-content">
                <p className="header">{content}</p>
            </div>
        </header>

    )   
}